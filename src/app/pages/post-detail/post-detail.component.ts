import { Component, inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { BlogPostService } from '../../services/blog-post.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Auth, user, User } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { CommentFormComponent } from '../../components/comment-form/comment-form.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    CommentFormComponent,

    CommentListComponent,
    ConfirmationModalComponent,
    NavbarComponent,
    MatButtonModule,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.sass',
})
export class PostDetailComponent {
  post$!: Observable<DocumentData | undefined>;
  postId!: string | null;
  user$: Observable<User | null>;
  user!: DocumentData;
  author!: DocumentData;
  dialog = inject(MatDialog);
  canUpdatePost = false;

  constructor(
    private blogPostService: BlogPostService,
    private route: ActivatedRoute,
    private auth: Auth,
    private userService: UserService
  ) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.postId = params.get('postId');
        return this.blogPostService.getPostById(this.postId ?? '');
      })
    );

    this.post$.subscribe({
      next: (post) => {
        this.userService.getUser(post?.['authorId']).then((user) => {
          this.author = user;
          if (this.author['uid'] === this.auth.currentUser?.uid) {
            this.canUpdatePost = true;
          }
        });
      },
      error: (err) => console.error(err),
    });
  }

  openDialog() {
    this.dialog.open(ConfirmationModalComponent, {
      data: this.postId,
    });
  }
}
