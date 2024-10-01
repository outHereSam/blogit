import { Injectable } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private analytics: Analytics) {}

  logEvent(eventName: string, eventParams?: { [key: string]: any }) {
    logEvent(this.analytics, eventName, eventParams);
  }

  logPageView(pageName: string) {
    this.logEvent('page_view', { page_name: pageName });
  }

  logBlogPostView(postId: string, postTitle: string) {
    this.logEvent('blog_post_view', { post_id: postId, post_title: postTitle });
  }

  logUserSignUp() {
    this.logEvent('sign_up');
  }

  logUserLogin() {
    this.logEvent('login');
  }

  logNewPostCreation() {
    this.logEvent('new_post_created');
  }

  logCommentAdded() {
    this.logEvent('comment_added');
  }
}
