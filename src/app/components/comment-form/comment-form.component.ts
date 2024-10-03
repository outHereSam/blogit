import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Auth, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.sass',
})
export class CommentFormComponent {
  user$!: Observable<User | null>;
  isLoggedIn: boolean = false;
  userId!: string | undefined;

  comment = new FormControl('', [Validators.required]);
  @Input() postId!: string | null;

  constructor(private commentService: CommentService, private auth: Auth) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    this.user$.subscribe({
      next: (user) => {
        if (user) {
          this.isLoggedIn = true;
          this.comment.enable();
        } else {
          this.isLoggedIn = false;
          this.comment.disable();
        }
        this.userId = user?.uid;
      },
      error: (err) => console.error(err),
    });
  }

  sendComment() {
    if (this.comment.valid) {
      this.commentService.createComment(
        this.comment.value,
        this.postId,
        this.userId
      );
    }
  }
}
