import firebase from 'firebase';

export function onLoginStateChange(callback) {
  firebase.auth().onAuthStateChanged((user) => {
    callback(Boolean(user));
  });
}

export function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return firebase.auth().signOut();
}

export function isLoggedIn() {
  return true;
}
