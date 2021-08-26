/** @format */

import firebase from "firebase";

const firebaseConfig = {
	// apiKey: process.env.API_KEY,
	// authDomain: process.env.AUTH_DOMAIN,
	// projectId: process.env.PROJECT_ID,
	// storageBucket: process.env.STORAGE_BUCKET,
	// messagingSenderId: process.env.MESSAIN_SENDER_ID,
	// appId: process.env.APPID,

	apiKey: "AIzaSyBfrhKtWr4p8Pct0wvLQOjcaY4HkgLCnVc",

	authDomain: "tinder-clone-a49bf.firebaseapp.com",

	projectId: "tinder-clone-a49bf",

	storageBucket: "tinder-clone-a49bf.appspot.com",

	messagingSenderId: "822435014846",

	appId: "1:822435014846:web:6101aad8f0ea7b845056ef",
};

const firebaseApp = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
