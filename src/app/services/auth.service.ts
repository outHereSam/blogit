import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<unknown>;

  constructor(private firestore: Firestore, private auth: Auth) {
    this.user$ = user(this.auth);
  }

  signup(email: string, username: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredentials) => {
        const uid = userCredentials.user.uid;
        const usersCollection = collection(this.firestore, 'users');
        return addDoc(usersCollection, {
          uid,
          username,
          email,
        });
      }
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
