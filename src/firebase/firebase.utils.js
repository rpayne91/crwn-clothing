import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBgVIuc0EWm4O12rSx01KDbRkhWypcos1M',
  authDomain: 'crwn-db-9f052.firebaseapp.com',
  databaseURL: 'https://crwn-db-9f052.firebaseio.com',
  projectId: 'crwn-db-9f052',
  storageBucket: 'crwn-db-9f052.appspot.com',
  messagingSenderId: '1033593879503',
  appId: '1:1033593879503:web:4f0041c4663b9776aff0ba',
};

export const createUserProfileDocument = async (userAuth, addionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
