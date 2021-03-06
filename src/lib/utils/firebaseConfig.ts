// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

let firebaseApp;
if (firebase.apps.length) {
  firebaseApp = firebase.app(firebase.apps[0].name);
} else {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}

export const app = firebaseApp;
export const auth = () => app?.auth();
export const getFirebaseToken = () =>
  auth()
    .currentUser?.getIdToken(true)
    .then(token => `Bearer ${token}`);
