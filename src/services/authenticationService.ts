import firebaseApp from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Observable, Observer } from "rxjs";

const auth = getAuth(firebaseApp);

export function isLoggedIn(): boolean {
  return Boolean(auth.currentUser);
}

export function onLoginStateChange(): Observable<boolean> {
  return new Observable((observer: Observer<boolean>) => {
    onAuthStateChanged(auth, (user) => {
      observer.next(Boolean(user));
    });
  });
}

export async function login(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout(): Promise<void> {
  await signOut(auth);
}
