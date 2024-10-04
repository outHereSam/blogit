import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '@angular/fire/auth';
import { DocumentData } from '@angular/fire/firestore';
import { JsonPipe } from '@angular/common';
import { Auth, user, UserCredential, UserInfo } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    JsonPipe,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    ProfileComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  user$: Observable<User | null>;
  user!: DocumentData;
  author!: DocumentData;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private auth: Auth,
    private router: Router
  ) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    this.user$.subscribe({
      next: (user) => {
        if (user) {
          this.userService
            .getUser(user?.uid)
            .then((user) => (this.user = user));
          this.userService
            .getUser(user?.uid)
            .then((user) => (this.author = user));
        }
      },
      error: (err) => console.error(err),
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
