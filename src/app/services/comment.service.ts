import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private firestore: Firestore) {}

  getCommentsByPostId(postId: string | null): Observable<DocumentData[]> {
    const commentsCollection = collection(this.firestore, 'comments');
    return from(
      collectionData(query(commentsCollection, where('postId', '==', postId)), {
        idField: 'id',
      })
    );
  }

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
