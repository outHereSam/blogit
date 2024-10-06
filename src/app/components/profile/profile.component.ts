import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DocumentData } from '@angular/fire/firestore';
import { SkeletonModule } from 'primeng/skeleton';
import { from, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SkeletonModule, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
})
export class ProfileComponent {
  @Input() authorId!: string;
  user$!: Observable<DocumentData | undefined>;
  author!: DocumentData;
  userLoading: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user$ = from(
      this.userService
        .getUser(this.authorId)
        .then((user) => {
          this.userLoading = false;
          this.author = user;
          return user;
        })
        .catch((err) => {
          this.userLoading = false;
          console.error(err);
          return undefined;
        })
    );
  }
}
