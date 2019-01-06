

var p1, p2, dir;
var isMousePressed = false;
let skull;


function preload(){
  skull = loadModel('assets/SkeleHead.obj');
}

function setup() {
  //var boxes = createCanvas(windowWidth, windowHeight, WEBGL);
  createCanvas(windowWidth, windowHeight, WEBGL);

  var fov = 60 / 180 * PI;
  var cameraZ = height / 2.0 / tan(fov / 2.0);
  perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);

  p1 = createVector(-200, 100, -1000);
  p2 = createVector(200, 100, -1000);

  //boxes.parent("boxes");
}

function draw() {
  drawBoxes();
}


function drawBoxes(){
  background(0);
  //p1.x = map(mouseX, 0, width, -400, 400);
  //p1.y = map(mouseY, 0, height, -400, 400);
  p1.x = mouseX;
  p1.y = mouseY;
  p1.z = 400;

/*
  var boxSize = width / 25;
  var stepSize = boxSize * 1.75;

  translate(width/2 + boxSize/2, height/2 + boxSize/2);
  */

  push();
  pointLight(100, 100, 100, p1.x, p1.y, p1.z);
  pop();

  var tempP2 = createVector(width/2, height/2,100);
  dir = p5.Vector.sub(tempP2, p1);
  var pitch = asin(dir.y / dir.mag());
  var yaw = -asin(dir.x / (cos(pitch) * dir.mag()));


  push();

  

  rotateX(pitch);
  rotateY(yaw);

  angleMode(DEGREES);
  rotateZ(180);
  normalMaterial();
 //box(100);
  scale(20);
  model(skull);
  pop();


}

function mousePressed(){
  isMousePressed = true;

}
function mouseReleased(){
  isMousePressed = false;

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}




