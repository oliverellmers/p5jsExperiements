

p5.disableFriendlyErrors = true;

var p1, p2, dir;
var isMousePressed = false;

var boxBuffer;
var textBuffersArr = [];

var font;
var fontsize = 32;

var planeSize;
var stepSize;
var numGraphics = 0;




function preload() {
  font = loadFont('assets/Agenda-Super210.otf');
  
}

function setup() {
  var multiCanvas = createCanvas(windowWidth, windowHeight, P2D);//, WEBGL);
  pixelDensity(1);
  boxBuffer = createGraphics(windowWidth, windowHeight, WEBGL);

  
  planeSize = width / 10;
  stepSize = planeSize * 1.1;

  setupText();
  setupBoxes();
  

  multiCanvas.parent("multiCanvas");
}

function draw() {
  
  drawText();
  drawBoxes();

  if(isMousePressed){
    filter('INVERT');
  }
  
}

function setupBoxes(){
  p1 = createVector(-200, 100, -200);
  p2 = createVector(200, 100, -500);
}

function drawBoxes(){
  
  boxBuffer.background(0);
  boxBuffer.size(windowWidth, windowHeight);

  p1.x = mouseX;
  p1.y = mouseY;
  p1.z = -100;

  
  var count = 0;
  for(var x = 0; x < width - planeSize/2; x+=stepSize){
    for(var y = 0; y < height - planeSize/2; y+= stepSize){
      boxBuffer.resetMatrix();
      boxBuffer.translate(width/2 + planeSize/2, height/2 + planeSize/2);
      var tempP2 = createVector(x, y,1);
      dir = p5.Vector.sub(tempP2, p1);

      var pitch = asin(dir.y / dir.mag());
      var yaw = -asin(dir.x / (cos(pitch) * dir.mag()));


      push();
      boxBuffer.translate(x - width,y - height, 0);
      boxBuffer.rotateX(-pitch);
      boxBuffer.rotateY(yaw);     
      
      boxBuffer.texture(textBuffersArr[count]);
      boxBuffer.plane(planeSize, planeSize);
      pop();
      count++;
    }
  }

  image(boxBuffer, 0, 0, windowWidth, windowHeight);
}



function setupText(){
  
  for(var x = 0; x < width - planeSize/2; x+=stepSize){
    for(var y = 0; y < height - planeSize/2; y+= stepSize){
        numGraphics += 1;
    }
  }

  for(var i = 0; i < numGraphics; i++){
    textBuffersArr[i] = createGraphics(64, 64, P2D);

  }
}

function drawText(){
  

  var counter = 35;

  for(var i = 0; i < numGraphics; i++){
    var letter = char(counter);

    textBuffersArr[i].background(0);
    textBuffersArr[i].fill('#ed225d');
    textBuffersArr[i].textSize(fontsize);
    textBuffersArr[i].textAlign(CENTER);
    textBuffersArr[i].textStyle(BOLD);
    textBuffersArr[i].text(letter, 32,32);

    counter++;
  }


}

function mousePressed(){
  isMousePressed = true;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  //SUPER hacky way of doing this - does not seem to work with the head buffer probably due to memory
  multiCanvas.remove();
  multiCanvas = createCanvas(windowWidth, windowHeight, P2D);

  boxBuffer.remove();
  boxBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
  //headBuffer.remove();
  //headBuffer = createGraphics(windowWidth, windowHeight, WEBGL);

}




