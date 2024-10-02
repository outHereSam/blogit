import { Injectable } from '@angular/core';
import {
  Auth,
  user,
  UserCredential,
  UserInfo,
  UserMetadata,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<unknown>;
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {
    this.user$ = user(this.auth);
  }

  getUser() {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(
      usersCollection,
      where('uid', '==', this.auth.currentUser?.uid)
    );

    return getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          return snapshot.docs[0].data(); // return the first matching user's data
        } else {
          throw new Error('User not found');
        }
      })
      .catch((error) => {
        console.error('Error getting user: ', error);
        throw error;
      });
  }
}
