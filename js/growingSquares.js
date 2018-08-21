var s1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  s1 = new Square();
}

function draw() {
    s1.grow();
  	s1.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Square() {
  this.x = windowWidth/2;
  this.y = windowHeight/2;
  this.dimension = 1;

  this.grow = function() {
    this.dimension++;
  };

  this.display = function() {
  	stroke(0, 100, 255);
  	strokeWeight(30);
  	rectMode(CENTER);
    rect(this.x, this.y, this.dimension, this.dimension);
  };
}

function mousePressed() {
	s1.dimension = 1;
	redraw();
}