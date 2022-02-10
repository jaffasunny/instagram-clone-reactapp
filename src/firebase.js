import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCS-ztnVGN4VnSXpc2hdY0M2IuhtWax530",
	authDomain: "instagram-clone-reactapp-db0d8.firebaseapp.com",
	projectId: "instagram-clone-reactapp-db0d8",
	storageBucket: "instagram-clone-reactapp-db0d8.appspot.com",
	messagingSenderId: "658590851498",
	appId: "1:658590851498:web:fdadc018169e3051ef0bd3",
	measurementId: "G-N7PYTWKW1X",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
