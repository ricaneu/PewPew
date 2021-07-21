var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bottom = 700
var right = 1200
var fireY = bottom
var fireX = 0
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
var targetX
var targetY
var createTarget= true
var score=0

let y = 0
let x= 0

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if(e.key == " ") {
        spacePressed = true;
        fireX=x + 20
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawFire(y) {
    ctx.beginPath();
    ctx.arc(fireX, y, 8, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function target() {
    ctx.beginPath();
    ctx.arc(targetX, targetY, 8, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

function drawCannon(mainX, mainY) {
let x= mainX- 80
let y= mainY+580

    ctx.beginPath();
    ctx.moveTo(x+83, y+116);
    ctx.lineTo(x+83, y+102);
    ctx.bezierCurveTo(x+83, y+94, x+89, y+88, x+97, y+88);
    ctx.bezierCurveTo(x+105, y+88, x+111, y+94, x+111, y+102);
    ctx.lineTo(x+111, y+116);
    ctx.lineTo(x+106.333, y+111.333);
    ctx.lineTo(x+101.666, y+116);
    ctx.lineTo(x+97, y+111.333);
    ctx.lineTo(x+92.333, y+116);
    ctx.lineTo(x+87.666, y+111.333);
    ctx.lineTo(x+83, y+116);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x+91, y+96);
    ctx.bezierCurveTo(x+88, y+96, x+87, y+99, x+87, y+101);
    ctx.bezierCurveTo(x+87, y+103, x+88, y+106, x+91, y+106);
    ctx.bezierCurveTo(x+94, y+106, x+95, y+103, x+95, y+101);
    ctx.bezierCurveTo(x+95, y+99, x+94, y+96, x+91, y+96);
    ctx.moveTo(x+103, y+96);
    ctx.bezierCurveTo(x+100, y+96, x+99, y+99, x+99, y+101);
    ctx.bezierCurveTo(x+99, y+103, x+100, y+106, x+103, y+106);
    ctx.bezierCurveTo(x+106, y+106, x+107, y+103, x+107, y+101);
    ctx.bezierCurveTo(x+107, y+99, x+106, y+96, x+103, y+96);
    ctx.fill();
      
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x+101, y+102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x+89, y+102, 2, 0, Math.PI * 2, true);
    ctx.fill();
      
}

function collisionDetection() {
    if( targetY-fireY <= 100 && targetX-fireX<= 10 &&  spacePressed) {
      score++
      createTarget=true;
    }
  }

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(rightPressed 
        && x < canvas.width-40
        ) {
        x += 7;
      }
      else if(leftPressed
        &&  x > 0
        ) {
        x -= 7;
      }

      if(spacePressed){
          drawFire(fireY)
          fireY = fireY - 100
        }

        if(fireY==0){
            fireY= bottom;
            spacePressed = false;
        }
        collisionDetection()
        
        
        if(createTarget){
            createTarget=false;
             targetX = Math.floor(Math.random() *( right-20 )) + 1
             targetY = Math.floor(Math.random() * (bottom-80)) + 1
        }
        target()




    drawCannon(x,y)
  requestAnimationFrame(draw);
}

draw();