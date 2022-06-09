import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { firebaseConfig } from '../settings/firebaseConfigFile';
import { classToggleElements, elements, elementsExit } from '../index';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      // ..
    });
}

function signUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    console.log(user);
    classToggleElements('d-none', 'add', elements);
    classToggleElements('d-none', 'remove', elementsExit);
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    console.log(null);
    classToggleElements('d-none', 'remove', elements);
    classToggleElements('d-none', 'add', elementsExit);
    // User is signed out
    // ...
  }
});

function exitUser() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}

export { createUser, signUser, exitUser };
