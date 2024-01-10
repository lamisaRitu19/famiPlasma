// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBIaxhVTCOhwjuKt1oUYmONyUS3QVnVrKA",
//   authDomain: "famiplasma-3f392.firebaseapp.com",
//   projectId: "famiplasma-3f392",
//   storageBucket: "famiplasma-3f392.appspot.com",
//   messagingSenderId: "877526471929",
//   appId: "1:877526471929:web:279caa4460d07cb1b3be28",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
