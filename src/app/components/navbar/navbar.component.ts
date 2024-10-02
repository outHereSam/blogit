import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/app.model';
import { DocumentData } from '@angular/fire/firestore';
import { JsonPipe } from '@angular/common';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, JsonPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  user!: DocumentData;
  constructor(
    private userService: UserService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.auth.currentUser;
    this.userService.getUser(user?.uid).then((user) => (this.user = user));
  }
}
