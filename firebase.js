import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUiwY5rcwqjWZ6OCN7-S9iNvzc-AZxbUI",
  authDomain: "freebeeapp-d0524.firebaseapp.com",
  databaseURL: "https://freebeeapp-d0524.firebaseio.com",
  projectId: "freebeeapp-d0524",
  storageBucket: "freebeeapp-d0524.appspot.com",
  messagingSenderId: "794231349024",
  appId: "1:794231349024:ios:28530a78d30a2a2b220145",
  measurementId: "G-measurement-id",
};

initializeApp(firebaseConfig);

function storeHighScore(userId, score) {
  const db = getDatabase();
  const reference = ref(db, "users/" + userId);
  set(ref(db, "users/" + userId), {
    highscore: score,
  });
}
