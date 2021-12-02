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

  import {getDatabase,ref, get, child} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const db = getDatabase();
let v = [];
let sizeofv=0;
let totalacc=0;



function showwData(){
    const dbref = ref(db);
    var myParam = location.search.split('id=')[1];
let uid = "";
let act = "";
for(let i=0;i<myParam.length;i++){
  if(myParam[i]=='&'){
    while(myParam[i]!='$'&& myParam[i+1]!='#' && myParam[i+2]!='@'){
      if(myParam[i]=='%')
            {
              act += ' ';
              i++;
              i++;
              i++;
            }
      act += myParam[i];
      i++;
    }
  }
  else{
    uid += myParam[i];
  }
}

console.log(uid);
console.log(act.slice(5));

  get(child(dbref,"keyPoints/"+uid))
  .then((snapshot)=>{
    if(snapshot.exists())
    {
        //alert("Name "+snapshot.val().NameofStd+" roll no "+snapshot.val().RollNo);
        snapshot.val().pose.forEach(childSnapshot => {
          //console.log(childSnapshot);
          //alert(act.slice(5));
          if(childSnapshot.name.toLowerCase()==act.slice(5).toLowerCase()){
            v = childSnapshot.keypoints;
            alert('keypoints received');
            //console.log(v);
              const out5 = document.getElementsByClassName('output5')[0];
    const canvasCtx5 = out5.getContext('2d');
    const video5 = document.getElementsByClassName('input_video5')[0];
    const out6 = document.getElementsByClassName('output6')[0];
    const canvasCtx6 = out6.getContext('2d');
    
    const controlsElement5 = document.getElementsByClassName('control5')[0];
    const fpsControl = new FPS();
    
    let start = -1;
    function startModel()
    {
      if(v.length>1)
      {
        entry = 0;
      }
      console.log("Started");
      start = 1;
      startm.innerHTML = "Restart";
      ll();
      return;
    }
    function stopModel()
    {
      console.log("Stopped");
      start = 0;
      return;
    }
    
    function zColor(data) {
      const z = clamp(data.from.z + 0.5, 0, 1);
      return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
    }
    
    let entry = 0;
    function onResultsPose(results) {
      if(start==0)
      {
        //console.log(vector);
        start = -1;
        return;
      }
      else if(start==1)
      {
        document.body.classList.add('loaded');
        //fpsControl.tick();
    
      canvasCtx5.save();
      canvasCtx5.clearRect(0, 0, out5.width, out5.height);
      canvasCtx6.save();
      canvasCtx6.clearRect(0, 0, out6.width, out6.height);
      canvasCtx5.drawImage(results.image, 0, 0, out5.width, out5.height);
      //canvasCtx6.drawImage(results.image, 0, 0, out6.width, out6.height);
      drawConnectors(canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
            color: (data) => {
              const x0 = out5.width * data.from.x;
              const y0 = out5.height * data.from.y;
              const x1 = out5.width * data.to.x;
              const y1 = out5.height * data.to.y;
    
              const z0 = clamp(data.from.z + 0.5, 0, 1);
              const z1 = clamp(data.to.z + 0.5, 0, 1);
    
              const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
              gradient.addColorStop(
                  0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
              gradient.addColorStop(
                  1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
              return gradient;
            }
          });
      drawLandmarks(
          canvasCtx5,
          Object.values(POSE_LANDMARKS_LEFT)
              .map(index => results.poseLandmarks[index]),
          {color: zColor, fillColor: '#FF0000'});
      drawLandmarks(
          canvasCtx5,
          Object.values(POSE_LANDMARKS_RIGHT)
              .map(index => results.poseLandmarks[index]),
          {color: zColor, fillColor: '#00FF00'});
      drawLandmarks(
          canvasCtx5,
          Object.values(POSE_LANDMARKS_NEUTRAL)
              .map(index => results.poseLandmarks[index]),
          {color: zColor, fillColor: '#AAAAAA'});
    
          sizeofv++;
          compare(results.poseLandmarks,v[entry]);
          drawConnectors(canvasCtx6, v[entry], POSE_CONNECTIONS, {
            color: (data) => {
              const x0 = out6.width * data.from.x;
              const y0 = out6.height * data.from.y;
              const x1 = out6.width * data.to.x;
              const y1 = out6.height * data.to.y;
    
              const z0 = clamp(data.from.z + 0.5, 0, 1);
              const z1 = clamp(data.to.z + 0.5, 0, 1);
    
              const gradient = canvasCtx6.createLinearGradient(x0, y0, x1, y1);
              gradient.addColorStop(
                  0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
              gradient.addColorStop(
                  1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
              return gradient;
            }
          });
          drawLandmarks(
            canvasCtx6,
            Object.values(POSE_LANDMARKS_LEFT)
                .map(index => v[entry][index]),
            {color: zColor, fillColor: '#FF0000'});
        drawLandmarks(
            canvasCtx6,
            Object.values(POSE_LANDMARKS_RIGHT)
                .map(index => v[entry][index]),
            {color: zColor, fillColor: '#00FF00'});
        drawLandmarks(
            canvasCtx6,
            Object.values(POSE_LANDMARKS_NEUTRAL)
                .map(index => v[entry][index]),
            {color: zColor, fillColor: '#AAAAAA'});
      
    
      canvasCtx5.restore();
      canvasCtx6.restore();
      entry++;
      }
    }
    
    
    function ll()
    {
      console.log("reached");
      pose.onResults(onResultsPose);
    }
    const pose = new Pose({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    }});
    
    const camera = new Camera(video5, {
      onFrame: async () => {
        await pose.send({image: video5});
      },
      width: 480,
      height: 480
    });
    camera.start();
    
    
    
    
    var startm = document.getElementById("startM");
    startm.addEventListener('click',startModel);
    
    var stopm = document.getElementById("stopM");
    stopm.addEventListener('click',stopModel);
    
    var div = document.getElementById("div1");
    
    function compare(a,b){
      if(b==null)
      {
        console.log("finish");
        let msg = "Your Average Accuracy is "+ (totalacc/sizeofv).toFixed(3) ;
        sizeofv = 0;
        totalacc = 0;
        div.style.display = "none";
        console.log(msg);
        stopModel();
        document.getElementById("C-score").innerHTML = msg;
      }
      let sum = 0;
      let threshold = 0.065;
      let AnoseX = a[0].x;
      let AnoseY = a[0].y;
      let BnoseX = b[0].x;
      let BnoseY = b[0].y;
      let distA = calDist(AnoseX,AnoseY,a[25].x,a[25].y);
      let distB = calDist(BnoseX,BnoseY,b[25].x,b[25].y);
      for(let i=0;i<33;i++){
        let dist = calDist((a[i].x-AnoseX)*distB,(a[i].y-AnoseY)*distB,(b[i].x-BnoseX)*distA,(b[i].y-BnoseY)*distA);
        if(dist <= threshold && dist >= -threshold ){
          sum++;
        }
      }
      let accuracy = sum*100 / 33;
      //console.log(accuracy);
      totalacc += accuracy;
      document.getElementById("C-score").innerHTML = (accuracy).toFixed(3);
      if(accuracy < 70)
      {
        div.style.display = "block";
      }
      else
      {
        div.style.display = "none";
      }
    }
    
    function calDist(x1,y1,x2,y2){
      let ans = (x2-x1)*(x2-x1)+(y2-y1)*(y2-y1);
      let result = Math.sqrt(ans);
      return result;
    }
    
    new ControlPanel(controlsElement5, {
          selfieMode: true,
          upperBodyOnly: false,
          smoothLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        })
        /*.add([
          new StaticText({title: 'MediaPipe Pose'}),
          fpsControl,
          new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
          new Toggle({title: 'Upper-body Only', field: 'upperBodyOnly'}),
          new Toggle({title: 'Smooth Landmarks', field: 'smoothLandmarks'}),
          new Slider({
            title: 'Min Detection Confidence',
            field: 'minDetectionConfidence',
            range: [0, 1],
            step: 0.01
          }),
          new Slider({
            title: 'Min Tracking Confidence',
            field: 'minTrackingConfidence',
            range: [0, 1],
            step: 0.01
          }),
        ])*/
        .on(options => {
          video5.classList.toggle('selfie', options.selfieMode);
          pose.setOptions(options);
        });
          
      }
        })
        ;
    }
    else
    {
      alert("No Data Found");
    }
  })
  .catch((e)=>{
    //alert(e+'Firebase Error, Press OK to reload');
    //alert(e);
    location.reload();
  })
}


window.onload = showwData();




