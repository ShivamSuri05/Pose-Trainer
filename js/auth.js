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
      alert("user created "+fname.value+pno.value+user.email+user.uid);
      set(ref(db,"Users/"+user.uid),{
        name: fname.value,
        contact: pno.value,
        email: user.email,
        poses: []
    })
    .then(()=>{
      alert("data stored successfully");
      localStorage.setItem("id",user.uid);
      window.location.href = 'test.html';
    })
    .catch((error) => {
      alert("error occured"+ error);
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
      alert("user log in "+user.uid);
      localStorage.setItem("id",user.uid);
      window.location.href = 'test.html';
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    // ..
  });


})



// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// import {getDatabase,ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// const db = getDatabase();
/*
var isnBtn = document.getElementById("isnbtn");
var showData = document.getElementById("show");
function insertData(){
  set(ref(db,"keyPoints/"+1),{
        name: "Shivam",
        pose: [{name:"dance",keypoints:vector}]
  })
  .then(()=>{
    alert("data stored successfully");
  })
  .catch((error) => {
    alert("error occured"+ error);
  });
}

function showwData(){
  const dbref = ref(db);

  get(child(dbref,"TheStudents/"+2)).then((snapshot)=>{
    if(snapshot.exists())
    {
        //alert("Name "+snapshot.val().NameofStd+" roll no "+snapshot.val().RollNo);
        alert("test"+snapshot.val().data[0][0].x);
    }
    else
    {
      alert("No Data Found");
    }
  })
}

isnBtn.addEventListener('click',insertData);
showData.addEventListener('click',showwData);
*/
//firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// // import {auth} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
// const auth = firebase.auth();

// function SignUp(){
//     var fname = document.getElementById('fullname');
//     var pno = document.getElementById('phno');
//     var email = document.getElementById('mail');
//     var pass = document.getElementById('pass1');

//     const promise = auth.createWithEmailAndPassword(email.value, pass.value);
//     promise.catch(e => alert(e.message));
//     alert("Signed Up");
// }