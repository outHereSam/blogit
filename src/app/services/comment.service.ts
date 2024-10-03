import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private firestore: Firestore) {}

  createComment(
    comment: string | null,
    postId: string | null,
    authorId: string | undefined
  ) {
    const commentsCollection = collection(this.firestore, 'comments');
    return addDoc(commentsCollection, {
      comment,
      postId,
      authorId,
      createdAt: new Date(),
    });
  }
}
