import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBX4vF6UQdXJEv7EG4W3Ti11WrbLOgVEFA",
  authDomain: "musicapp-da886.firebaseapp.com",
  projectId: "musicapp-da886",
  storageBucket: "musicapp-da886.appspot.com",
  messagingSenderId: "457286850409",
  appId: "1:457286850409:web:216bf0a3a7fda8297dcff8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const usersCollection = db.collection("users");
const songCollection = db.collection("songs");
const commentCollection = db.collection("comments");
db.enablePersistence().catch((error) => {
  console.log(`Firebase persistench error ${error.code}`);
});
export {
  auth,
  db,
  storage,
  usersCollection,
  songCollection,
  commentCollection,
};
