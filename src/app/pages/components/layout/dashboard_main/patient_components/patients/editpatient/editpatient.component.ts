import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule,FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink ,ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../../../core/service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editpatient',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './editpatient.component.html',
  styleUrl: './editpatient.component.css'
})
export class EditpatientComponent {
  constructor(private route: ActivatedRoute,private snackBar:MatSnackBar,private toastr: ToastrService,private _authService:AuthService,private router:Router){
 }
 patientId:any;
 data:any;
 ngOnInit(): void {
  // Access the `id` from the route parameters
  this.patientId = this.route.snapshot.paramMap.get('id');
  console.log('Patient ID:', this.patientId);
  // Now you can use this `patientId` to fetch the patient data or perform other actions
  this.getPatientDetails(this.patientId);
}
 editForm:FormGroup=new FormGroup({
  name:new FormControl('',[Validators.required]),
  mobile:new FormControl(''),
  disease:new FormControl(''),
  age:new FormControl(''),
  city:new FormControl(''),
  state:new FormControl(''),
  charge:new FormControl(''),
  gender:new FormControl()
});

getPatientDetails(patientId:any){
  this._authService.commonApiRqst('get',`pateintDeatilsById/${patientId}`).subscribe({
    next:(res)=>{
if(res.success){
this.data=res.data;
this.editForm.patchValue({
  name: this.data.name,
  mobile: this.data.mobile,
  disease: this.data.disease,
  age: this.data.age,
  city: this.data.city,
  state: this.data.state,
  charge: this.data.charge,
  gender:this.data.gender
});
}else {
  this.toastr.error(res.message || 'Failed to fetch patient data.');
}
    },
    error:(err)=>{
      this.toastr.error(err.message || 'An error occurred while fetching patient data.');

    }
  })
}
edit(){
  console.log(this.editForm.value);
this._authService.commonApiRqst('put',`pateintUpdate/${this.patientId}`,this.editForm.value).subscribe({
next:(res)=>{
if(res.success){
  this.toastr.success(res.message, 'Success!');
this.router.navigate([`/mainpage/patients`])
}
else{
  this.toastr.success(res, 'Error!');

}
},
error:(err)=>{
  this.toastr.success(err, 'Error!');

}
});
}
}
