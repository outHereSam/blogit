import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
})
export class ProfileComponent {
  @Input() authorId!: string;
  author!: DocumentData;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getUser(this.authorId)
      .then((user) => (this.author = user));
  }
}
