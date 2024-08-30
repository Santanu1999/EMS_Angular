import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      const { username, password } = this.registerForm.value;
      this.authService.register(username, password).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.notificationService.showSuccess('User registered successfully!');
        },
        error: err => this.errorMessage = 'Registration failed. Please try again.'
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  passwordsMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }
}
