import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Post } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private firestore: Firestore) {}

  getBlogPosts(): Observable<DocumentData[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const queryPosts = query(postsCollection, orderBy('dateCreated', 'desc'));
    return collectionData(queryPosts, { idField: 'id' });
  }

  getPostById(id: string): Observable<DocumentData | undefined> {
    const postDoc = doc(this.firestore, 'posts', id);
    return from(getDoc(postDoc)).pipe(
      map((docSnap) => (docSnap.exists() ? docSnap.data() : undefined))
    );
  }

  createPost(post: DocumentData) {
    const postsCollection = collection(this.firestore, 'posts');
    return addDoc(postsCollection, post);
  }

  editPost(postId: string, post: DocumentData) {
    const postDoc = doc(this.firestore, 'posts', postId);
    return updateDoc(postDoc, post);
  }

  deletePost(postId: string) {
    const postDoc = doc(this.firestore, 'posts', postId);
    return from(deleteDoc(postDoc));
  }
}
