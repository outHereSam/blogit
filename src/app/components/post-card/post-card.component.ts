import { Component, Input } from '@angular/core';
import { Post } from '../../models/app.model';
import { DocumentData } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [DatePipe, ProfileComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.sass',
})
export class PostCardComponent {
  @Input() post!: DocumentData;
  author!: DocumentData;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getUser(this.post['authorId'])
      .then((user) => (this.author = user));
  }
}
