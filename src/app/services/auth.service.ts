import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<unknown>;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {
    this.user$ = user(this.auth);
  }

  generateAvatarUrl(uid: string) {
    const avatarStyle = 'thumbs';
    return `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${uid}`;
  }

  signup(email: string, username: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredentials) => {
        const uid = userCredentials.user.uid;
        const avatarUrl = this.generateAvatarUrl(uid);
        const usersCollection = collection(this.firestore, 'users');
        return addDoc(usersCollection, {
          uid,
          username,
          email,
          avatarUrl,
        });
      }
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Failed to sign out:', error);
      });
  }
}
