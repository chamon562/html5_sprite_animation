let playerState = "run";
// make new variable for dropDown menu and point to new select element with id of animations
const dropDown = document.getElementById("animations");
// addEventListener on dropDown and add change event, everytime its value changes
dropDown.addEventListener("change", function (e) {
  // take playerState from line one and put e.target.value it will
  // then change to which ever drop down because we added the value to change playerState in the option tag value element
  playerState = e.target.value;
});
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
const catSpriteWidth = 183;
const cactSpriteHeight = 200;
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
// let frameX = 0;
// let frameY = 0;
// when swaping to different animation in the sprite sheet always have to change 2 values
// always the if(frameX<4 or 5 or 6 depending on the frames in that row) and framey
// to slow down the frame animation use simple trick with a let variable called gameFrame
let gameFrame = 0;
// custome variable
// whatever value given it will slow down animation by that amount
const staggerFrame = 5;
// serve as the main container to hold all data for animation
const spriteAnimations = [];
// this will be used as place to create a simple map that will match dog sprite sheet
// for every animation row in my sprite sheet will create an object with 2 properties
// name property will be whatever i want to call that animation row so for the first row lets call it idle
// will need frames, i see the idle animation is made up of 7 frames
const animationStates = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "fall", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "ko", frames: 12 },
  { name: "getHit", frames: 4 },
];
// for each array element first argument is variable that represents each element of the array called state,
// inside this callback function refer to these objects as state so they can refer to be state.name or frames, and index
// gives the index number for each object in the array

animationStates.forEach((state, index) => {
  // loc is location set to array for now.
  let frames = {
    loc: [],
  };
  // creating forLoop that will cycle through state.frames property
  for (let i = 0; i < state.frames; i++) {
    // for loop calculates positionX and positionY for each Frame as it cycles through sprite sheet
    // console.log(state.frames[i])
    // this for loop will run through all the frames in one row in this case 7 times and once
    // we create 7 objects with x and y coordinates from the frames.loc.push() and push them into an array
    let positionX = i * spriteWidth;
    // console.log(positionX);
    let positionY = index * spriteHeight;
    // console.log(positionY);
    frames.loc.push({ x: positionX, y: positionY });
  }
  // take spriteAnimations and createa a new key in there
  // create key value pair, this will first refer to idle then jump and so on
  // what this is saying is create a new key new property in spritesAnimations array called
  // it idle and its value will be frames from line 74
  spriteAnimations[state.name] = frames;
  // thats it created the data scrtucture that maps locations in sprite sheet and
  // can log it
  // console.log(state.frames)
});

function animate() {
  // clear old paint from canvas between every animation frame
  // takes in 4 variables on what area in canvas want to clear
  // want to clear the entire canvas to 0,0,CANVAS_WIDTH,CANVAS_HEIGHT
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);

  // this variable is to cycle through horizontal sprite sheets but in a different way.
  // taking gameFrame variable and divide it by staggerFrame and wrap in Math.floor to get rid of decimal
  // and make it whole numbers take the entire value and do modulus 6, 6 is there for idle animation counting
  // from zero
  // gameFrame divided by staggerFrame means we will have to increase gameFrame 5 times before we get to one
  // because as gameFrame variable increases, 1 divided by 5 is .2 2/5 is .4, 3/5 = 6, 4/5 = 8, 5/5 = 1;
  // specifiy location array if want idle or jump for now hardcode in for spriteAnimations[] and want length of array
  // now its dynamic can add animations with 4 or 15 frames per row and it will still work
  // accessing spriteAnimations on like 111 [idle].locations.length
  // in animation loop still calculting frames using frameX and frameY variables from lines 38 and 39 dont need thse anymore
  // because we have the exact coordinations stored in locations array

  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length;
  //
  let frameX = spriteWidth * position;
  // can access the y variable by spriteAnimations['idle].loc[position]index position
  let frameY = spriteAnimations[playerState].loc[position].y;
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
    frameX,
    //then this moves it down the y axis vertically in column 1 to the 4th frame in it
    // its moving 3 times the sprite height to get to that 4th frame because the orginal starts at 0
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  // ctx.drawImage(
  //   jetPackKitty,
  //   frameX * catSpriteWidth ,
  //   frameY * spriteHeight,
  //   catSpriteWidth ,
  //   cactSpriteHeight,
  //   0,
  //   0,
  //   catSpriteWidth,
  //   cactSpriteHeight
  // );
  requestAnimationFrame(animate);
  // animation is blinking and moving very fast
  // this if statment will be true every 5 frames it ticks through because of the frame++

  // console.log(5 %5)
  // take gameFrame variable and for every loop increase it by one
  // so now gameFrame is increasing over and over
  gameFrame++; // gameFrame will be 1 and 1% 5  is 1 then 2 % 5 is 2, 3  % 5 is 3, 4%5 is 4, 5%5 = 0
}
// call the function to see the square
// if dont specify fillstyle color of shapes default is black
animate();
