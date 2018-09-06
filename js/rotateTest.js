

var p1, p2, dir;
var eyeball;
var img;
var isMousePressed = false;

function preload() {
  eyeball = loadModel('assets/Eye.obj', true);
  img = loadImage("assets/eyeColor_small.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  var fov = 60 / 180 * PI;
  var cameraZ = height / 2.0 / tan(fov / 2.0);
  perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);

  p1 = createVector(-200, 100, -200);
  p2 = createVector(200, 100, -500);

}

function draw() {
  background(0);

  //p1.x = map(mouseX, 0, width, -400, 400);
  //p1.y = map(mouseY, 0, height, -400, 400);
  p1.x = mouseX;
  p1.y = mouseY;
  p1.z = -400;

  /*
  dir = p5.Vector.sub(p2, p1);
  var pitch = asin(dir.y / dir.mag());
  var yaw = -asin(dir.x / (cos(pitch) * dir.mag()));
  */


  var boxSize = width / 25;
  var stepSize = boxSize * 1.75;

  translate(width/2 + boxSize/2, height/2 + boxSize/2);

  push();
  pointLight(100, 100, 100, p1.x, p1.y, p1.z);
  pop();

/*
  push();
  translate(-width/2 - 100,-height/2,0);
  rotateX(-pitch);
  rotateY(yaw);
  //fill(0,255,0);
  ambientMaterial(250);
  box(100);
  pop();
*/

  
  for(var x = 0; x < width - boxSize/2; x+=stepSize){
    for(var y = 0; y < height - boxSize/2; y+= stepSize){

      var tempP2 = createVector(x, y,100);
      //dir = p5.Vector.sub(p2, p1);
      dir = p5.Vector.sub(tempP2, p1);

      var pitch = asin(dir.y / dir.mag());
      var yaw = -asin(dir.x / (cos(pitch) * dir.mag()));


      push();
      translate(x - width + boxSize/2,y - height, 0);
      rotateX(-pitch);
      rotateY(yaw);
      if(isMousePressed){
        specularMaterial(255);
      }else{
        normalMaterial();
      }
      
      //specularMaterial(250, 0, 0);
      //ambientMaterial(255);
      box(boxSize);
      //scale(0.25, 0.25, 0.25);
      //texture(img);
      //textureMode();
      //model(eyeball);
      pop();
    }
    

  }
}

function mousePressed(){
  isMousePressed = true;

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}




