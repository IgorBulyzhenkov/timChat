import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
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
const storage = getStorage();
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
  push(ref(db, 'messages'), message);
}

const starCountRef = ref(db, 'messages');
onValue(starCountRef, snapshot => {
  const data = snapshot.val();
  if (!data) {
    return;
  }

  const dataArr = Object.values(data);
  const markup = createMarkup(dataArr, userId);
  drowMarkup(markup);
});

function sevFirebaseFile(file) {

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    snapshot => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    error => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        console.log('File available at', downloadURL);
      });
    }
  );
}

export { createUser, signUser, exitUser, sendMessage, sevFirebaseFile };
