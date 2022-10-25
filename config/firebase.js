import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyDXhk-jBa_G-0BkdW911s5SKyQSFfv6yVg",
    authDomain: "if66h-3fde8.firebaseapp.com",
    projectId: "if66h-3fde8",
    storageBucket: "if66h-3fde8.appspot.com",
    messagingSenderId: "551995125054",
    appId: "1:551995125054:web:54f6ba846b292ae536906f",
    measurementId: "G-VRZTPL1YX7"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}