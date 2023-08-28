import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZrwO_so_coUpQ1mxqGOejGWvxZ-_InOM",
  authDomain: "clone-v3-6ee9f.firebaseapp.com",
  projectId: "clone-v3-6ee9f",
  storageBucket: "clone-v3-6ee9f.appspot.com",
  messagingSenderId: "496898185231",
  appId: "1:496898185231:web:e710d88035f60aa4192b7a"
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
