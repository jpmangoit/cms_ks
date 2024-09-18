import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(private toastr: ToastrService, private _http: HttpClient, private router: Router // For showing toast messages
  ) {
  }

  commonApiRqst(request: string, endpoint: string, data?: any): Observable<any> {
    if (request == 'post') {
      return this._http.post(`${this.baseUrl}${endpoint}`, data).pipe(retry(2), catchError((Error) => this.handleError(Error)));
    }
    else if (request == 'delete') {
      return this._http.delete(`${this.baseUrl}${endpoint}`).pipe(retry(2), catchError((Error) => this.handleError(Error)));

    }
    else if (request == 'put') {
      return this._http.put(`${this.baseUrl}${endpoint}`, data).pipe(retry(2), catchError((Error) => this.handleError(Error)));

    }
    else {
      return this._http.get(`${this.baseUrl}${endpoint}`).pipe(retry(2), catchError((Error) => this.handleError(Error)));

    }
  }
  handleError(error: any) {
    if (error.status === 401) {
      this.toastr.error(error);

      this.logout();
      // this.snackBar.open(error.message);
      // this.snackBar.open('Message to display', 'Action', {
      //   duration: 2000, // Duration in milliseconds (optional)
      //   panelClass: 'my-snackbar-class' // Optional class for customization
      // });
      return error;
    }
    else {

      // this.snackBar.open(error.message);
      // this.snackBar.open('Message to display', 'Action', {
      //   duration: 2000, // Duration in milliseconds (optional)
      //   panelClass: 'my-snackbar-class' // Optional class for customization
      // });
      console.log(error.error);
      return throwError(error);
    }

    // return throwError(() => new Error(error.message || 'Something went wrong!'));

  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
