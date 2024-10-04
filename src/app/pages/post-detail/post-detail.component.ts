import { Component, inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { BlogPostService } from '../../services/blog-post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Auth, user, User } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { CommentFormComponent } from '../../components/comment-form/comment-form.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    RouterLink,
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
  sanitizedContent!: SafeHtml;

  constructor(
    private blogPostService: BlogPostService,
    private route: ActivatedRoute,
    private auth: Auth,
    private userService: UserService,
    private sanitizer: DomSanitizer
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
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
          post?.['content']
        );
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
