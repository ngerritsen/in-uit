import firebase from "firebase";
import { Observable, Observer } from "rxjs";

export function onLoginStateChange(): Observable<boolean> {
  return new Observable((observer: Observer<boolean>) => {
    firebase.auth().onAuthStateChanged((user) => {
      observer.next(Boolean(user));
    });
  });
}

export function login(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logout(): Promise<void> {
  return firebase.auth().signOut();
}
