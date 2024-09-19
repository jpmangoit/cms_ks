import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/components/login/login.component';
// import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent// Import ToastrModule using forRoot()
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'cms_scrach';
}
