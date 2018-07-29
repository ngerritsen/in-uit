/* eslint-disable no-constant-condition */

import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import firebaseRef from './firebase';
import { ADD, REMOVE, EDIT, LOGIN } from './constants';
import { get, loginSuccess, logout } from './actions';
import { objectToArray } from './helpers/utility';

export default function *rootSaga() {
  yield [
    initializeSaga(),
    addSaga(),
    removeSaga(),
    editSaga(),
    loginSaga()
  ];
}

function *initializeSaga() {
  const loginExpires = localStorage.getItem('loginExpires');
  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  if (loginExpires && loginExpires < currentTime) {
    yield put(loginSuccess());
    yield call(getSaga);
  }
}

function *loginSaga() {
  yield* takeEvery(LOGIN, login);
}

function *login({ email, password }) {
  yield call(doLogin, email, password);
  yield put(loginSuccess());
  yield call(getSaga);
}

function *addSaga() {
  yield* takeEvery(ADD, addItem);
}

function *addItem({ item, id }) {
  yield call(() => firebaseRef.child('items').child(id).set(item));
  yield* getSaga();
}

function *removeSaga() {
  yield* takeEvery(REMOVE, removeItem);
}

function *removeItem({ id }) {
  yield call(() => firebaseRef.child('items').child(id).remove());
  yield* getSaga();
}

function *editSaga() {
  yield* takeEvery(EDIT, edit);
}

function *edit({ item }) {
  yield call(() => firebaseRef.child('items').child(item.id).update(item));
  yield* getSaga();
}

function *getSaga() {
  try {
    const data = yield call(getItems);
    const itemsObj = data.val();
    const items = itemsObj ? objectToArray(itemsObj) : [];

    yield put(get(items));
  } catch(error) {
    yield* handleFirebaseError(error);
  }
}

function doLogin(email, password) {
  return new Promise((resolve, reject) => {
    firebaseRef.authWithPassword({ email, password }, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(data);
      localStorage.setItem('loginExpires', data.expires);
    });
  });
}

function getItems() {
  return new Promise((resolve, reject) => {
    firebaseRef.child('items').once('value')
      .then(data => resolve(data))
      .catch(error => {
        reject(error);
        console.error(error); // eslint-disable-line no-console
      });
  });
}

function *handleFirebaseError(error) {
  if (error.message && error.message.toLowerCase().includes('permission_denied')) {
    yield put(logout());
    return;
  }

  throw error;
}
