/*
var angle = 0;
var targetAngle = 0;
var easing = 0.05;
*/

var rotZFactor = 0;

var p1, p2, dir;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  p1 = createVector(-200, 100, -200);
  p2 = createVector(200, 100, -500);

}

function draw() {
  background(0);

  //p1.x = map(mouseX, 0, width, -400, 400);
  //p1.y = map(mouseY, 0, height, -400, 400);
  p1.x = mouseX;
  p1.y = mouseY;

  /*
  dir = p5.Vector.sub(p2, p1);
  var pitch = asin(dir.y / dir.mag());
  var yaw = -asin(dir.x / (cos(pitch) * dir.mag()));
  */

  translate(width/2, height/2 + 100);

  push();
  pointLight(250, 250, 250, p1.x, -p1.y, 400);
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

  for(var x = 0; x < width; x+=200){
    for(var y = 0; y < height; y+= 200){

      var tempP2 = createVector(x, y, -400);
      //dir = p5.Vector.sub(p2, p1);
      dir = p5.Vector.sub(tempP2, p1);

      var pitch = asin(dir.y / dir.mag());
      var yaw = -asin(dir.x / (cos(pitch) * dir.mag()));


      push();
      translate(x - width,y - height, 0);
      rotateX(-pitch);
      rotateY(yaw);
      ambientMaterial(250);
      box(75);
      pop();
    }
    

  }


  



}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}


