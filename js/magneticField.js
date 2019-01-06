var u;
var l;
var a;
var mods = [];
var x;
var y;
var count;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //u = int(width/15);
  u = 106;
  l = 20;
  var highCount = height/110;
  var wideCount = width/80;
  count = int(highCount * wideCount);
  
  var index = 0;
  for (var xc = 0; xc < wideCount; xc++) {
    for (var yc = 0; yc < highCount; yc++) {
      mods[index++] = new Module(int(xc)*u,int(yc)*u);
    }
   }
}

function draw() {
  
  
  strokeCap(SQUARE);

  if (mouseIsPressed) {
    background(0);
    stroke(255,0,0);
  } else {
    background(0);
    stroke(255,0,0);
  }
  
  //noFill();
  strokeWeight(1);
  translate(20, 40);
  fill(255,0,0);
  
  for (var i = 0; i <= count; i++) {
    mods[i].update();
    mods[i].draw2();
  }

}

function Module(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.a = 0;
  

}

Module.prototype.update = function() {
  if (mouseIsPressed) {
    this.a = -20 * (atan2(mouseY-this.y, mouseX-this.x));
  } else {
    this.a = atan2(mouseY-this.y, mouseX-this.x);
  }
}

Module.prototype.draw2 = function() {
  push();
  translate(this.x, this.y);
  rotate(this.a);
  //line(-l,0,l,0);
  rect(-10,0,30,30);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}