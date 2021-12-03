var myParam = location.search.split('type=')[1];
if(myParam=='')
{
    alert('Invalid');
    window.location.href = "user.html";
}
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
        
const app = initializeApp(firebaseConfig);
        
import {getDatabase,ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
        
const db = getDatabase();
var tbody = document.getElementById('tbody1');
function addItemToTable(act,type,name,uid){
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    td1.innerHTML = act;
    td2.innerHTML = type;
    td3.innerHTML = name;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.setAttribute('class',"clickable");
    
    let str = "window.location='trainee.html?id="+uid+"&act="+act+"$#@'";
    trow.setAttribute('onclick',str);
    tbody.appendChild(trow);
}

let flag = 0;
const dbRef = ref(db);
var spin = document.getElementsByClassName('lds-roller')[0];
var spinbody = document.getElementsByClassName('parent-block')[0];
get(child(dbRef,"keyPoints"))
.then((snapshot)=>{
    spin.style.display = "none";
    spinbody.style.display = "none";
    snapshot.forEach(childSnapshot=>{
        //alert(childSnapshot.val().pose.type);
        if(childSnapshot.val().pose!=undefined){
            childSnapshot.val().pose.forEach(result=>{
                //alert(result.type);
            if(result.type!=undefined && result.type.toLowerCase()==myParam.toLowerCase()){
                flag = 1;
                addItemToTable(result.name,result.type,childSnapshot.val().name,childSnapshot.ref._path.pieces_[1]);
            }
            });
        }
    });
    if(flag==0)
    {
        document.getElementById('msg').style.display = "block";
        document.getElementById('msg').innerHTML = "No records found for your searched type";
    }
})
.catch((e)=>{
    //alert(e);
    location.reload();
})