
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB06vxIXkxwPG_5ib43lG3Dp0WYIANMMd8",
  authDomain: "poseapp-9f4ee.firebaseapp.com",
  databaseURL: "https://poseapp-9f4ee-default-rtdb.firebaseio.com",
  projectId: "poseapp-9f4ee",
  storageBucket: "poseapp-9f4ee.appspot.com",
  messagingSenderId: "497541789918",
  appId: "1:497541789918:web:de2528db5bb45fc3a92a4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase,ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const db = getDatabase();

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

  get(child(dbref,"keyPoints/"+1)).then((snapshot)=>{
    if(snapshot.exists())
    {
        //alert("Name "+snapshot.val().NameofStd+" roll no "+snapshot.val().RollNo);
        alert("test"+snapshot.val().name);
        //alert("test"+snapshot.val().pose[0][0].x);
    }
    else
    {
      alert("No Data Found");
    }
  })
}


  var uid = localStorage.getItem('id');
  if(uid){const dbref = ref(db);

get(child(dbref,"Users/"+uid)).then((snapshot)=>{
  if(snapshot.exists())
  {
      //alert("Name "+snapshot.val().NameofStd+" roll no "+snapshot.val().RollNo);
      //alert("test"+snapshot.val().name);
      document.getElementById('getname').innerHTML = snapshot.val().name;
      //alert("test"+snapshot.val().pose[0][0].x);
  }
  else
  {
    alert("No Data Found");
  }
});
}


isnBtn.addEventListener('click',insertData);
//showData.addEventListener('click',showwData);




