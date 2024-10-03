import { Component } from '@angular/core';
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

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    CommentFormComponent,
    CommentListComponent,
    NavbarComponent,
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
        this.userService
          .getUser(post?.['authorId'])
          .then((user) => (this.author = user));
      },
      error: (err) => console.error(err),
    });
  }
}
