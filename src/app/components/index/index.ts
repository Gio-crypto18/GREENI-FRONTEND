import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class Index {
  // --------- estado modales ----------
  showLogin = false;
  showRegister = false;

  // login
  loginEmail = '';
  loginPassword = '';

  // registro
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  registerPasswordConfirm = '';
  registerRole = 'Plant Lover';

  // diagnóstico
  tab: 'manual' | 'foto' = 'manual';
  temperatura = 25;
  humedad = 50;
  ph = 7;
  tipoPlanta = '';

  // guías
  showGuidesList = false;

  constructor(private router: Router) {}

  // ====== NAV SCROLL ======
  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ====== MODALES AUTH ======
  openLogin(): void {
    this.showRegister = false;
    this.showLogin = true;
  }

  openRegister(): void {
    this.showLogin = false;
    this.showRegister = true;
  }

  switchToRegister(): void {
    this.showLogin = false;
    this.showRegister = true;
  }

  switchToLogin(): void {
    this.showRegister = false;
    this.showLogin = true;
  }

  closeAuth(): void {
    this.showLogin = false;
    this.showRegister = false;
  }

  login(): void {
    // lógica real de login va aquí
    localStorage.setItem('userName', 'Fressia');
    localStorage.setItem('userEmail', this.loginEmail);
    this.closeAuth();
    this.router.navigate(['/app/home']);
  }

  register(): void {
    // lógica real de registro va aquí
    localStorage.setItem('userName', this.registerName);
    localStorage.setItem('userEmail', this.registerEmail);
    this.closeAuth();
    this.router.navigate(['/app/home']);
  }

  // ====== GUÍAS ======
  goToGuide(id: string): void {
    // por ahora solo hace scroll a la sección de guías
    const el = document.getElementById('guides-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    console.log('Guía seleccionada:', id);
  }
}
