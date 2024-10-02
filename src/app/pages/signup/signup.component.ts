import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NOTYF } from '../../../utils/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {
  successMessage!: string;
  error!: string;

  signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.checkPasswordsMatch }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  checkPasswordsMatch(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, username, password } = this.signupForm.value;
      if (email && username && password) {
        this.authService
          .signup(email, username, password)
          .then(() => {
            this.successMessage = 'Account Created Successfully';
            this.notyf.success(this.successMessage);
            this.router.navigate(['/login']);
          })
          .catch((err) => {
            this.error = 'Failed to create account';
            this.notyf.error(this.error);
            console.error('Signup failed', err.message);
          });
      }
    } else {
      console.log(this.signupForm.errors);
      this.signupForm.markAllAsTouched();
    }
  }
}
