var w;
var columns;
var rows;
var board;
var next;

var isOverSketch = false;
var isMobile = false;

var isOverParagraph = false;
var paragraph;
var pWeight = 10;

var currentVal = 0;
var targetVal = 0;

var zoom = 1.00;
var zoomStr = "vw";

var zoomCurrent = 0;
var zoomTarget = 0;

var easing = 0.25;



function setup() {
  noCursor();
  getMobileOperatingSystem();
  
  var multiCanvas = createCanvas(windowWidth, windowHeight, P2D);
  multiCanvas.style('display', 'block');
  
  w = windowWidth/20;
  setupGrid();

  paragraph = createP("Oliver Ellmers");
  paragraph.class("pClass");
  paragraph.position(0,0);
  paragraph.mouseOver(overParagraph);
  paragraph.mouseOut(outParagraph);


  multiCanvas.parent("multiCanvas");
  multiCanvas.mouseOver(overSketch);
  multiCanvas.mouseOut(outSketch);
}

function draw() {
  background(255);
  generate();
  for ( var i = 0; i < columns;i++) {
    for ( var j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) fill(0,0,255);
      else fill(255,255,255); 
      stroke(0, 0, 0);
      stroke(0,0,0);
      rect(i*w, j*w, w-1, w-1);
    }
  }

  
  paragraph.elt.style['font-variation-settings'] = `"wght" ${currentVal}, "wdth" ${125}`;
  //paragraph.position(0, windowHeight/2);
  paragraph.center();

  
  if(isOverParagraph){
    //background(255);
    zoomTarget = 100;
    zoomStr = zoomCurrent + "vw";

    //paragraph.style("font-size", zoomStr);
    paragraph.style("color:rgba(255,255,255,0);");
  }else{
    zoomTarget = 13.5;
    zoomStr = zoomCurrent + "vw";

    //paragraph.style("font-size", zoomStr);
    paragraph.style("color:rgba(255,255,255,0);");
  }
  
  var zoomDiff = zoomTarget - zoomCurrent;
  zoomCurrent += zoomDiff * easing;

  //console.log("zoomStr: " + zoomStr);
  
  var diff = targetVal - currentVal;
  currentVal += diff * easing;



  blendMode(DIFFERENCE);
  if(isOverSketch && !isMobile){
    fill(255,255,255, 255);
  }else{
    fill(255,255,255, 0);
  }
  ellipse(mouseX, mouseY, 24, 24);
  blendMode(BLEND);


  if(mouseIsPressed){
    filter(INVERT);
  }
}

function overSketch() {
  isOverSketch = true;
}

function outSketch() {
  isOverSketch = false;
}


function mouseReleased() {
  loop();
}

// reset board when mouse is pressed
function mousePressed() {
  init();
  noLoop();
}

function mousePressedBehaviour(){
  init();
  noLoop();
}

function overParagraph(){
 // console.log("mouse is over the paragraph");
  isOverParagraph = true;
  targetVal = 100;
}

function outParagraph(){
  //console.log("mouse is over the paragraph");
  isOverParagraph = false;
  targetVal = 10;
}

function setupGrid(){
  var h = height;
  
  // Calculate columns and rows
  columns = floor(width/w);
  rows = floor(h/w);

  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (var i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  } 
  
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

// Fill board randomly
function init() {

  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {

  // Loop through every spot in our 2D array and check spots neighbors
  for (var x = 1; x < columns - 1; x++) {
    for (var y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      var neighbors = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      else                                             next[x][y] = board[x][y]; // Stasis
    }
  }

  // Swap!
  var temp = board;
  board = next;
  next = temp;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  //SUPER hacky way of doing this - does not seem to work with the head buffer probably due to memory
  multiCanvas.remove();
  multiCanvas = createCanvas(windowWidth, windowHeight, P2D);
  setupGrid();
  //init();
  //checkIfMobile();
  getMobileOperatingSystem();

}

function getMobileOperatingSystem() {
var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      isMobile = true;
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      isMobile = true;
      return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      isMobile = true;
      return "iOS";
  }

  isMobile = false;
  return "unknown";
}