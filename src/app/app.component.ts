import { Component, inject, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { setAnalyticsCollectionEnabled } from '@firebase/analytics';
import { Analytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'blogit';

  // constructor(private analytics: Analytics) {
  //   if (isDevMode()) {
  //     setAnalyticsCollectionEnabled(this.analytics, false);

  //     (window as any)['FIREBASE_ANALYTICS_DEBUG'] = true;
  //   }
  // }
}
