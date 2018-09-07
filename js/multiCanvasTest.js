

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



function setup() {
  var multiCanvas = createCanvas(windowWidth, windowHeight, P2D);//, WEBGL);
  boxBuffer = createGraphics(windowWidth, windowHeight, WEBGL);

  
  setupBoxes();
  setupSlitScan();
  

  multiCanvas.parent("multiCanvas");
}

function draw() {
  
  drawBoxes();
  
  
  if(isMousePressed){
    drawSlitScan();
  }
  
  
  
}

function setupBoxes(){
  p1 = createVector(-200, 100, -200);
  p2 = createVector(200, 100, -500);
}

function drawBoxes(){
  
  boxBuffer.background(0);

  p1.x = mouseX;
  p1.y = mouseY;
  p1.z = -400;

  var boxSize = width / 25;
  var stepSize = boxSize * 1.75;

  //boxBuffer.translate(width/2 + boxSize/2, height/2 + boxSize/2);

  //push();
  //pointLight(100, 100, 100, p1.x, p1.y, p1.z);
  //pop();

  
  for(var x = 0; x < width - boxSize/2; x+=stepSize){
    for(var y = 0; y < height - boxSize/2; y+= stepSize){
      boxBuffer.resetMatrix();
      boxBuffer.translate(width/2 + boxSize/2, height/2 + boxSize/2);
      var tempP2 = createVector(x, y,100);
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

  image(boxBuffer, 0, 0);

  
}

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
}

function mousePressed(){
  isMousePressed = true;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}




