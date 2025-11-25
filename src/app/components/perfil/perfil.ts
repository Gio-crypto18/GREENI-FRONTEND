import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Notifications {
  reminders: boolean;
  interactions: boolean;
  friends: boolean;
  newsletter: boolean;
}

interface Feedback {
  message: string;
  class: string; // 'ok' | 'err' | ''
}

interface User {
  userId: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: string;
  status: string;
  bio: string;
  joinedAt: string;
}

interface ProfileSnapshot {
  fullName: string;
  email: string;
  status: string;
  bio: string;
  role: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class PerfilComponent implements OnInit {
  activeTab: string = 'perfil';

  user: User = {
    userId: '',
    fullName: '',
    email: '',
    role: 'plantlover',
    status: 'Activo',
    bio: '',
    joinedAt: ''
  };

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  // Hash simulado de contraseña
  private userPasswordHash: string | null = null;

  // Snapshot inicial del perfil para comparar cambios
  private initialProfileSnapshot: ProfileSnapshot | null = null;

  notifications: Notifications = {
    reminders: true,
    interactions: true,
    friends: true,
    newsletter: false
  };

  notificationsChanged = false;
  originalNotifications: Notifications = { ...this.notifications };

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  profileFeedback: Feedback = { message: '', class: '' };
  passwordFeedback: Feedback = { message: '', class: '' };
  notificationsFeedback: Feedback = { message: '', class: '' };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUserData();
    this.initForms();
    // snapshot inicial una vez que el form está creado
    this.initialProfileSnapshot = this.takeProfileSnapshotFromForm();
  }

  /* ==============================
     Formularios
     ============================== */

  initForms(): void {
    const isAdmin = this.user.role.toLowerCase() === 'admin';

    this.profileForm = this.fb.group({
      userId: [{ value: this.user.userId, disabled: true }],
      joinedAt: [{ value: this.user.joinedAt, disabled: true }],
      fullName: [this.user.fullName, [Validators.required, Validators.minLength(2)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      status: [this.user.status],
      role: [{ value: this.user.role, disabled: !isAdmin }],
      bio: [this.user.bio]
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  /* ==============================
     Datos de usuario (demo)
     ============================== */

  loadUserData(): void {
    // Datos de ejemplo (como si vinieran de localStorage / API)
    this.user = {
      userId: 'USR-001',
      fullName: 'Carol García',
      email: 'carol123@gmail.com',
      role: 'plantlover',
      status: 'Activo',
      bio: 'Amante de las plantas y la naturaleza. Especialista en plantas de interior.',
      joinedAt: '15 Ene 2024'
    };

    // Contraseña inicial simulada (si quieres forzar validación de "actual")
    this.userPasswordHash = null; // o algún hash si quieres probar
  }

  /* ==============================
     Snapshot y botón Guardar
     ============================== */

  private takeProfileSnapshotFromForm(): ProfileSnapshot {
    return {
      fullName: (this.profileForm.get('fullName')?.value || '').trim(),
      email: (this.profileForm.get('email')?.value || '').trim(),
      status: this.profileForm.get('status')?.value || 'Activo',
      bio: (this.profileForm.get('bio')?.value || '').trim(),
      role: (this.profileForm.get('role')?.value || this.user.role).toLowerCase()
    };
  }

  get canSaveProfile(): boolean {
    if (!this.profileForm || !this.initialProfileSnapshot) return false;
    if (!this.profileForm.valid) return false;

    const current = this.takeProfileSnapshotFromForm();
    return JSON.stringify(current) !== JSON.stringify(this.initialProfileSnapshot);
  }

  /* ==============================
     UI básica
     ============================== */

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleSidebar(): void {
    console.log('Toggle sidebar');
  }

  /* ==============================
     Perfil
     ============================== */

  saveProfile(): void {
    if (!this.canSaveProfile) return;

    const snapshot = this.takeProfileSnapshotFromForm();

    this.user = {
      ...this.user,
      fullName: snapshot.fullName,
      email: snapshot.email,
      status: snapshot.status,
      bio: snapshot.bio,
      role: snapshot.role
    };

    // Actualizar snapshot y limpiar "dirty"
    this.initialProfileSnapshot = this.takeProfileSnapshotFromForm();
    this.profileForm.markAsPristine();

    this.showFeedback('profile', 'Perfil actualizado correctamente.', 'ok');
  }

  createNewUser(): void {
    console.log('Crear nuevo usuario');
    // Aquí podrías redirigir a registro o limpiar formulario
  }

  deleteUser(): void {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Eliminar usuario');
      // Aquí iría la lógica real de borrado + redirección
    }
  }

  /* ==============================
     Seguridad / Contraseña
     ============================== */

  async changePassword(): Promise<void> {
    if (this.passwordForm.invalid) {
      if (this.passwordForm.hasError('passwordMismatch')) {
        this.showFeedback('password', 'Las contraseñas no coinciden.', 'err');
      } else {
        this.showFeedback('password', 'Por favor completa los campos correctamente.', 'err');
      }
      return;
    }

    const currentPassword = this.passwordForm.get('currentPassword')?.value || '';
    const newPassword = this.passwordForm.get('newPassword')?.value || '';
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value || '';

    if (newPassword !== confirmPassword) {
      this.showFeedback('password', 'Las contraseñas no coinciden.', 'err');
      return;
    }

    if (newPassword.length < 8) {
      this.showFeedback('password', 'La nueva contraseña debe tener mínimo 8 caracteres.', 'err');
      return;
    }

    // Si existe hash guardado, validar contraseña actual
    if (this.userPasswordHash) {
      const currentHash = await this.sha256(currentPassword);
      if (currentHash !== this.userPasswordHash) {
        this.showFeedback('password', 'La contraseña actual es incorrecta.', 'err');
        return;
      }
    }

    // Guardar hash de nueva contraseña
    this.userPasswordHash = await this.sha256(newPassword);
    console.log('Nuevo hash de contraseña:', this.userPasswordHash);

    this.showFeedback('password', 'Contraseña actualizada correctamente.', 'ok');
    this.passwordForm.reset();
  }

  togglePasswordVisibility(field: string): void {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  private async sha256(str: string): Promise<string> {
    const data = new TextEncoder().encode(str);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /* ==============================
     Notificaciones
     ============================== */

  onNotificationChange(key: keyof Notifications, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.notifications[key] = input.checked;
    this.checkNotificationsChanges();
  }

  checkNotificationsChanges(): void {
    this.notificationsChanged =
      JSON.stringify(this.notifications) !== JSON.stringify(this.originalNotifications);
  }

  saveNotifications(): void {
    this.originalNotifications = { ...this.notifications };
    this.notificationsChanged = false;
    this.showFeedback('notifications', 'Configuración de notificaciones guardada.', 'ok');
  }

  /* ==============================
     Avatar
     ============================== */

  triggerImageUpload(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      this.showFeedback('profile', 'Solo se permiten imágenes PNG o JPG.', 'err');
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      this.showFeedback('profile', 'La imagen no debe superar los 2 MB.', 'err');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.user.avatarUrl = e.target.result;
      this.showFeedback('profile', 'Foto de perfil actualizada.', 'ok');
    };
    reader.onerror = () => {
      this.showFeedback('profile', 'No se pudo leer la imagen.', 'err');
    };
    reader.readAsDataURL(file);
  }

  /* ==============================
     Helpers de UI
     ============================== */

  getUserInitials(): string {
    if (!this.user.fullName) return '—';
    return this.user.fullName
      .split(' ')
      .filter(Boolean)
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getUserRoleDisplay(): string {
    const roleMap: { [key: string]: string } = {
      plantlover: 'Plant Lover',
      cientifico: 'Científico',
      admin: 'Admin'
    };
    return roleMap[this.user.role.toLowerCase()] || 'Plant Lover';
  }

  getRoleBadgeClass(): string {
    const role = this.user.role.toLowerCase();
    if (role === 'admin') return 'role-badge role-admin';
    if (role === 'cientifico') return 'role-badge role-cientifico';
    return 'role-badge role-plantlover';
  }

  get avatarClass(): string {
    return `avatar-preview ${this.user.avatarUrl ? 'has-image' : 'no-image'}`;
  }

  getRoleHelpText(): string {
    return this.user.role.toLowerCase() === 'admin'
      ? 'Puedes cambiar el rol de esta cuenta (solo admin).'
      : 'Tu rol fue definido al registrarte.';
  }

  /* ==============================
     Feedback unificado
     ============================== */

  showFeedback(
    type: 'profile' | 'password' | 'notifications',
    message: string,
    feedbackClass: 'ok' | 'err'
  ): void {
    const feedbackMap: { [key: string]: Feedback } = {
      profile: this.profileFeedback,
      password: this.passwordFeedback,
      notifications: this.notificationsFeedback
    };

    const feedback = feedbackMap[type];
    if (feedback) {
      feedback.message = message;
      feedback.class = feedbackClass;
      setTimeout(() => {
        feedback.message = '';
        feedback.class = '';
      }, 2500);
    }
  }
}
