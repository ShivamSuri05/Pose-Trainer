const video5 = document.getElementsByClassName('input_video5')[0];
const out5 = document.getElementsByClassName('output5')[0];
const controlsElement5 = document.getElementsByClassName('control5')[0];
const canvasCtx5 = out5.getContext('2d');
let confidenceScore;
const fpsControl = new FPS();
let datta = {
  0 : {x:0,y:0,z:0,visibility:0},1 : {x:0,y:0,z:0,visibility:0},2 : {x:0,y:0,z:0,visibility:0},3 : {x:0,y:0,z:0,visibility:0},
  4 : {x:0,y:0,z:0,visibility:0},5 : {x:0,y:0,z:0,visibility:0},6 : {x:0,y:0,z:0,visibility:0},7 : {x:0,y:0,z:0,visibility:0},
  8 : {x:0,y:0,z:0,visibility:0},9 : {x:0,y:0,z:0,visibility:0},10 : {x:0,y:0,z:0,visibility:0},11 : {x:0,y:0,z:0,visibility:0},
  12 : {x:0,y:0,z:0,visibility:0},13 : {x:0,y:0,z:0,visibility:0},14 : {x:0,y:0,z:0,visibility:0},15 : {x:0,y:0,z:0,visibility:0},
  16 : {x:0,y:0,z:0,visibility:0},17 : {x:0,y:0,z:0,visibility:0},18 : {x:0,y:0,z:0,visibility:0},19 : {x:0,y:0,z:0,visibility:0},
  20 : {x:0,y:0,z:0,visibility:0},21 : {x:0,y:0,z:0,visibility:0},22 : {x:0,y:0,z:0,visibility:0},23 : {x:0,y:0,z:0,visibility:0},
  24 : {x:0,y:0,z:0,visibility:0},25 : {x:0,y:0,z:0,visibility:0},26 : {x:0,y:0,z:0,visibility:0},27 : {x:0,y:0,z:0,visibility:0},
  28 : {x:0,y:0,z:0,visibility:0},29 : {x:0,y:0,z:0,visibility:0},30 : {x:0,y:0,z:0,visibility:0},31 : {x:0,y:0,z:0,visibility:0},
  32 : {x:0,y:0,z:0,visibility:0}
};
let vector = [];
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
  document.getElementById('recordb').style.display = "inline";
  return;
}
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
  spinner.style.display = 'none';
};

function zColor(data) {
  const z = clamp(data.from.z + 0.5, 0, 1);
  return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
}

function onResultsPose(results) {
  if(start==0)
  {
    console.log(vector);
    start = -1;
    return;
  }
  else if(start==1)
  {
    document.body.classList.add('loaded');
    fpsControl.tick();

  canvasCtx5.save();
  canvasCtx5.clearRect(0, 0, out5.width, out5.height);
  //console.log(results.poseLandmarks[0].visibility);
  confidenceScore = 0;
  for(let i=0;i<33;i++)
  {
    confidenceScore += results.poseLandmarks[i].visibility;
  }
  //console.log("C-Score",confidenceScore*100/33);
  document.getElementById("C-score").innerHTML = (confidenceScore*100/33).toFixed(3);
  //console.log(results.poseLandmarks[0]);
  vector.push(results.poseLandmarks);
  canvasCtx5.drawImage(results.image, 0, 0, out5.width, out5.height);
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
  canvasCtx5.restore();
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
