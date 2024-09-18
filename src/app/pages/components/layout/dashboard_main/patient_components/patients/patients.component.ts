import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../../../../core/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  constructor(private _authService:AuthService,private toastr: ToastrService){}
  patientList:any;
  currentPage: number = 1;  
  lastPage: number = 1;     
  itemsPerPage: number = 10; 
  maxVisiblePages: number = 3; 
  visiblePages: number[] = [];  
  ngOnInit(){
this.loadPatient(this.currentPage);

  }
  loadPatient(page:any){
    this._authService.commonApiRqst('get',`pateintList?page=${page}`).subscribe({
      next:(res)=>{   
        if(res.success==true){
          this.patientList=res.data.data;
          this.currentPage = res.data.current_page;
          this.lastPage = res.data.last_page;
          this.updateVisiblePages();

        }
      },
    error:(error)=>{
      this.toastr.error(error,'Error!');
    
    }
      
    });
  }
  changePage(page: number) {
    if (page > 0 && page <= this.lastPage) {
      this.loadPatient(page);
    }
  }
    updateVisiblePages() {
      const totalPages = this.lastPage;
      const pagesToShow = this.maxVisiblePages;
  
      let start = this.currentPage - Math.floor(this.maxVisiblePages / 2);
      if (start < 1) {
          start = 1;
      }      let end = start + pagesToShow - 1;
  
      if (end > totalPages) {
          end = totalPages;
          start = Math.max(end - pagesToShow + 1, 1);
      }
  
      this.visiblePages = [];
      for (let i = start; i <= end; i++) {
          this.visiblePages.push(i);
      }
  }
  
}
