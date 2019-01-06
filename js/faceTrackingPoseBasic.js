/*

Example taken from ml5js repository:
https://github.com/ml5js/ml5-examples/tree/master/p5js/PoseNet

*/

let w = 640;
let h = 480;
let video;
let videoCopy;
let poseNet;
let poses = [];
let skeletons = [];

var imageRatio = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageRatio = windowHeight/windowWidth;


  //video = createCapture(VIDEO);
  //video.size(windowWidth, windowHeight);
  
  poseNet = ml5.poseNet(video, 'multiple', gotPoses);
  
  video.hide();
  fill(255);
  stroke(255);
}

function draw() {
  background(0);
  translate(0, (windowHeight - (windowHeight * imageRatio))/2);

  image(video, 0, 0, windowWidth, windowHeight * imageRatio);
  filter('INVERT');
  filter('GRAY');
  drawKeypoints();
  //drawSkeleton();
}



function drawSkeleton() {
  for(let i = 0; i < poses.length; i++) {
    for(let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function drawKeypoints() {
  for(let i = 0; i < poses.length; i++) {
    for(let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.score > 0.2) {
        noStroke();
        fill(255, 0, 0);
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

function gotPoses(results) {
  poses = results;
}
