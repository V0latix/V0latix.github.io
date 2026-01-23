// firebaseConfig.js

// Import depuis les CDN Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

// Ta configuration Firebase (donnée par la console Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCCKShBZwo6G5V3vGf3oCV6YkhutiN-gFo",
  authDomain: "tarot-c241b.firebaseapp.com",
  projectId: "tarot-c241b",
  storageBucket: "tarot-c241b.firebasestorage.app",
  messagingSenderId: "337432549069",
  appId: "1:337432549069:web:cb300d47d2bb0be2757b84",
  measurementId: "G-P90S5E4MFS"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Optionnel : Exporter l'app et analytics pour les utiliser dans d'autres modules
export { app, analytics };
