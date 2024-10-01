import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private firestore: Firestore) {}

  getBlogPosts(): Observable<unknown[]> {
    const postsCollection = collection(this.firestore, 'posts');
    return collectionData(postsCollection, { idField: 'id' });
  }
}
