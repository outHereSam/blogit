import { Component, Input } from '@angular/core';
import { User } from '@angular/fire/auth';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.sass',
})
export class CommentCardComponent {
  @Input() comment!: DocumentData;
  user!: DocumentData;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getUser(this.comment['authorId'])
      .then((user) => (this.user = user));
  }
}
