import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
 logout(event: Event): void {
    event.preventDefault();
    console.log('Cerrando sesión...');
}
}
