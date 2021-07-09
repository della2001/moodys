import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5vhZE7dJfgK3P1dJnWE5Lw2877Jc3ciI",
  authDomain: "moodys-hackathon.firebaseapp.com",
  projectId: "moodys-hackathon",
  storageBucket: "moodys-hackathon.appspot.com",
  messagingSenderId: "104962119225",
  appId: "1:104962119225:web:1941102990f23407131fe8",
  measurementId: "G-E0S4SFZX5L",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

export default database;
