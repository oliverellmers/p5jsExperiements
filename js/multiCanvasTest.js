

p5.disableFriendlyErrors = true;

var p1, p2, dir;
var isMousePressed = false;

var boxBuffer;

// the camera variable
let cam;

let pastFrames = []; // an array to store old frames
let numFrames = 256; // how many frames to store. We will run out of memory at a certain point so don't make this too big
let step, windowStep; // the height of our slit strips

// the width and height of our past frames
// we make them smaller so that we can store more
// at the expense of image quality
let w = 256;
let h = 256;

var font;
var fontsize = 32

var head;
var headBuffer;

let camShader;
var shaderBuffer;

function preload() {
  font = loadFont('assets/Agenda-Super210.otf');
  //head = loadModel('assets/SkeleHead.obj', true);
  
}

function setup() {
  var multiCanvas = createCanvas(windowWidth, windowHeight, P2D);//, WEBGL);
  pixelDensity(1);
  boxBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
  //headBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
  //shaderBuffer = createGraphics(windowWidth, windowHeight, WEBGL);


  
  setupBoxes();
  //setupSlitScan();
  setupText();

  //camShader = loadShader('assets/effect.vert', 'assets/effect.frag');


  multiCanvas.parent("multiCanvas");
}

function draw() {
  
  drawBoxes();

  //console.log("boxBuffer.width: " + boxBuffer.width);
  //console.log("boxBuffer.height: " + boxBuffer.height);
  //boxBuffer.width = window.innerWidth;
  //boxBuffer.height = window.innerHeight;

  drawBoxes();
  if(isMousePressed){
    //drawSlitScan();
    filter('INVERT');
  }
  //drawHead();
  drawText();
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
  p1.z = -400;

  var boxSize = width / 20;
  var stepSize = boxSize * 1.75;
  
  
  for(var x = 0; x < width - boxSize/2; x+=stepSize){
    for(var y = 0; y < height - boxSize/2; y+= stepSize){
      boxBuffer.resetMatrix();
      boxBuffer.translate(width/2 + boxSize/2, height/2 + boxSize/2);
      var tempP2 = createVector(x, y,1);
      dir = p5.Vector.sub(tempP2, p1);

      var pitch = asin(dir.y / dir.mag());
      var yaw = -asin(dir.x / (cos(pitch) * dir.mag()));


      push();
      boxBuffer.translate(x - width + boxSize/2,y - height, 0);
      boxBuffer.rotateX(-pitch);
      boxBuffer.rotateY(yaw);     
      boxBuffer.normalMaterial();
      boxBuffer.box(boxSize);
      pop();
    }
  }

  image(boxBuffer, 0, 0, windowWidth, windowHeight);
}

/*
var rotY = 0;
function drawHead(){
  
  headBuffer.background(0,0);
  headBuffer.resetMatrix();
  headBuffer.translate(0,0,0);


  rotY+= 0.025;

  push();
  headBuffer.rotateZ(radians(180));
  headBuffer.rotateY(rotY);
  headBuffer.model(head);
  pop();

  image(headBuffer,0,0);
}
*/

function setupSlitScan(){
  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

  // calculate the height of each horizontal strip
  // might have to floor this to prevent gaps...
  step = h / numFrames;

  windowStep = height / numFrames;

  // for every frame, add a graphics layer
  for(let i = 0; i<numFrames; i++){
    let p = createGraphics(w, h);
    pastFrames.push(p);
  }

}


function drawSlitScan(){
  //background(0);
  // draw the current camera frame in the first element of the array
  pastFrames[0].image(cam, 0, 0, w, h);
  
  // draw our slit scan to the screen
  // we loop through all the frames and draw a slice at each step along the y axis
  for(let i = 0; i<pastFrames.length; i++){
    // image(img, x, y, w, h, srcX, srcY, srcW, srcH);
    image(pastFrames[i], 0, windowStep * i, width, windowStep, 0, step*i, w, step);    
    //texture(pastFrames[i], 0, windowStep * i, width, windowStep, 0, step*i, w, step);
  }

  // move every element forward by 1, except the last element
  // this is important to keep the frames cycling 
  // otherwise we'd just see one frame updating at a time
  for(let i = 0; i<pastFrames.length-1; i++){
    pastFrames[i] = pastFrames[i+1];
  }

  // move the last element to the beginning
  pastFrames[pastFrames.length-1] = pastFrames[0];
  filter('INVERT');
}

function setupText(){
  textFont(font);
  textSize(fontsize);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
}

function drawText(){
  // Set the gap between letters and the left and top margin
  var gap = 52;
  var margin = 10;
  translate(margin * 4, margin * 4);

  // Set the counter to start at the character you want
  // in this case 35, which is the # symbol
  var counter = 35;

  // Loop as long as there is space on the canvas
  for (y = 0; y < height - gap; y += gap) {
    for (x = 0; x < width - gap; x += gap) {

      // Use the counter to retrieve individual letters by their Unicode number
      var letter = char(counter);

      // Add different color to the vowels and other characters
      if (letter == 'A' || letter == 'E' || letter == 'I' || letter == 'O' || letter == 'U') {
        fill('#ed225d');
      }
      else {
        fill(255);
      }

      // Draw the letter to the screen
      text(letter, x, y);

      // Increment the counter
      counter++;
    }
  }
}

/*
function doShaderEffect(){
  shaderBuffer.shader(camShader);
  camShader.setUniform('tex0', cam);
  camShader.setUniform('tex1', boxBuffer);
  camShader.setUniform('amt', map(mouseX, 0, width, 0, 0.2));
  shaderBuffer.rect(0,0,width, height);
}
*/

function mousePressed(){
  isMousePressed = true;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  //SUPER hacky way of doing this - does not seem to work with the head buffer probably due to memory
  boxBuffer.remove();
  boxBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
  //headBuffer.remove();
  //headBuffer = createGraphics(windowWidth, windowHeight, WEBGL);

}




