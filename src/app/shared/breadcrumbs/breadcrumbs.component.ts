import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

/**
 * Bread Crumbs Component
 */
export class BreadcrumbsComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() breadcrumbItems!: Array<{
    active?: boolean;
    label?: string;
    link?: string; // Tambahkan properti link untuk menghubungkan rute
  }>

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Implementasi metode ngOnInit
  }

  // Fungsi untuk menavigasi ke rute yang sesuai saat elemen breadcrumb di-klik
  navigateTo(link: string | undefined): void {
    if (link) {
      this.router.navigate([link]);
    }
  }
}
