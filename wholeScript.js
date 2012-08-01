var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var clickups = 0;

//Ball variables
var ballX = 10, ballY = canvas.height - 150;
var ballYVelocity = 0;
var ballXVelocity = 0;
var ballRadius = 100;
var gravityForce = 0.5;
var mu = 0.98;
var mouseDown = false;
var mouseX, mouseY;

//Event Listeners
canvas.addEventListener('mousemove', function(e){
  mouseX = e.x;
  mouseY = e.y;
  
  //ballX = e.x;
  //ballY = e.y;
  //ballYVelocity = 0;
});

canvas.addEventListener('mousedown', function(e){
 if (e.which == 2) {   //middle mouse click
        console.log("YUS");
       clickups = -1;
     working = 0;
     console.log(working);
     //if only this worked...
    }
  else{
 mouseDown = true;
  }
  });

canvas.addEventListener('mouseout', function(e){
  mouseDown = false;
 clickups++;
  console.log(clickups);
});

canvas.addEventListener('mouseup', function(e){
  mouseDown = false;
 clickups++;
 //console.log(clickups);
});

//Physics
var ballMouseDistanceY,ballMouseDistanceX, pullForceY,pullForceX;
var working = 0;

function simulatePhysics(){
  //Slingshot ball
  if (ballY < (canvas.height /2))
    mouseDown = false; 
  
  /*

sdrystysrtyrt
asdkl;fjioawersdklfjoawieruasdkl;f
fhjjklasdrtyst


*/
  if(clickups !== 0 && working === 0){  
    ballYVelocity += pullForceY;
    ballXVelocity += pullForceX;
    working++;
    console.log(working);
  }
  if(mouseDown){
   
       ballMouseDistanceY = mouseY - ballY;
    ballMouseDistanceX = mouseX - ballX;
    pullForceY = ballMouseDistanceY * 0.15;
    pullForceX = ballMouseDistanceX * 0.15; 
     if (mouseY > (canvas.height / 2)){

    } 
    
}
    else{
    ballMouseDistanceY = mouseY - ballY;
    ballMouseDistanceX = mouseX - ballX;
    pullForceY = ballMouseDistanceY * 0.015;
    pullForceX = ballMouseDistanceX * 0.015;
    }
   
 /*
      else{
    ballX = 10;
    ballY = canvas.height - 150;
} 
  */
 

  
  //Add gravity to velocity
  ballYVelocity += gravityForce;
  
  //Move the ball by its velocity
  ballY += ballYVelocity; 
  ballX += ballXVelocity;
  
  //Add friction
  ballYVelocity = ballYVelocity * mu;
  ballXVelocity = ballXVelocity * mu;
  
  //Make the ball bounce off walls
  if(ballY > canvas.height - ballRadius){
    ballY = canvas.height - ballRadius;
    ballYVelocity = -Math.abs(ballYVelocity);
  }
  else if(ballY < 0){
    ballY = 0;
    ballYVelocity = Math.abs(ballYVelocity);
  }
  
  // x-direction restrictions
  if(ballX < 0){
    ballX = 0;
    ballXVelocity = Math.abs(ballXVelocity);
  }
  else if(ballX > canvas.width - ballRadius){
    ballX = canvas.width - ballRadius;
    ballXVelocity = -Math.abs(ballXVelocity);
  }
}

//Draw Background
function drawBackground(){
  c.beginPath();
  c.fillStyle = "lightblue";
  c.fillRect(0,0,canvas.width,canvas.height);
  c.fill();
}

//Drawing the border
function drawBorder(){
  c.strokeStyle = 'rgb(0,0,0)';
  c.lineWidth = "3";
  c.strokeRect(0,0,canvas.width,canvas.height);
  c.beginPath();
  c.strokeStyle = 'rgba(0,0,0,0.5)';
  c.moveTo(0,canvas.height/2);
  c.lineTo(canvas.width, canvas.height/2);
  c.closePath();
  c.stroke();
}

var img = new Image();
img.src = 'http://i.imgur.com/eTYM1.png';

//Calling Hippopoticorn
function drawHippo(){
      c.drawImage(img, ballX, ballY, ballRadius, ballRadius);
}

//Drawing line from mouse to object
function drawLine(){
  if(mouseDown){
    c.beginPath();
      c.strokeStyle = 'rgba(0,0,0, 0.75)';  
    c.moveTo(ballX + (ballRadius/2), ballY + (ballRadius/2));
    c.lineTo(mouseX, mouseY);
    c.lineWidth = "2";
    c.stroke();
  }
}

//Commands
setInterval(function(){
  //Resize canvas according to the window
  if(canvas.width != window.innerWidth){
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;
  }
  
  if(canvas.height != window.innerHeight){
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;
  }
  
  simulatePhysics();
  //c.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  //c.fillStyle = 'rgba(255,255,255,0.3)';
  drawBorder();
  if (mouseY > (canvas.height / 2))
  drawLine();
  drawHippo();
}, 30);

drawLine();