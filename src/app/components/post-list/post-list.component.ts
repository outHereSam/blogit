import { Component } from '@angular/core';
import { Post } from '../../models/app.model';
import { BlogPostService } from '../../services/blog-post.service';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PostCardComponent } from '../post-card/post-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [AsyncPipe, PostCardComponent, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.sass',
})
export class PostListComponent {
  posts$!: Observable<DocumentData[]>;

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit() {
    this.posts$ = this.blogPostService.getBlogPosts();
  }
}
