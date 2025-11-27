// layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  imports: [CommonModule, RouterOutlet, RouterLink],
})
export class LayoutComponent {
  userName = 'Fressia';
  userEmail = 'fressia@greeni.com';

  constructor(private router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/'); // volver al landing
  }
}
