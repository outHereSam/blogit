import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/app.model';
import { DocumentData } from '@angular/fire/firestore';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, JsonPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  user!: DocumentData;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().then((user) => (this.user = user));
  }
}
