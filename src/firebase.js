import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCkGetk9eEzxFscMY-Q3W_UxdWxzBmWolE",
    authDomain: "todo-react-app-e001b.firebaseapp.com",
    databaseURL: "https://todo-react-app-e001b.firebaseio.com",
    projectId: "todo-react-app-e001b",
    storageBucket: "todo-react-app-e001b.appspot.com",
    messagingSenderId: "1062671328600",
    appId: "1:1062671328600:web:99274cde7d45206e18312d",
    measurementId: "G-25J3C7FP3R"
})

const db = firebaseApp.firestore();

export default db ;