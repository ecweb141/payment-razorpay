// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcZbcQYXa3w4f2pXwUApyED_eBe4hBPFU",
  authDomain: "file-uploads-1940a.firebaseapp.com",
  projectId: "file-uploads-1940a",
  storageBucket: "file-uploads-1940a.appspot.com",
  messagingSenderId: "857198288387",
  appId: "1:857198288387:web:7063dd8ef2af5ab707b836",
  measurementId: "G-WCVTCQ3CRG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getStorage } from "firebase/storage";

export const fireStorage = getStorage(app);
