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
let v = [];
let sizeofv=0;
let totalacc=0;

function showwData(){
    const dbref = ref(db);

  get(child(dbref,"keyPoints/"+1)).then((snapshot)=>{
    if(snapshot.exists())
    {
        //alert("Name "+snapshot.val().NameofStd+" roll no "+snapshot.val().RollNo);
        v = snapshot.val().pose[0].keypoints;
        alert('keypoints received');
        //helper(v);
        //alert("test "+snapshot.val().pose[0].name);
        //alert("test"+snapshot.val().pose[0][0].x);
    }
    else
    {
      alert("No Data Found");
    }
  })
}

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
  console.log("Started");
  start = 1;
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
    fpsControl.tick();

  canvasCtx5.save();
  canvasCtx5.clearRect(0, 0, out5.width, out5.height);
  canvasCtx6.save();
  canvasCtx6.clearRect(0, 0, out6.width, out6.height);
  //console.log(results.poseLandmarks[0].visibility);
  // confidenceScore = 0;
  // for(let i=0;i<33;i++)
  // {
  //   confidenceScore += results.poseLandmarks[i].visibility;
  // }
  //console.log("C-Score",confidenceScore*100/33);
  //document.getElementById("C-score").innerHTML = (confidenceScore*100/33).toFixed(3);
  //console.log(results.poseLandmarks[0]);
  //vector.push(results.poseLandmarks);
  canvasCtx5.drawImage(results.image, 0, 0, out5.width, out5.height);
  canvasCtx6.drawImage(results.image, 0, 0, out6.width, out6.height);
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

const pose = new Pose({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
}});
function ll()
{
  console.log("reached");
  pose.onResults(onResultsPose);
}

const camera = new Camera(video5, {
  onFrame: async () => {
    await pose.send({image: video5});
  },
  width: 480,
  height: 480
});
camera.start();


var showData = document.getElementById("show");
showData.addEventListener('click',showwData);

var startm = document.getElementById("startM");
startm.addEventListener('click',startModel);

var stopm = document.getElementById("stopM");
stopm.addEventListener('click',stopModel);

function compare(a,b){
  if(b==null)
  {
    console.log("finish");
    let msg = "Your avg acc is "+ (totalacc/sizeofv).toFixed(3) ;
    console.log(msg);
    stopModel();
    document.getElementById("C-score").innerHTML = msg;
  }
  let sum = 0;
  let threshold = 0.1;
  for(let i=0;i<33;i++){
    let dist = calDist(a[i].x,a[i].y,b[i].x,b[i].y);
    if(dist <= threshold && dist >= -threshold ){
      sum++;
    }
  }
  let accuracy = sum*100 / 33;
  //console.log(accuracy);
  totalacc += accuracy;
  document.getElementById("C-score").innerHTML = (accuracy).toFixed(3);
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
    .add([
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
    ])
    .on(options => {
      video5.classList.toggle('selfie', options.selfieMode);
      pose.setOptions(options);
    });









// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyB06vxIXkxwPG_5ib43lG3Dp0WYIANMMd8",
//     authDomain: "poseapp-9f4ee.firebaseapp.com",
//     databaseURL: "https://poseapp-9f4ee-default-rtdb.firebaseio.com",
//     projectId: "poseapp-9f4ee",
//     storageBucket: "poseapp-9f4ee.appspot.com",
//     messagingSenderId: "497541789918",
//     appId: "1:497541789918:web:de2528db5bb45fc3a92a4f"
//   };

//   const app = initializeApp(firebaseConfig);

//   import {getDatabase,ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// const db = getDatabase();
// let v = [];
// const out5 = document.getElementsByClassName('output5')[0];
// const canvasCtx5 = out5.getContext('2d');

// function showwData(){
//     const dbref = ref(db);

//   get(child(dbref,"keyPoints/"+1)).then((snapshot)=>{
//     if(snapshot.exists())
//     {
//         //alert("Name "+snapshot.val().NameofStd+" roll no "+snapshot.val().RollNo);
//         v = snapshot.val().pose[0].keypoints;
//         helper(v);
//         //alert("test "+snapshot.val().pose[0].name);
//         //alert("test"+snapshot.val().pose[0][0].x);
//     }
//     else
//     {
//       alert("No Data Found");
//     }
//   })
// }

// function sleep(ms) {
//     const date=Date.now();
//     let currentDate=null;
//     do {
//         currentDate=Date.now();

//     }while(currentDate-date<ms);
// }

// function zColor(data) {
//     const z = clamp(data.from.z + 0.5, 0, 1);
//     return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
//   }

// function helper(r)
// {
//     let i=0;
//     while(i<41)
//     {
//         console.log(i);
//         func(r[i]);
//        sleep(66.66);
//         i++;
//     }
// }

// function func(r){
//     //console.log("hello");

//    // let delayInMilliseconds = 1000; //1 second
    
//     //let i = 0;
    
    
    
    
       
//    // document.body.classList.add('loaded');
//     //fpsControl.tick();

//   canvasCtx5.save();
//  //canvasCtx5.clearRect(0, 0, out5.width, out5.height);
//   //console.log(results.poseLandmarks[0].visibility);
// //   confidenceScore = 0;
// //   for(let i=0;i<33;i++)
// //   {
// //     confidenceScore += results.poseLandmarks[i].visibility;
// //   }
//   //console.log("C-Score",confidenceScore*100/33);
//   //document.getElementById("C-score").innerHTML = (confidenceScore*100/33).toFixed(3);
//   //console.log(results.poseLandmarks[0]);
//   //vector.push(results.poseLandmarks);
//  // canvasCtx5.drawImage(results.image, 0, 0, out5.width, out5.height);
// //   while(i<41)
// //     {
        
//   drawConnectors(canvasCtx5, r, POSE_CONNECTIONS, {
//         color: (data) => {
//           const x0 = out5.width * data.from.x;
//           const y0 = out5.height * data.from.y;
//           const x1 = out5.width * data.to.x;
//           const y1 = out5.height * data.to.y;

//           const z0 = clamp(data.from.z + 0.5, 0, 1);
//           const z1 = clamp(data.to.z + 0.5, 0, 1);

//           const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
//           gradient.addColorStop(
//               0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
//           gradient.addColorStop(
//               1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
//           return gradient;
//         }
//       });
// //   drawLandmarks(
// //       canvasCtx5,
// //       Object.values(POSE_LANDMARKS_LEFT)
// //           .map(index => r[i][index]),
// //       {color: zColor, fillColor: '#FF0000'});
// //   drawLandmarks(
// //       canvasCtx5,
// //       Object.values(POSE_LANDMARKS_RIGHT)
// //           .map(index => r[i][index]),
// //       {color: zColor, fillColor: '#00FF00'});
// //   drawLandmarks(
// //       canvasCtx5,
// //       Object.values(POSE_LANDMARKS_NEUTRAL)
// //           .map(index => r[i][index]),
// //       {color: zColor, fillColor: '#AAAAAA'});
//   canvasCtx5.restore();
    
// //sleep(250);

// }
// //}




// // const video5 = document.getElementsByClassName('input_video5')[0];

// // const controlsElement5 = document.getElementsByClassName('control5')[0];
// // let confidenceScore;
// // const fpsControl = new FPS();

// // let vector = [];
// // let start = 1;
// // function startModel()
// // {
// //   console.log("Started");
// //   start = 1;
// //   ll();
// //   return;
// // }
// // function stopModel()
// // {
// //   console.log("Stopped");
// //   start = 0;
// //   return;
// // }
// // // const spinner = document.querySelector('.loading');
// // // spinner.ontransitionend = () => {
// // //   spinner.style.display = 'none';
// // // };



// // function onResultsPose(results) {
// //   if(start==0)
// //   {
// //     console.log(vector);
// //     start = -1;
// //     return;
// //   }
// //   else if(start==1)
// //   {
// //     document.body.classList.add('loaded');
// //     fpsControl.tick();

// //   canvasCtx5.save();
// //   canvasCtx5.clearRect(0, 0, out5.width, out5.height);
// //   //console.log(results.poseLandmarks[0].visibility);
// //   confidenceScore = 0;
// //   for(let i=0;i<33;i++)
// //   {
// //     confidenceScore += results.poseLandmarks[i].visibility;
// //   }
// //   //console.log("C-Score",confidenceScore*100/33);
// //   document.getElementById("C-score").innerHTML = (confidenceScore*100/33).toFixed(3);
// //   //console.log(results.poseLandmarks[0]);
// //   vector.push(results.poseLandmarks);
// //   //canvasCtx5.drawImage(results.image, 0, 0, out5.width, out5.height);
// //   drawConnectors(canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
// //         color: (data) => {
// //           const x0 = out5.width * data.from.x;
// //           const y0 = out5.height * data.from.y;
// //           const x1 = out5.width * data.to.x;
// //           const y1 = out5.height * data.to.y;

// //           const z0 = clamp(data.from.z + 0.5, 0, 1);
// //           const z1 = clamp(data.to.z + 0.5, 0, 1);

// //           const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
// //           gradient.addColorStop(
// //               0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
// //           gradient.addColorStop(
// //               1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
// //           return gradient;
// //         }
// //       });
// //   drawLandmarks(
// //       canvasCtx5,
// //       Object.values(POSE_LANDMARKS_LEFT)
// //           .map(index => results.poseLandmarks[index]),
// //       {color: zColor, fillColor: '#FF0000'});
// //   drawLandmarks(
// //       canvasCtx5,
// //       Object.values(POSE_LANDMARKS_RIGHT)
// //           .map(index => results.poseLandmarks[index]),
// //       {color: zColor, fillColor: '#00FF00'});
// //   drawLandmarks(
// //       canvasCtx5,
// //       Object.values(POSE_LANDMARKS_NEUTRAL)
// //           .map(index => results.poseLandmarks[index]),
// //       {color: zColor, fillColor: '#AAAAAA'});
// //   //canvasCtx5.restore();
// //   }
// // }

// //   const pose = new Pose({locateFile: (file) => {
// //   return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
// // }});
// // function ll()
// // {
// //   console.log("reached");
// //   pose.onResults(onResultsPose);
// // }

// // const camera = new Camera(video5, {
// //   onFrame: async () => {
// //     await pose.send({image: video5});
// //   },
// //   width: 480,
// //   height: 480
// // });
// // camera.start();

// // new ControlPanel(controlsElement5, {
// //       selfieMode: true,
// //       upperBodyOnly: false,
// //       smoothLandmarks: true,
// //       minDetectionConfidence: 0.5,
// //       minTrackingConfidence: 0.5
// //     })
// //     .add([
// //       new StaticText({title: 'MediaPipe Pose'}),
// //       fpsControl,
// //       new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
// //       new Toggle({title: 'Upper-body Only', field: 'upperBodyOnly'}),
// //       new Toggle({title: 'Smooth Landmarks', field: 'smoothLandmarks'}),
// //       new Slider({
// //         title: 'Min Detection Confidence',
// //         field: 'minDetectionConfidence',
// //         range: [0, 1],
// //         step: 0.01
// //       }),
// //       new Slider({
// //         title: 'Min Tracking Confidence',
// //         field: 'minTrackingConfidence',
// //         range: [0, 1],
// //         step: 0.01
// //       }),
// //     ])
// //     .on(options => {
// //       video5.classList.toggle('selfie', options.selfieMode);
// //       pose.setOptions(options);
// //     });
    
//     var showData = document.getElementById("show");
//     showData.addEventListener('click',showwData);
