/*
 Andor Saga
 Created: March 2014
 Updated: July 22 2017
*/

let numBands = 2,
    scaleSz = 4,
    gfx,
    scaledGfx;
let m;

let HALF_W;
let HALF_H;

let balls = [];
let Band = 255; // numBands;
var numBalls = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);
    gfx = createImage(width / scaleSz, height / scaleSz);
    gfx.loadPixels();
  
  	scaledGfx = createImage(width, height);
    scaledGfx.loadPixels();

  	for(let i = 0; i < numBalls; ++i){
        balls.push(new Metaball());
    }
}

function draw() {
    background(0);
    HALF_W = gfx.width / 2;
    HALF_H = gfx.height / 2;
  
    for(let b of balls){
      b.update();
    }

    let numPx = gfx.width * gfx.height;

    for (let i = 0; i < numPx; ++i) {

        let col = 0;
        for (let m = 0; m < balls.length; ++m) {

            let y = floor(i / gfx.width);
            let x = i % gfx.width;

            let xx = (balls[m].pos.x + HALF_W) - x;
            let yy = (balls[m].pos.y + HALF_H) - y;

            col += balls[m].radius / sqrt(xx * xx + yy * yy);
        }

        let intensity = colorLookup(255 * col);

        //gfx.pixels[i * 4 + 0] = intensity;
        //gfx.pixels[i * 4 + 1] = intensity;
        gfx.pixels[i * 4 + 2] = intensity;
        gfx.pixels[i * 4 + 3] = 128; //was 255

    }
  
    gfx.updatePixels();
    scaleImage(gfx, scaledGfx);
    scaledGfx.updatePixels();
  
    image(scaledGfx, 0, 0);
    //filter(GRAY);

}

function colorLookup(i) {
    return floor((i / 255) * numBands) * Band;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //gfx.remove();
  //gfx = createGraphics(width / scaleSz, height / scaleSz);
}