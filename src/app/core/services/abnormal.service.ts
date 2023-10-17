import { Injectable, PipeTransform } from '@angular/core';
import { AbnormalModel } from '../models/abnormal.model';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Subject, tap, debounceTime, switchMap, delay, Observable, of } from 'rxjs';
import { SortColumn, SortDirection } from 'src/app/pages/production/abnormalitas/view/view.sortable.directive';
import { ApiService } from './api.service';

interface SearchResult {
  countries: AbnormalModel[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

const compare = (v1: string | number | Date, v2: string | number | Date) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(countries: AbnormalModel[], column: SortColumn, direction: SortDirection): AbnormalModel[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: AbnormalModel, term: string, pipe: PipeTransform): boolean {
  return (
    country.id_abnormal.toString().includes(term) ||
    country.date.toString().includes(term) ||
    country.problem.toLowerCase().includes(term.toLowerCase()) ||
    country.cause.toLowerCase().includes(term.toLowerCase()) ||
    country.ca_pa.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({
  providedIn: 'root'
})
export class AbnormalService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<AbnormalModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 8,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };

  private abnormalData: AbnormalModel[] = [];
  isConnected: boolean | undefined;

  constructor(private pipe: DecimalPipe, public apiService: ApiService) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe(result => {
        this._countries$.next(result.countries);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get countries$(): Observable<AbnormalModel[]> {
    return this._countries$.asObservable();
  }

  get total$(): Observable<number> {
    return this._total$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get page(): number {
    return this._state.page;
  }

  get pageSize(): number {
    return this._state.pageSize;
  }

  get searchTerm(): string {
    return this._state.searchTerm;
  }

  get startIndex(): number {
    return this._state.startIndex;
  }

  get endIndex(): number {
    return this._state.endIndex;
  }

  get totalRecords(): number {
    return this._state.totalRecords;
  }

  set page(page: number) {
    this._set({ page });
  }

  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  set startIndex(startIndex: number) {
    this._set({ startIndex });
  }

  set endIndex(endIndex: number) {
    this._set({ endIndex });
  }

  set totalRecords(totalRecords: number) {
    this._set({ totalRecords });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  getAllAbnoral() {
    this.isConnected = true;
    this.apiService.getAllabnormal().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.abnormalData = res.data
          // console.log(this.dailyData);
        } else {
          console.error(`${res.data.message}`);
          setTimeout(() => {
            this.isConnected = false;
          }, 1000);
        }
      },
      error: (err: any) => {
        console.error(err);
        setTimeout(() => {
          this.isConnected = false;
        }, 1000);
      },
    });
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let countries = sort(this.abnormalData, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    this.totalRecords = countries.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    countries = countries.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({ countries, total });
  }
}
