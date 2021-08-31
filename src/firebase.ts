import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDBWL2liWf2HiAz_cK6iQ-acW97KPDdWsk",
    authDomain: "momomoblog-f6697.firebaseapp.com",
    projectId: "momomoblog-f6697",
    storageBucket: "momomoblog-f6697.appspot.com",
    messagingSenderId: "270993009226",
    appId: "1:270993009226:web:f7060ac8f17c90ebc114b3",
    measurementId: "G-5GLDPX4G46"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

firebase.analytics();

const db = firebase.firestore();
const markdownCollection = db.collection('markdown');

export const storage = firebase.storage();

export {
    markdownCollection
}