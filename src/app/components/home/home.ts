import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { WeatherComponent } from '../weather/weather';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WeatherComponent, RouterModule, MatIcon],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  toggleSidebar() {
    // Importante: la clase del sidebar es .app-sidebar (del layout)
    const sidebar = document.querySelector('.app-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
  }
}
