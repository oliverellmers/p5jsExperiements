var u;
var a;
var mods = [];
var x;
var y;
var mX;
var mY;
var count;

function setup() {
  createCanvas(windowWidth, windowHeight);
  u = 50;
  var highCount = (height/50)+3;
  var wideCount = (width/50)+3;
  count = int(highCount * wideCount);
  
  var index = 0;
  for (var xc = 0; xc < wideCount; xc++) {
    for (var yc = 0; yc < highCount; yc++) {
      mods[index++] = new Module(int(xc)*u,int(yc)*u);
    }
   }
}

function draw() {
  background(200);
  noStroke();
  for (var i = 0; i <= count; i++) {
    //mods[i].update();
    mods[i].draw2();
  }
}

function mousePressed() {
  for (var i = 0; i <= count; i++) {
    mods[i].Pressed();
  }
}



function Module(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.a = 0;
  this.b = false;
  this.c = 200;
}

Module.prototype.Pressed = function() {
    if (mouseX>(this.x) && mouseX<(this.x)+50 && mouseY>(this.y) && mouseY<(this.y)+50){
      if (this.b === true) {
          this.c = 200;
          this.b = false;
        } else {
          this.c = '#EB006A';
          this.b = true;
        }
    }
}


Module.prototype.draw2 = function() {
  push();
  translate(this.x, this.y);
  fill(this.c);
  rect(0,0,50,50);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
