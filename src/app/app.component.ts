import { Component, inject, isDevMode } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { setAnalyticsCollectionEnabled } from '@firebase/analytics';
import { Analytics } from '@angular/fire/analytics';
import { BlogPostService } from './services/blog-post.service';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
