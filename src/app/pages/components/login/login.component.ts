import { AuthService } from '../../../core/service/auth/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA,OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule,FormControl} from '@angular/forms';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

// import {FormControl,FormGroup,FormControlName,ReactiveFormsModule, Validators} from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
//to use routerlink inside the html file must include routerlink component in the ts file 
//to use if else or for loop must include commonmodule component inside the ts file where u want to add this in html
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [   
    ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  schemas: [NO_ERRORS_SCHEMA] // Temporary solution

})
export class LoginComponent {
  
constructor(private toastr: ToastrService,private _authService:AuthService,private router:Router,private fb: FormBuilder){


}

loginForm:FormGroup=new FormGroup({
email:new FormControl('',[Validators.required,Validators.email]),
password:new FormControl('',[Validators.required,Validators.minLength(5)])
});
login(){
  console.log('gfdg');

  console.log(this.loginForm.value);
this._authService.commonApiRqst('post','login',this.loginForm.value).subscribe({
  
  next: (res) => { 
    console.log(res);

     // Use an arrow function to preserve `this` context
    if (res.success == true) {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/mainpage']);  // Now `this` refers to LoginComponent
      this.toastr.success('Login successful', 'Success!');

      // this.snackBar.open('login successful.','success',{duration:3000,});
      // this.snackBar.open('Message to display', 'Action', {
      //   duration: 2000, // Duration in milliseconds (optional)
      //   panelClass: 'my-snackbar-class' // Optional class for customization
      // });
    }
    else{
      this.toastr.error(res.message,'Error!');

    }
  },
  error: (err) => {
    console.error('Login error:', err);
    this.toastr.error(err,'Toastr fun!');

    // this.snackBar.open('Message to display', 'Action', {
    //   duration: 2000, // Duration in milliseconds (optional)
    //   panelClass: 'my-snackbar-class' // Optional class for customization
    // });
  }
});
}
}
