import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../../../core/service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patientdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patientdetails.component.html',
  styleUrl: './patientdetails.component.css'
})
export class PatientdetailsComponent {
  constructor(private route: ActivatedRoute,private snackBar:MatSnackBar,private toastr: ToastrService,private _authService:AuthService,private router:Router){
  }
  patientId:any;
  data:any;
  patientVisit:any;
  isPopupVisible = false;

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
  ngOnInit(): void {
   // Access the `id` from the route parameters
   this.patientId = this.route.snapshot.paramMap.get('id');
   console.log('Patient ID:', this.patientId);
   // Now you can use this `patientId` to fetch the patient data or perform other actions
   this.getDetail(this.patientId);
 }
  getDetail(patientId:any){
this._authService.commonApiRqst('get',`pateintDeatilsById/${patientId}`).subscribe({
  next:(res)=>{
    if(res.success){
      this.data=res.data;
      this.patientVisit=res.data.patient_visit;
      this.toastr.success(res.message,'success');

    }
    else{
      this.toastr.error(res.message,'Error');

    }

  },
  error:(err)=>
    {
      this.toastr.error(err,'Error');

    }
})
  }
}
