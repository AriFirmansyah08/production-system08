/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

// import {ListJs} from '../helpers/data-daily';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/pages/production/report/daily-report/daily-report-sortable.directive';
import { DailyReportModel } from '../models/daily-reports';

interface SearchResult {
  countries: DailyReportModel[];
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

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

// function sort(countries: DailyReportModel[], column: SortColumn, direction: string): DailyReportModel[] {
//   if (direction === '' || column === '') {
//     return countries;
//   } else {
//     return [...countries].sort((a, b) => {
//       const res = compare(a[column], b[column]);
//       return direction === 'asc' ? res : -res;
//     });
//   }
// }

function matches(country: DailyReportModel, term: string, pipe: PipeTransform) {
  return country.id_daily_report.toLowerCase().includes(term.toLowerCase())
  || country.shift_leader.toLowerCase().includes(term.toLowerCase())
  || country.start
  || country.finish
  || country.result;
}

@Injectable({providedIn: 'root'})

export class DailyReportService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<DailyReportModel[]>([]);
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
  isConnected: boolean | undefined;
  apiService: any;
  dailyData: any;

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  // private _search(): Observable<SearchResult> {
  //   const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

  //   // 1. sort
  //   let countries = sort(this.dailyData, sortColumn, sortDirection);

  //   // 2. filter
  //   countries = countries.filter(country => matches(country, searchTerm, this.pipe));
  //   const total = countries.length;

  //   3. paginate
  
}