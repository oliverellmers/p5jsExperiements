var s;

function setup() {
  createCanvas(windowWidth, windowHeight); 
  s = 150;
  mouseX = width/2;
  mouseY = height/2;
  background('#C5D2D6');
}

function draw() {
  //background(255);
  noStroke();
  
  if  (mouseX>(width/2)-s && mouseX<(width/2)+s &&
  mouseY>(height/2)-s && mouseY<(height/2)+s){
  fill('#00B7FF');
  triangle(mouseX,mouseY,(width/2)-s,(height/2)-s,(width/2)+s,(height/2)-s);
  fill('#02ABED');
  triangle(mouseX,mouseY,(width/2)+s,(height/2)-s,(width/2)+s,(height/2)+s);
  fill('#009AD6');
  triangle(mouseX,mouseY,(width/2)+s,(height/2)+s,(width/2)-s,(height/2)+s);
  fill('#00AAED');
  triangle(mouseX,mouseY,(width/2)-s,(height/2)+s,(width/2)-s,(height/2)-s);
  }
}

/*
  triangle(mouseX,mouseY,0,0,0,height);
  fill('#6DD5F7');
  triangle(mouseX,mouseY,0,0,width,0);
  fill('#35BBE8');
  triangle(mouseX,mouseY,width,0,width,height);
  fill('#46A7C7');
  triangle(mouseX,mouseY,width,height,0,height);
  */