import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyB06vxIXkxwPG_5ib43lG3Dp0WYIANMMd8",
    authDomain: "poseapp-9f4ee.firebaseapp.com",
    databaseURL: "https://poseapp-9f4ee-default-rtdb.firebaseio.com",
    projectId: "poseapp-9f4ee",
    storageBucket: "poseapp-9f4ee.appspot.com",
    messagingSenderId: "497541789918",
    appId: "1:497541789918:web:de2528db5bb45fc3a92a4f"
  };

  import {getDatabase,ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

if(location.pathname=='/update.html'){
    //alert("welcome");
    var url = location.search.split('type=')[1];
  var type = "";
  var actname = "";
  var uid = localStorage.getItem('id');
  var name = localStorage.getItem('name');
  for(let i=0;i<url.length;i++){
      if(url[i]=='&'){
        while(url[i]!='='){
            i++;
        }
        i++;
        while(i<url.length){
            actname += url[i];
            i++;
            //break;
        }
      }
      else{
          type += url[i];
      }
  }
  type = type.toLowerCase();
  actname = actname.toLowerCase();
  console.log(type);
  console.log(name);
  console.log(actname);
  console.log(uid);

  document.getElementById('name').value = actname;
  document.getElementById('activity').value = type;

  var updat = document.getElementById('upd');
  updat.addEventListener('click',updatefunc);

  function updatefunc(){
    if (confirm('Are you sure you want to Update?')) {
        // Save it!
        console.log('Yes');
      } else {
        // Do nothing!
        window.location.href = "test.html";
      }
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

    const dbRef = ref(db);
  let pose =[];
  get(child(dbRef,"keyPoints/"+uid))
  .then((snapshot)=>{
    snapshot.val().pose.forEach(result=>{
        console.log(result);
        if(result.type.toLowerCase()==type && result.name.toLowerCase()==actname){
            var posetype = document.getElementById('activity').value;
            var posename = document.getElementById('name').value;
            pose.push({type: posetype,name:posename,keypoints:result.keypoints});
        }
        else{
            pose.push(result);
        }
    })
  })
  .then(()=>{
    console.log(pose);  
    set(ref(db,"keyPoints/"+uid),{
        name: name,
        pose: pose
      })
      .then(()=>{
        alert("data Updated successfully");
        window.location.href = "test.html";
      })
      .catch((error) => {
        alert("error occured"+ error);
      });
  })
  .catch((e)=>{
      console.log(e);
  })

  }
}
else{
    
if (confirm('Are you sure you want to delete this activity?')) {
    // Save it!
    console.log('Yes');
  } else {
    // Do nothing!
    window.location.href = "test.html";
  }



  const app = initializeApp(firebaseConfig);
  const db = getDatabase();

  var url = location.search.split('type=')[1];
  var type = "";
  var actname = "";
  var uid = localStorage.getItem('id');
  var name = localStorage.getItem('name');
  for(let i=0;i<url.length;i++){
      if(url[i]=='&'){
        while(url[i]!='='){
            i++;
        }
        i++;
        while(i<url.length){
            actname += url[i];
            i++;
            //break;
        }
      }
      else{
          type += url[i];
      }
  }
  console.log(type);
  console.log(name);
  console.log(actname);
  console.log(uid);
  type = type.toLowerCase();
  actname = actname.toLowerCase();

  const dbRef = ref(db);
  let pose =[];
  let flag = 0;
  get(child(dbRef,"keyPoints/"+uid))
  .then((snapshot)=>{
    snapshot.val().pose.forEach(result=>{
        console.log(result);
        if(result.type.toLowerCase()==type && result.name.toLowerCase()==actname){
            ;
        }
        else{
            pose.push(result);
            flag = 1;
        }
    })
  })
  .then(()=>{
    console.log(pose); 
    if(flag==0){
        remove(ref(db,"keyPoints/"+uid))
        .then(()=>{
            alert("Data deleted successfully");
            window.location.href = "test.html";
        })
        .catch(()=>{
            console.log(e);
            location.reload();
        })
    } 
    set(ref(db,"keyPoints/"+uid),{
        name: name,
        pose: pose
      })
      .then(()=>{
        alert("data deleted successfully");
        window.location.href = "test.html";
      })
      .catch((error) => {
        alert("error occured"+ error);
      });
  })
  .catch((e)=>{
      console.log(e);
  })
}


  