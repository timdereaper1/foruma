import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../firebase-config.json';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;
