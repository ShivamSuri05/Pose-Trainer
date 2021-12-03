import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB06vxIXkxwPG_5ib43lG3Dp0WYIANMMd8",
  authDomain: "poseapp-9f4ee.firebaseapp.com",
  databaseURL: "https://poseapp-9f4ee-default-rtdb.firebaseio.com",
  projectId: "poseapp-9f4ee",
  storageBucket: "poseapp-9f4ee.appspot.com",
  messagingSenderId: "497541789918",
  appId: "1:497541789918:web:de2528db5bb45fc3a92a4f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
import {getDatabase,ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const db = getDatabase();

document.getElementById('signUP').addEventListener('click', function(){
  var fname = document.getElementById('fullname');
    var pno = document.getElementById('phno');
    var email = document.getElementById('mail');
    var pass = document.getElementById('pass1');

    createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
    // Signed in 
      const user = userCredential.user;
      //alert("user created "+fname.value+pno.value+user.email+user.uid);
      set(ref(db,"Users/"+user.uid),{
        name: fname.value,
        contact: pno.value,
        email: user.email,
        poses: []
    })
    .then(()=>{
      alert("Signing Up Successful");
      localStorage.setItem("id",user.uid);
      window.location.href = 'activities.html';
    })
    .catch((error) => {
      alert("error occured "+ error);
    });
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    // ..
  });


})


document.getElementById('logIN').addEventListener('click', function(){
    var email = document.getElementById('loginemail');
    var pass = document.getElementById('loginpass');

    signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
    // Signed in 
      const user = userCredential.user;
      alert("Logged In Successfully");
      localStorage.setItem("id",user.uid);
      window.location.href = 'activities.html';
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    // ..
  });


})

