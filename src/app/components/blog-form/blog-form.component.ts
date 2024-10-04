import { Component, Inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogPostService } from '../../services/blog-post.service';
import { Auth, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { NOTYF } from '../../../utils/notyf.token';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import { DocumentData } from '@angular/fire/firestore';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [ReactiveFormsModule, EditorModule, LoaderComponent],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.sass',
})
export class BlogFormComponent {
  @Input() post!: DocumentData;
  @Input() postId!: string;

  user$!: Observable<User | null>;
  userId: string | undefined;

  isLoading: boolean = false;

  postForm = new FormGroup({
    title: new FormControl(this.post ? this.post['title'] : '', [
      Validators.required,
    ]),
    content: new FormControl(this.post ? this.post['content'] : '', [
      Validators.required,
    ]),
  });
  constructor(
    private blogPostService: BlogPostService,
    private auth: Auth,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post ? this.post['title'] : '', [
        Validators.required,
      ]),
      content: new FormControl(this.post ? this.post['content'] : '', [
        Validators.required,
      ]),
    });
    this.user$.subscribe((user) => {
      if (user) {
        this.userId = user?.uid;
      }
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.isLoading = true;
      if (this.post) {
        this.blogPostService
          .editPost(this.postId, {
            title: this.postForm.value.title,
            content: this.postForm.value.content,
          })
          .then(() => {
            this.isLoading = false;
            this.notyf.success('Post updated successfully');
            this.router.navigate(['/']);
          })
          .catch((err) => {
            this.isLoading = false;
            this.notyf.error('Failed to update post');
            console.error('Failed to update post', err.message);
          });
      } else {
        this.blogPostService
          .createPost({
            title: this.postForm.value.title,
            content: this.postForm.value.content,
            dateCreated: new Date(),
            likes: 0,
            dislikes: 0,
            authorId: this.userId,
          })
          .then(() => {
            this.isLoading = false;
            this.notyf.success('Post created successfully');
            this.postForm.reset();
            this.router.navigate(['/']);
          })
          .catch((err) => {
            this.isLoading = false;
            this.notyf.error('Failed to create post');
            console.error("Couldn't create post", err.message);
          });
      }
    }
  }
}
