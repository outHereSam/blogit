import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { BlogPostService } from '../../services/blog-post.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [NavbarComponent, BlogFormComponent, AsyncPipe],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.sass',
})
export class EditComponent {
  post$!: Observable<DocumentData | undefined>;
  postId!: string | null;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.postId = params.get('postId');
        return this.blogPostService.getPostById(this.postId ?? '');
      })
    );
  }
}
