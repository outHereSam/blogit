import { Component, inject, isDevMode } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { setAnalyticsCollectionEnabled } from '@firebase/analytics';
import { Analytics } from '@angular/fire/analytics';
import { BlogPostService } from './services/blog-post.service';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  posts$!: Observable<unknown[]>;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
