import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BlogPostService } from '../../services/blog-post.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../utils/notyf.token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.sass',
})
export class ConfirmationModalComponent {
  data = inject(MAT_DIALOG_DATA);
  postTitle!: string;

  constructor(
    private blogPostService: BlogPostService,
    @Inject(NOTYF) private notyf: Notyf,
    private router: Router
  ) {}

  ngOnInit() {
    this.blogPostService.getPostById(this.data).subscribe({
      next: (post) => (this.postTitle = post?.['title']),
      error: (error) => console.log(error),
    });
  }

  onDelete() {
    this.blogPostService.deletePost(this.data).subscribe({
      next: () => {
        this.notyf.success('Post deleted successfully');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.notyf.error('Failed to delete post');
        console.log(error);
      },
    });
  }
}
