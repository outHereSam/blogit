import { Component, inject, isDevMode } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { setAnalyticsCollectionEnabled } from '@firebase/analytics';
import { Analytics } from '@angular/fire/analytics';
import { BlogPostService } from './services/blog-post.service';
import { Observable } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  user$: Observable<User | null>;
  user!: User | null;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    this.user$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }
}
