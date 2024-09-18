import { Routes } from '@angular/router';
import { LoginComponent } from './pages/components/login/login.component';
import { HomeComponent } from './pages/components/home/home.component';
import { SignupComponent } from './pages/components/signup/signup.component';
import { MainpageComponent } from './pages/components/layout/mainpage/mainpage.component';
import { DashboardComponent } from './pages/components/layout/dashboard_main/dashboard/dashboard.component';
import { PatientsComponent } from './pages/components/layout/dashboard_main/patient_components/patients/patients.component';

export const routes: Routes = [
    //by default we show login screen as an initial page
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default

    {
        path:'login',component:LoginComponent
    },
    {
        path:'home',component:HomeComponent
    },
    {
        path:'signup',component:SignupComponent
    },
    { path: 'mainpage', redirectTo: 'mainpage/dashboard', pathMatch: 'full' }, // Redirect to login by default

    {
        path:'mainpage',component:MainpageComponent,
        children:[
            {
                
            path:'dashboard',
            component:DashboardComponent },
            {
                path:'patients',
                component:PatientsComponent
            }
        ]
    },


];
