import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard_main/dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { PatientsComponent } from '../dashboard_main/patient_components/patients/patients.component';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [DashboardComponent,HeaderComponent,SidemenuComponent,FooterComponent,RouterModule,PatientsComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {

}
