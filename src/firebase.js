import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
// === add your firebase config
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
