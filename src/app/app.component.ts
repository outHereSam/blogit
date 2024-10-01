import { Component, inject, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { setAnalyticsCollectionEnabled } from '@firebase/analytics';
import { Analytics } from '@angular/fire/analytics';
import { BlogPostService } from './services/blog-post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'blogit';
  posts$!: Observable<unknown[]>;

  constructor(private blogpostService: BlogPostService) {}

  ngOnInit() {
    this.posts$ = this.blogpostService.getBlogPosts();
  }
}
