var u;
var u2;
var count;
var mods = [];
var darkbg = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#7DF5D1');
  u = 50;
  u2 = (u/2)*sqrt(3);
  var highCount = (height/u)+3;
  var wideCount = (width/u2)+3;
  count = int(highCount * wideCount);
  var index = 0;
  for (var xc = 0; xc < wideCount*2; xc++) {
    for (var yc = 0; yc < highCount*2; yc++) {
      mods[index++] = new Module((int(xc)*u2*2),int(yc)*u);
    }
   }
}

function draw() {
  noStroke();
  for (var i = 0; i <= count; i++) {
    mods[i].draw1();
  }
  translate(0,u/2);
  for (var i = 0; i <= count; i++) {
    mods[i].draw3();
  }
  translate(u2,0);
  for (var i = 0; i <= count; i++) {
    mods[i].draw2();
  }
  translate(0,-u/2);
  for (var i = 0; i <= count; i++) {
    mods[i].draw4();
  }
}

function mousePressed() {
  for (var i = 0; i <= count; i++) {
    mods[i].Pressed();
  }
}


function Module(_x, _y) {
  this.s = 25;
  this.x1 = _x;
  this.y1 = _y;
  this.x2 = _x;
  this.y2 = _y;
  this.x3 = _x;
  this.y3 = _y;
  this.x4 = _x;
  this.y4 = _y;
  this.b1 = false;
  this.b2 = false;
  this.b3 = false;
  this.b4 = false;
  this.isOverTriangle1 = false;
  this.isOverTriangle2 = false;
  this.isOverTriangle3 = false;
  this.isOverTriangle4 = false;
  this.c1 = '#545861';
  this.c2 = '#545861';
  this.c3 = '#545861';
  this.c4 = '#545861';
}


Module.prototype.draw1 = function() {
  push();
  translate(this.x1, this.y1);
  rectMode(CENTER);
  noStroke();
  fill(this.c1);
  triangle(-this.s,-this.s,-this.s,this.s,(sqrt(3)*this.s)-this.s,0);
  this.px1 = mouseX;
  this.py1 = mouseY;
  this.ax1 = this.x1-this.s;
  this.ay1 = this.y1-this.s;
  this.bx1 = this.x1-this.s;
  this.by1 = this.y1+this.s;
  this.cx1 = this.x1+(sqrt(3)*this.s)-this.s;
  this.cy1 = this.y1;
  this.v01 = [this.cx1-this.ax1,this.cy1-this.ay1];
  this.v11 = [this.bx1-this.ax1,this.by1-this.ay1];
  this.v21 = [this.px1-this.ax1,this.py1-this.ay1];
  this.dot001 = (this.v01[0]*this.v01[0]) + (this.v01[1]*this.v01[1]);
  this.dot011 = (this.v01[0]*this.v11[0]) + (this.v01[1]*this.v11[1]);
  this.dot021 = (this.v01[0]*this.v21[0]) + (this.v01[1]*this.v21[1]);
  this.dot111 = (this.v11[0]*this.v11[0]) + (this.v11[1]*this.v11[1]);
  this.dot121 = (this.v11[0]*this.v21[0]) + (this.v11[1]*this.v21[1]);
  this.invDenom1 = 1/ (this.dot001 * this.dot111 - this.dot011 * this.dot011);
  this.u1 = (this.dot111 * this.dot021 - this.dot011 * this.dot121) * this.invDenom1;
  this.v1 = (this.dot001 * this.dot121 - this.dot011 * this.dot021) * this.invDenom1;
  this.isOverTriangle1 = ((this.u1 >= 0) && (this.v1 >= 0) && (this.u1 + this.v1 < 1));
  if(this.isOverTriangle1 === true)
  {
    fill('rgba(255, 255, 255, 0.2)');
    triangle(-this.s,-this.s,-this.s,this.s,(sqrt(3)*this.s)-this.s,0);
  } else {
	  noFill(); 
  }
  pop();
}

Module.prototype.draw2 = function() {
  push();
  translate(this.x2, this.y2);
  rectMode(CENTER);
  noStroke();
  fill(this.c2);
  triangle(-this.s,-this.s,-this.s,this.s,(sqrt(3)*this.s)-this.s,0);
  this.px2 = mouseX;
  this.py2 = mouseY;
  this.nx2 = this.x2+u2;
  this.ny2 = this.y2+(u/2);
  this.ax2 = this.nx2-this.s;
  this.ay2 = this.ny2-this.s;
  this.bx2 = this.nx2-this.s;
  this.by2 = this.ny2+this.s;
  this.cx2 = this.nx2+(sqrt(3)*this.s)-this.s;
  this.cy2 = this.ny2;
  this.v02 = [this.cx2-this.ax2,this.cy2-this.ay2];
  this.v12 = [this.bx2-this.ax2,this.by2-this.ay2];
  this.v22 = [this.px2-this.ax2,this.py2-this.ay2];
  this.dot002 = (this.v02[0]*this.v02[0]) + (this.v02[1]*this.v02[1]);
  this.dot012 = (this.v02[0]*this.v12[0]) + (this.v02[1]*this.v12[1]);
  this.dot022 = (this.v02[0]*this.v22[0]) + (this.v02[1]*this.v22[1]);
  this.dot112 = (this.v12[0]*this.v12[0]) + (this.v12[1]*this.v12[1]);
  this.dot122 = (this.v12[0]*this.v22[0]) + (this.v12[1]*this.v22[1]);
  this.invDenom2 = 1/ (this.dot002 * this.dot112 - this.dot012 * this.dot012);
  this.u2 = (this.dot112 * this.dot022 - this.dot012 * this.dot122) * this.invDenom2;
  this.v2 = (this.dot002 * this.dot122 - this.dot012 * this.dot022) * this.invDenom2;
  this.isOverTriangle2 = ((this.u2 >= 0) && (this.v2 >= 0) && (this.u2 + this.v2 < 1));
  if(this.isOverTriangle2 === true)
  {
    fill('rgba(255, 255, 255, 0.2)');
    triangle(-this.s,-this.s,-this.s,this.s,(sqrt(3)*this.s)-this.s,0);
  } else {
	  noFill(); 
  }
  pop();
}

Module.prototype.draw3 = function() {
  push();
  translate(this.x3, this.y3);
  rectMode(CENTER);
  noStroke();
  fill(this.c3);
  triangle(-this.s,0,(sqrt(3)*this.s)-this.s,-this.s,(sqrt(3)*this.s)-this.s,this.s);
  this.px3 = mouseX;
  this.py3 = mouseY;
  this.nx3 = this.x3;
  this.ny3 = this.y3+(u/2);
  this.ax3 = this.nx3-this.s;
  this.ay3 = this.ny3;
  this.bx3 = this.nx3+(sqrt(3)*this.s)-this.s;
  this.by3 = this.ny3-this.s;
  this.cx3 = this.nx3+(sqrt(3)*this.s)-this.s;
  this.cy3 = this.ny3+this.s;
  this.v03 = [this.cx3-this.ax3,this.cy3-this.ay3];
  this.v13 = [this.bx3-this.ax3,this.by3-this.ay3];
  this.v23 = [this.px3-this.ax3,this.py3-this.ay3];
  this.dot003 = (this.v03[0]*this.v03[0]) + (this.v03[1]*this.v03[1]);
  this.dot013 = (this.v03[0]*this.v13[0]) + (this.v03[1]*this.v13[1]);
  this.dot023 = (this.v03[0]*this.v23[0]) + (this.v03[1]*this.v23[1]);
  this.dot113 = (this.v13[0]*this.v13[0]) + (this.v13[1]*this.v13[1]);
  this.dot123 = (this.v13[0]*this.v23[0]) + (this.v13[1]*this.v23[1]);
  this.invDenom3 = 1/ (this.dot003 * this.dot113 - this.dot013 * this.dot013);
  this.u3 = (this.dot113 * this.dot023 - this.dot013 * this.dot123) * this.invDenom3;
  this.v3 = (this.dot003 * this.dot123 - this.dot013 * this.dot023) * this.invDenom3;
  this.isOverTriangle3 = ((this.u3 >= 0) && (this.v3 >= 0) && (this.u3 + this.v3 < 1));
  if(this.isOverTriangle3 === true)
  {
    fill('rgba(255, 255, 255, 0.2)');
    triangle(-this.s,0,(sqrt(3)*this.s)-this.s,-this.s,(sqrt(3)*this.s)-this.s,this.s);
  } else {
	  noFill(); 
  }
  pop();
}

Module.prototype.draw4 = function() {
  push();
  translate(this.x4, this.y4);
  rectMode(CENTER);
  noStroke();
  fill(this.c4);
  triangle(-this.s,0,(sqrt(3)*this.s)-this.s,-this.s,(sqrt(3)*this.s)-this.s,this.s);
  this.px4 = mouseX;
  this.py4 = mouseY;
  this.nx4 = this.x4+u2;
  this.ny4 = this.y4;
  this.ax4 = this.nx4-this.s;
  this.ay4 = this.ny4;
  this.bx4 = this.nx4+(sqrt(3)*this.s)-this.s;
  this.by4 = this.ny4-this.s;
  this.cx4 = this.nx4+(sqrt(3)*this.s)-this.s;
  this.cy4 = this.ny4+this.s;
  this.v04 = [this.cx4-this.ax4,this.cy4-this.ay4];
  this.v14 = [this.bx4-this.ax4,this.by4-this.ay4];
  this.v24 = [this.px4-this.ax4,this.py4-this.ay4];
  this.dot004 = (this.v04[0]*this.v04[0]) + (this.v04[1]*this.v04[1]);
  this.dot014 = (this.v04[0]*this.v14[0]) + (this.v04[1]*this.v14[1]);
  this.dot024 = (this.v04[0]*this.v24[0]) + (this.v04[1]*this.v24[1]);
  this.dot114 = (this.v14[0]*this.v14[0]) + (this.v14[1]*this.v14[1]);
  this.dot124 = (this.v14[0]*this.v24[0]) + (this.v14[1]*this.v24[1]);
  this.invDenom4 = 1/ (this.dot004 * this.dot114 - this.dot014 * this.dot014);
  this.u4 = (this.dot114 * this.dot024 - this.dot014 * this.dot124) * this.invDenom4;
  this.v4 = (this.dot004 * this.dot124 - this.dot014 * this.dot024) * this.invDenom4;
  this.isOverTriangle4 = ((this.u4 >= 0) && (this.v4 >= 0) && (this.u4 + this.v4 < 1));
  if(this.isOverTriangle4 === true)
  {
    fill('rgba(255, 255, 255, 0.2)');
    triangle(-this.s,0,(sqrt(3)*this.s)-this.s,-this.s,(sqrt(3)*this.s)-this.s,this.s);
  } else {
	  noFill(); 
  }
  pop();
}

Module.prototype.Pressed = function() {
    if (this.isOverTriangle1 === true){
      if(this.b1 === false){
      this.c1 = '#7DF5D1';
      this.b1 = true;
      } else {
      this.c1 = '#545861';
      this.b1 = false; 
      }
    }
    if (this.isOverTriangle2 === true){
      if(this.b2 === false){
      this.c2 = '#7DF5D1';
      this.b2 = true;
      } else {
      this.c2 = '#545861';
      this.b2 = false; 
      }
    }
    if (this.isOverTriangle3 === true){
      if(this.b3 === false){
      this.c3 = '#7DF5D1';
      this.b3 = true;
      } else {
      this.c3 = '#545861';
      this.b3 = false; 
      }
    }
    if (this.isOverTriangle4 === true){
      if(this.b4 === false){
      this.c4 = '#7DF5D1';
      this.b4 = true;
      } else {
      this.c4 = '#545861';
      this.b4 = false; 
      }
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
