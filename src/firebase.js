import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

firebase.initializeApp({
    apiKey: "AIzaSyC7K0SXyTS4fTRngoQ2-z2wF5qh8dRu7a4",
    authDomain: "wheres-vg-chars.firebaseapp.com",
    projectId: "wheres-vg-chars",
    storageBucket: "wheres-vg-chars.appspot.com",
    messagingSenderId: "755120491825",
    appId: "1:755120491825:web:2f34be26f3149051b27410"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export {firebase, auth, firestore}