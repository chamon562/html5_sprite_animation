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
function animate() {
  // clear old paint from canvas between every animation frame
  // takes in 4 variables on what area in canvas want to clear
  // want to clear the entire canvas to 0,0,CANVAS_WIDTH,CANVAS_HEIGHT
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
  //   now can draw
  //   test if anything works by drawing a simple rectable
  // position 50,50, widht and height 100, 100
  ctx.fillRect(50, 50, 100, 100);
//   ctx.fillRect(x, 50, 100, 100);
    // x++
  //   call requestAnimationFrame() built in method to run a function animate for it to loop
    requestAnimationFrame(animate)
}
// call the function to see the square
// if dont specify fillstyle color of shapes default is black
animate()
