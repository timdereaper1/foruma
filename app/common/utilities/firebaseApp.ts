import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from 'src/firebase-config.json';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;
