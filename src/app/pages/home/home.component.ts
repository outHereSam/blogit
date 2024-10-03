import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { Observable } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NavbarComponent, PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  user$: Observable<User | null>;
  userExists: boolean = false;
  constructor(public authService: AuthService, private auth: Auth) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user) {
        this.userExists = true;
      } else {
        this.userExists = false;
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
