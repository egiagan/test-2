import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6b3gNd2_NYTiYpORhiorn-9Rfxs3P-qw",
  authDomain: "task-sync-v2.firebaseapp.com",
  projectId: "task-sync-v2",
  storageBucket: "task-sync-v2.appspot.com",
  messagingSenderId: "750605991425",
  appId: "1:750605991425:web:6fdcb576e673fbf3fd4a00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = document.getElementById("login")
login.addEventListener("click", function(event){

const email = document.getElementById("email").value;
const password =document.getElementById("password").value;

 signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    const user = userCredential.user;
    window.location.href="/dashboard.html"
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
})


