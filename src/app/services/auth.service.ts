import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
  UserCredential,
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

  googleSignIn(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then((result) => {
      const user = result.user;
      const usersCollection = collection(this.firestore, 'users');

      return addDoc(usersCollection, {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        avatarUrl: user.photoURL,
      }).then(() => result);
    });
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
