
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
  var naam = null;
  var data = [];
  if(uid){const dbref = ref(db);

get(child(dbref,"Users/"+uid)).then((snapshot)=>{
  if(snapshot.exists())
  {
      //alert("Name "+snapshot.val().NameofStd+" roll no "+snapshot.val().RollNo);
      //alert("test"+snapshot.val().name);
      document.getElementById('getname').innerHTML = snapshot.val().name;
      naam = snapshot.val().name;
      localStorage.setItem("name",snapshot.val().name);
      //alert("test"+snapshot.val().pose[0][0].x);
  }
  else
  {
    alert("No Data Found");
  }
});
}

function insertData(){
  if(naam==null || uid==null){
    alert("Cannot fulfill request");
  }
  else{
    var act = document.getElementById('actName').value;
    alert(act);
    //getData();
    const dbref = ref(db);

  get(child(dbref,"keyPoints/"+uid)).then((snapshot)=>{
    if(snapshot.exists())
    {
      if(snapshot.val().pose)
      {
        for(let i=0;i<snapshot.val().pose.length;i++)
        {
          data.push(snapshot.val().pose[i]);
        }
        
      }
        //alert("done");
    }
    else
    {
      alert("No Data Found");
    }
  })
  .then(()=>{
    //alert("came back");
    data.push({name:act,keypoints:vector});
    set(ref(db,"keyPoints/"+uid),{
      name: naam,
      pose: data
    })
    .then(()=>{
      alert("data stored successfully");
      window.location.href = "test.html";
    })
    .catch((error) => {
      alert("error occured"+ error);
    });
  });
  // set(ref(db,"keyPoints/"+uid),{
  //   name: naam,
  //   pose: [{name:act,keypoints:vector}]
  // })
  // .then(()=>{
  //   alert("data stored successfully");
  //   window.location.href = "test.html";
  // })
  // .catch((error) => {
  //   alert("error occured"+ error);
  // });

    
    
  }
}


isnBtn.addEventListener('click',insertData);
//showData.addEventListener('click',showwData);

var open = document.getElementById('openform');
open.addEventListener('click',hideMain);

function hideMain(){
  document.getElementById('mainArea').style.display = "none";
  document.getElementById('form').style.display = "block";
}





