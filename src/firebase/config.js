import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBhUdcZ7CfMiw4dM1n9SuHPc-e97nVQYVA",
  authDomain: "wix-test-tree.firebaseapp.com",
  databaseURL: "https://wix-test-tree.firebaseio.com",
  projectId: "wix-test-tree",
  storageBucket: "wix-test-tree.appspot.com",
  messagingSenderId: "718906684673",
  appId: "1:718906684673:web:23669f436541b82a1e5700",
  measurementId: "G-XNZVJ4BXVX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectDatabase = firebase.database();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, projectDatabase, timestamp };
