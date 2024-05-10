import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyASS_ql62we9XYb3plWDz9PndW8AkBjcdM",
  authDomain: "eshare-a3921.firebaseapp.com",
  projectId: "eshare-a3921",
  storageBucket: "eshare-a3921.appspot.com",
  messagingSenderId: "222646800058",
  appId: "1:222646800058:web:3992520cdfe019b63dbc83",
  measurementId: "G-43MYVVKJHN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
