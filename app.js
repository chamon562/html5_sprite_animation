const canvas = document.getElementById("canvas1");
console.log(canvas);
const ctx = canvas.getContext("2d");
console.log(ctx);
// global variable
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
// bring image into javascript project
const playerImage = new Image();
// built in image class constrcutor
// use to store sprite sheet image
playerImage.src = "./assets/shadow_dog.png";
// let x = 0;
console.log(playerImage);
// animate on canvas animation loop
const jetPackKitty = new Image();
jetPackKitty.src = "./assets/jetpackcat/PNG/Rockat_Idle.png";
console.log(jetPackKitty);
// width 1100 / 6 columns and there is only 1 row
// trying to fix the sizing issue
//  width 1100 / 5 columns and there is only 1 row
const catSpriteWidth = 183 + 183;
const cactSpriteHeight = 180;
// declare global variable
// if i take the width of the entire file and divide it by the number of columns
// ill get width of 1 frame the shadow_dog.png sprite sheet is 6876px width and has 12 columns
// 6876/12 = 573 will make it 575 because the original last frame was made a bit smaller when they assembled it
// in photoshop
// sometimes when seeing that your animation is moving sideways when it shouldnt try to adjust the width and height by small pixel amount
// and observe what happens.
const spriteWidth = 575;

// sprite height will be height of the entire sprite sheet which is 5230px height divided by the number of rows so this sprite sheet has 10 rows
// 5230/10 = 523
// now in the drawImage argument of sw, sh we can replace that with the spriteWidth and spriteHeight variable
const spriteHeight = 523;
// instead of changing numbers in the arguments change to output variables
let frameX = 0;
let frameY = 0;

function animate() {
  // clear old paint from canvas between every animation frame
  // takes in 4 variables on what area in canvas want to clear
  // want to clear the entire canvas to 0,0,CANVAS_WIDTH,CANVAS_HEIGHT
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
  //   now can draw
  //   test if anything works by drawing a simple rectable
  // position 50,50, widht and height 100, 100
  // ctx.fillRect(50, 50, 100, 100);
  //   ctx.fillRect(x, 50, 100, 100);
  // x++
  //   call requestAnimationFrame() built in method to run a function animate for it to loop
  // 0,0 are x and y coordinates on where I want my image to be drawn on the canvas on top left
  // it will also keep the original width and height of the image
  // the current sprite sheet and 10 rows and 11 columns
  // so what its seeing from the sprite sheet is 600x600 pixels from the top left and the 600 comes from the
  // width and height that was set in the css #canvas1
  // ctx.drawImage(playerImage, 0, 0)
  // 4th and 5th argument are width and height and shows the entire sprite sheet
  // this is what also resizes the whole entire sprite sheet to stretch horizontal or vertical.
  // ctx.drawImage(playerImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  // most control over image, first argument is image, the next 4 arguments determine rectangular area
  // we want to cut out from this source image sx:sourcex,sy:sourcey,sw:sourcewidth.sh:source:height
  // the last 4 arguments will tell javascript where on our destination canvas we want to draw, just that cropped out part
  // on to, dx: destinationx, dy: destinationy, dw: destinationwidth, dh:destinationHeight
  // these last 4 values dx,dy,dw,dh work the same aws the earlier 4 values 0,0,CANVAS_WIDTH,CANVAS_HEIGHT
  // the only differece is theyre not used to position and stretch the entire image but just the area we cut out using the
  // sx,sy,sw,sh
  // ctx.drawImage(playerImage,sx, sy, sw,sy, dx,dy,dw,dh  )
  // ctx.drawImage(playerImage,sx, sy, sw,sy, dx,dy,dw,dh  )
  // adding sx,sy,sw,sy to cut out one dog from the sprite sheet from the top left
  // so these 4 values sx,sy,sw,sh deteremine the area we cut out from the sprite sheet
  // and the next 4 values 0,0,CANVAS_WIDTH,CANVAS_HEIGHT determine where we want to place that cut out piece on to the canvas
  // ctx.drawImage(playerImage,sx,sy,sw,sh, 0,0, CANVAS_WIDTH, CANVAS_HEIGHT)

  // now we are cropping out exactly one frame from the sprite sheet
  // instead of stretching the original frame and cover the canvas can also use
  // spriteWidth and spriteHeight to replace the CANVAS_WIDTH, CANVAS_HEIGHt
  // and it will make it so its drawing the frame at its original size
  // ctx.drawImage(
  //   playerImage,
  //   0,
  //   0,
  //   spriteWidth,
  //   spriteHeight,
  //   0,
  //   0,
  //   spriteWidth,
  //   spriteHeight
  // );
  // if i set sourcex coordinate to 1 * spriteWIdth it will jump by 1 frame in its row
  // this way i can display my animation row frame by frame, when this number gets to high
  // there we be no more frames eventually so sourcex allows us to cycle through sprite sheet horizontally
  // if i want to swap between different animations the way our sprite sheet is structured
  // i have to travel through it vertically, and we have sourcey argument for that sy
  // ctx.drawImage(
  //   playerImage,
  //   1 * spriteWidth,
  //   0,
  //   spriteWidth,
  //   spriteHeight,
  //   0,
  //   0,
  //   spriteWidth,
  //   spriteHeight
  // );

  // starting from top would be 0 * spriteHeight variable
  ctx.drawImage(
    playerImage,
    // starts from the first frame of top left sprite
    frameX * spriteWidth,
    //then this moves it down the y axis vertically in column 1 to the 4th frame in it
    // its moving 3 times the sprite height to get to that 4th frame because the orginal starts at 0
    frameY * spriteHeight,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
 
  // ctx.drawImage(
  //   jetPackKitty,
  //   (0 * catSpriteWidth) ,
  //   0 * spriteHeight,
  //   catSpriteWidth,
  //   cactSpriteHeight,
  //   0,
  //   0,
  //   catSpriteWidth,
  //   cactSpriteHeight
  // );
  requestAnimationFrame(animate);
}
// call the function to see the square
// if dont specify fillstyle color of shapes default is black
animate();
