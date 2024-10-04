import { Component, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { CommentCardComponent } from '../comment-card/comment-card.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [AsyncPipe, CommentCardComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.sass',
})
export class CommentListComponent {
  comments$!: Observable<DocumentData[]>;
  @Input() postId!: string | null;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.comments$ = this.commentService.getCommentsByPostId(this.postId);
  }
}
