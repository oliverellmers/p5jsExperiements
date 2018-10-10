function scaleImage(imgIn, imgOut){
  for (let i = 0; i < imgOut.width * imgOut.height; ++i) {
  
   let x = (i % imgOut.width) / imgOut.width;
   let y = floor( i / imgOut.width) / imgOut.height;
    
   let u = floor( x * imgIn.width );
   let v = floor( y * imgIn.height );

    // prevent sampling above
	u %= imgIn.width;
    v %= imgIn.height;
    
    // prevent sampling below
	u = u < 0 ? imgIn.width + u : u;
	v = v < 0 ? imgIn.height + v : v;

    let textureIdx = (4 * v * imgIn.width) + (4 * u);
   
    imgOut.pixels[4 * i + 0] = imgIn.pixels[textureIdx + 0];
    imgOut.pixels[4 * i + 1] = imgIn.pixels[textureIdx + 1];
    imgOut.pixels[4 * i + 2] = imgIn.pixels[textureIdx + 2];
    imgOut.pixels[4 * i + 3] = imgIn.pixels[textureIdx + 3];
  }
}