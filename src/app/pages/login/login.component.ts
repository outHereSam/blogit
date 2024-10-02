import { Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

import { NOTYF } from '../../../utils/notyf.token';
import { Notyf } from 'notyf';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  successMessage!: string;
  error!: string;
  isLoading: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const { email, password } = this.loginForm.value;
      if (email && password) {
        this.authService
          .login(email, password)
          .then(() => {
            this.isLoading = false;
            this.successMessage = 'Login Successful';
            this.notyf.success(this.successMessage);
            this.router.navigate(['/']);
          })
          .catch((err) => {
            this.isLoading = false;
            this.error = 'Login failed. Invalid credentials';
            this.notyf.error(this.error);
            console.error('Login failed', err.message);
          });
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
