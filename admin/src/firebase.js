// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdhvOrIuX_2pGTqdBiDQWMQs1sxkti2Es",
  authDomain: "shop-15dd7.firebaseapp.com",
  projectId: "shop-15dd7",
  storageBucket: "shop-15dd7.appspot.com",
  messagingSenderId: "90307712020",
  appId: "1:90307712020:web:15f97bc93319b3b4ab4301",
  measurementId: "G-XK70HSCFY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;