import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '@angular/fire/auth';
import { DocumentData } from '@angular/fire/firestore';
import { JsonPipe } from '@angular/common';
import { Auth, user, UserCredential, UserInfo } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, JsonPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  user$: Observable<User | null>;
  user!: DocumentData;
  author!: DocumentData;

  constructor(
    private userService: UserService,
    private auth: Auth,
    private router: Router
  ) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    // const authUser = this.auth.currentUser;
    // this.userService.getUser(authUser?.uid).then((user) => (this.user = user));
    // this.userService
    //   .getUser(authUser?.uid)
    //   .then((user) => (this.author = user));
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
}
