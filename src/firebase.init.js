import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyATTTcDhWuMnyKyn-YhSUgbGiPtQ-D34vA",
  authDomain: "time-tracker-a8729.firebaseapp.com",
  projectId: "time-tracker-a8729",
  storageBucket: "time-tracker-a8729.appspot.com",
  messagingSenderId: "427914333283",
  appId: "1:427914333283:web:f10c11b22c6acef8b4bc56",
  databaseURL:
    "https://time-tracker-a8729-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
