function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  noStroke();
  if (mouseIsPressed) {
    fill('rgba(255, 255, 255, 1)');
  } else {
    fill('rgba(144, 212, 184, 1)');
  }
  ellipse(mouseX, mouseY, 500, 500);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}