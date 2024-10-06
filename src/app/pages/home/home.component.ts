import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { Observable } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NavbarComponent, PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  user$: Observable<User | null>;
  userExists: boolean = false;
  constructor(
    public authService: AuthService,
    private auth: Auth,
    private meta: Meta
  ) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    this.meta.addTags([
      { title: 'Home | Blogit' },
      {
        name: 'description',
        content:
          "Blogit is a dynamic platform where users can discover insightful blogs across various topics and create their own. Whether you're reading or writing, Blogit provides a seamless and engaging experience for sharing knowledge, ideas, and stories.",
      },
      {
        name: 'keywords',
        content:
          'blog platform, write a blog, discover blogs, read blogs online, user-generated blogs, share ideas, blog cretion, publish blogs, content sharing, online blog community',
      },
      // Add more tags as needed
    ]);

    this.user$.subscribe((user) => {
      if (user) {
        this.userExists = true;
      } else {
        this.userExists = false;
      }
    });
  }
}
