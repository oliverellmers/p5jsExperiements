/*
var angle = 0;
var targetAngle = 0;
var easing = 0.05;
*/

var rotZFactor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

}

function draw() {
  background(0);


  /*
  angle = atan2(mouseX - height/2, mouseX - width/2);
  var dir = (angle - targetAngle)/TWO_PI;
  dir -= round(dir);
  dir *= TWO_PI;

  targetAngle += dir * easing;
  */

  var rotX = (mouseX/height) * -2 * PI + PI;
  var rotY = (mouseX/width) * -2 * PI - PI;
  var rotZ = rotZFactor * PI/36;

  fill(255, 0, 0);
  push();
  translate(0, 0, 0);
  //rotate(targetAngle);
  rotateX(rotX);  
  rotateY(rotY); 
  rotateZ(rotZ);  

  box(70, 70, 70);
  pop();


}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}


