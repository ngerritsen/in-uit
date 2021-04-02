import firebase from "firebase";

export function onLoginStateChange(callback: (loggedIn: boolean) => void) {
  firebase.auth().onAuthStateChanged((user) => {
    callback(Boolean(user));
  });
}

export function login(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logout(): Promise<void> {
  return firebase.auth().signOut();
}
