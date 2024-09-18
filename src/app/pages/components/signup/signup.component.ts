import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { AuthService } from '../../../core/service/auth/auth.service';
// import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private toastr: ToastrService, private _authService: AuthService, private router: Router, private fb: FormBuilder) { }
  signupForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  signup() {
    console.log(this.signupForm.value);
    this._authService.commonApiRqst('post', 'register', this.signupForm.value).subscribe({
      next: (res) => {
        if (res.success == true) {
          this.router.navigate(['/login']);  // Now `this` refers to LoginComponent
          this.toastr.success('Sign up successful', 'Success!');
        }
        else {
          this.toastr.error(res.message, 'Error!');

        }
      },
      error: (error) => {
        console.log('signup error:', error);
        this.toastr.error(error.error.email[0], 'Error!');
      }
    });
  }
}
