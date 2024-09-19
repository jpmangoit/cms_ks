import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../core/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  constructor(private _authService: AuthService, private toastr: ToastrService, private datePipe: DatePipe) { }

  patientList: any;
  currentPage: number = 1;
  lastPage: number = 1;
  itemsPerPage: number = 10;
  maxVisiblePages: number = 3;
  visiblePages: number[] = [];
  disease: any;
  start: any;
  end: any;
  daterange: any;

  previousFilters: { search?: string; gender?: string; diseases?: string; visitDate?: string } = {};

  ngOnInit() {
    this.loadPatient({ page: this.currentPage });
    this.allDisease();
  }
  clearFilters() {
    // Reset all filters
    this.previousFilters = {
      search: '',
      gender: '',
      diseases: '',
      visitDate: ''
    };

    // Clear date range input if needed
    this.start = null;
    this.end = null;

    const startDateInput = document.getElementById('startDt') as HTMLInputElement;
    const endDateInput = document.getElementById('endDt') as HTMLInputElement;

    if (startDateInput) {
      startDateInput.value = '';
    }
    if (endDateInput) {
      endDateInput.value = '';
    }
    // Reload the patient list without any filters (reset to current page)
    this.loadPatient({ page: this.currentPage });
  }
  allDisease() {
    this._authService.commonApiRqst('get', `getAllDisease`).subscribe({
      next: (res) => {
        if (res.success) {
          this.disease = res.data;
        } else {
          this.toastr.error(res);
        }
      },
      error: (err) => {
        this.toastr.error(err, 'Error!');
      }
    });
  }

  // Updated loadPatient function
  loadPatient({
    page,
    diseases,
    gender,
    search,
    visitDate
  }: {
    page?: number;
    diseases?: string;
    gender?: string;
    search?: string;
    visitDate?: string;
  }) {
    // Use existing filters if no new values are provided
    this.previousFilters.search = search || this.previousFilters.search || '';
    this.previousFilters.gender = gender || this.previousFilters.gender || '';
    this.previousFilters.diseases = diseases || this.previousFilters.diseases || '';
    this.previousFilters.visitDate = visitDate || this.previousFilters.visitDate || '';

    // Build query parameters
    let queryParams = `page=${page || this.currentPage}&pageSize=${this.itemsPerPage}`;

    if (this.previousFilters.gender) queryParams += `&gender=${this.previousFilters.gender}`;
    if (this.previousFilters.diseases) queryParams += `&disease=${this.previousFilters.diseases}`;
    if (this.previousFilters.search) queryParams += `&search=${this.previousFilters.search}`;
    if (this.previousFilters.visitDate) queryParams += `&visitDate=${this.previousFilters.visitDate}`;

    this._authService.commonApiRqst('get', `pateintList?${queryParams}`).subscribe({
      next: (res) => {
        if (res.success) {
          this.patientList = res.data.data;
          this.currentPage = res.data.current_page;
          this.lastPage = res.data.last_page;
          this.updateVisiblePages();
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error!');
      }
    });
  }

  changePage(page: number) {
    if (page > 0 && page <= this.lastPage) {
      this.loadPatient({ page });
    }
  }

  updateVisiblePages() {
    const totalPages = this.lastPage;
    const pagesToShow = this.maxVisiblePages;

    let start = this.currentPage - Math.floor(this.maxVisiblePages / 2);
    if (start < 1) {
      start = 1;
    }

    let end = start + pagesToShow - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - pagesToShow + 1, 1);
    }

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  dateRange(startDate?: any, flag?: any) {
    if (flag == 'start') {
      this.start = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    } else {
      this.end = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    }
    this.daterange = `${this.start},${this.end}`;

    if (this.start && this.end) {
      this.loadPatient({ page: this.currentPage, visitDate: this.daterange });
    }
  }
}
