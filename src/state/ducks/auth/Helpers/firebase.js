/* eslint-disable consistent-return */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const firestore = firebase.firestore();
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
    return null;
  }
};

const generateUserDocument = async (user, additionalData) => {
  try {
    if (!user) return;

    const firestore = firebase.firestore();
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (snapshot.exists) return snapshot;

    if (!snapshot.exists) {
      const { email } = user;
      await userRef.set({
        email,
        ...additionalData,
      });
    }
    return getUserDocument(user.uid);
  } catch (error) {
    console.error('Error creating user document', error);
  }
};

const signUp = async (payload) => {
  const { displayName, email, password } = payload;
  const auth = firebase.auth();
  await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  const newUser = await generateUserDocument(user, { displayName });
  localStorage.setItem('authUser', JSON.stringify(newUser));
  return newUser;
};

const login = async (payload) => {
  const { email, password } = payload;
  const auth = firebase.auth();
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  const existingUser = await getUserDocument(user.uid);
  localStorage.setItem('authUser', JSON.stringify(existingUser));
  return existingUser;
};

const FirebaseHelpers = {
  signUp,
  login,
  getUserDocument,
};

export default FirebaseHelpers;
