// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCD2oH8C9inKTWDfJOH5hOH-DMwwB5I4_I',
	authDomain: 'readinglistsite-780b1.firebaseapp.com',
	projectId: 'readinglistsite-780b1',
	storageBucket: 'readinglistsite-780b1.appspot.com',
	messagingSenderId: '344170672173',
	appId: '1:344170672173:web:1345789b5272798d5848a4',
	measurementId: 'G-L2DRLRTZZ7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);
export const storageDB = getStorage(app);
