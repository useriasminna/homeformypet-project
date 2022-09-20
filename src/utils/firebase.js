// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCq_jXEmB0Pcyqi966HrXpjhax8iigQHLQ",
  authDomain: "homeformypet-project.firebaseapp.com",
  projectId: "homeformypet-project",
  storageBucket: "homeformypet-project.appspot.com",
  messagingSenderId: "774422296732",
  appId: "1:774422296732:web:b06e868085e8eacedbd559",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
