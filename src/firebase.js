import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBmEndkUu6hrFAEkPImPDM2W-5c9PT_E5w",
    authDomain: "netlfi.firebaseapp.com",
    projectId: "netlfi",
    storageBucket: "netlfi.appspot.com",
    messagingSenderId: "786983651246",
    appId: "1:786983651246:web:4d92f2e83be74ae7f72a3f",
    measurementId: "G-JGGWV97T1N"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()
export default storage;