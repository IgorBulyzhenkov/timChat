import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { firebaseConfig } from '../settings/firebaseConfigFile';
import {
  classToggleElements,
  elements,
  elementsExit,
  getUserId,
  drowMarkup,
} from '../index';
import { createMarkup } from '../template/markup';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getDatabase();
let userId = null;

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
    userId = user.uid;
    getUserId(userId);

    // ...
  } else {
    console.log(null);
    classToggleElements('d-none', 'remove', elements);
    classToggleElements('d-none', 'add', elementsExit);
    getUserId(null);
    userId = null;
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

function sendMessage(message) {
  console.log(message);
  push(ref(db, 'messages'), message);
}

const starCountRef = ref(db, 'messages');
onValue(starCountRef, snapshot => {
  const data = snapshot.val();
  if (!userId || !data) {
    return;
  }
  const dataArr = Object.values(data);
  const markup = createMarkup(dataArr, userId);
  drowMarkup(markup);
});

export { createUser, signUser, exitUser, sendMessage };
