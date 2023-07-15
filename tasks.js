import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, push, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"


const firebaseConfig = {
 apiKey: "AIzaSyB6b3gNd2_NYTiYpORhiorn-9Rfxs3P-qw",
 authDomain: "task-sync-v2.firebaseapp.com",
 projectId: "task-sync-v2",
 storageBucket: "task-sync-v2.appspot.com",
 messagingSenderId: "750605991425",
 appId: "1:750605991425:web:6fdcb576e673fbf3fd4a00",
 databaseURL: "https://task-sync-v2-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app)



//fetch data
onAuthStateChanged(auth, (user) => {
 if (user) {
  const uid = user.uid;
  const email = user.email;
  const userEmail = document.getElementById("profileEmail")
  userEmail.innerHTML = email;
  fetchData();
 }

})

//fetch data function
function fetchData() {
 const UserId = auth.currentUser.uid;
 const userTaskRef = ref(database, 'users/' + UserId + '/tasks')
 onValue(userTaskRef, function (snapshot) {
  const taskList = Object.values(snapshot.val() || {})

  const taskContainer = document.getElementById("tasks");
  taskContainer.innerHTML = "";

  if (taskList.length === 0) {
   const li = document.createElement("li")
   li.innerHTML = "No tasks Found"
   taskContainer.appendChild(li)
  }
  else {
   taskList.forEach(task => {
    const li = document.createElement("li")
    li.innerHTML = task;
    taskContainer.appendChild(li)
   })
  }

 })
}

//add data to database
const addTask = document.getElementById("addTask")
addTask.addEventListener("click", function (event) {
 event.preventDefault();
 const task = document.getElementById("taskInput").value;
 const taskValue = task.trim();

 if (taskValue !== "") {
  const UserId = auth.currentUser.uid;
  const userTaskRef = ref(database, 'users/' + UserId + '/tasks')

  push(userTaskRef, taskValue)
   .then(function () {
    alert("task Added")
    taskValue = "";
   })

 }


})

const erase = document.getElementById("delete")
erase.addEventListener("click", function () {
const user = auth.currentUser;
 if (user) {
  const UserId = auth.currentUser.uid;
  const userTaskRef = ref(database, 'users/' + UserId + '/tasks')
  set(userTaskRef, null)
   .then(function () {
    alert("Items Deleted")
   })
 }




})