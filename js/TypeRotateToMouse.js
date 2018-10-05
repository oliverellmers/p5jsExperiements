

p5.disableFriendlyErrors = true;

var p1, p2, dir;
var isMousePressed = false;

var multiCanvas;

var boxBuffer;
var textBuffersArr = [];

var font;
var fontsize = 32;

var planeSize;
var stepSize;

var _w;
var _h;

var planeCount = 0;

var isTextSetup = false;

var textArr = [];

function preload() {
  font = loadFont('assets/Agenda-Super210.otf');
  
}

function setup() {
  multiCanvas = createCanvas(windowWidth, windowHeight, P2D);
  boxBuffer = createGraphics(windowWidth, windowHeight,WEBGL);
  init();

}

function init(){
  _w = windowWidth;
  _h = windowHeight;
  var _x = (windowWidth - width) / 2;
  var _y = (windowHeight - height) / 2;

  pixelDensity(1);

  planeCount = 0;
  //planeSize = _w / 12;
  planeSize = 75;
  stepSize = planeSize;// * 1.1;

  p1 = createVector(-200, 100, -200);
  p2 = createVector(200, 100, -500);

  setupText();
  
  multiCanvas.position(_x, _y);
  multiCanvas.parent("multiCanvas");
}

function draw() {
  background(0);

  _w = windowWidth;
  _h = windowHeight;

  drawBoxes();

  if(isMousePressed){
    //filter('INVERT');
  }  
}

function drawBoxes(){
  
  boxBuffer.background(0,0,0);
  boxBuffer.size(_w, _h);

  p1.x = mouseX;
  p1.y = mouseY;
  p1.z = 1000;

  if(textBuffersArr.length == 0){

    setupText();

    var n = 0;

    for(var y = 0; y < _h - planeSize/2; y+=stepSize){
      for(var x = 0; x < _w - planeSize/2; x+= stepSize){

        var letter = char(n + 35);

        textBuffersArr[n].background(0);
        textBuffersArr[n].fill('#ed225d');
        textBuffersArr[n].textSize(fontsize);
        textBuffersArr[n].textAlign(CENTER);
        textBuffersArr[n].textStyle(BOLD);
        textBuffersArr[n].text(letter, 32,32);
        //if(n == 50){
        //  n = 0;
        //}
        n++

      }
    }
  }
  
  var numGraphics = 0;
  var text = "NEWWORKCOMINGSOON";
  textArr = (unchar(split(text, '')))
  var textArrCount = 0;


  if(isTextSetup){

    for(var y = 0; y < _h ; y+=stepSize){
      for(var x = 0; x < _w; x+= stepSize){

        boxBuffer.resetMatrix();
        boxBuffer.translate(_w/2 + planeSize/2, _h/2 + planeSize/2);
        var tempP2 = createVector(x, y,1);
        dir = p5.Vector.sub(tempP2, p1);

        var pitch = asin(dir.y / dir.mag());
        var yaw = -asin(dir.x / (cos(pitch) * dir.mag()));

        push();
        boxBuffer.translate(x - _w,y - _h, 0);
        boxBuffer.rotateX(-pitch);
        boxBuffer.rotateY(yaw);
        
        if(planeCount < textBuffersArr.length){
          var letter = char(planeCount + 35);
          
          //print(char(textArr[0]));

          textBuffersArr[planeCount].background(0);

          textBuffersArr[planeCount].fill('#ed225d');
          textBuffersArr[planeCount].textSize(fontsize);
          textBuffersArr[planeCount].textAlign(CENTER);
          textBuffersArr[planeCount].textStyle(BOLD);
          console.log();

          //Random distribution:
          //was % 4 for every 4 steps
          //if(planeCount %  4 == 0 && textArrCount < textArr.length){
          if(planeCount %  Math.floor(Math.random() * 10) == 0 && textArrCount < textArr.length){
            textBuffersArr[planeCount].fill('#ffffff');
            //textBuffersArr[planeCount].text(letter, 32,32);

            textBuffersArr[planeCount].text(char(textArr[textArrCount]), 64,64);
            
            //if(textArrCount == 17){
              //textArrCount = Math.floor(Math.random() * 17);
            //}
            //textArrCount = Math.floor(Math.random() * 17);
            textArrCount++;


          }else{
            textBuffersArr[planeCount].fill('#3D3D3D');
            textBuffersArr[planeCount].text(letter, 64,64);
          }


          //textBuffersArr[planeCount].text(letter, 32,32);

          planeCount++;
        }
        
        if(textBuffersArr[numGraphics] != null){
          boxBuffer.texture(textBuffersArr[numGraphics]);
        }
        
        boxBuffer.plane(planeSize, planeSize);
        pop();
        numGraphics++;
      }
    }
    image(boxBuffer, 0, 0, _w, _h);
  }
}



function setupText(){
  //console.log("setting up text");
  var n = 0;

  for(var x = 0; x < _w - planeSize/2; x+=stepSize){
    for(var y = 0; y < _h - planeSize/2; y+= stepSize){
      textBuffersArr[n] = createGraphics(128, 128, P2D);
      n++;
    }
  }

  //console.log("number of created text graphics: " + textBuffersArr.length);

  isTextSetup = true;

}

function removeText(){

  //console.log("removing all text graphics");
  textBuffersArr = [];
  //console.log("number of text graphics after removal: " + textBuffersArr.length);

}



function mousePressed(){
  isMousePressed = true;

}

function centerCanvas(){
  var _x = (windowWidth - width) / 2;
  var _y = (windowHeight - height) / 2;
  multiCanvas.position(_x, _y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  init();
  removeText();
  centerCanvas();

  boxBuffer.remove();
  boxBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
}






