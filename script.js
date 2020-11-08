

var cvs = document.getElementById("canvas")

var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeTop = new Image();
var pipeBot = new Image();

bird.src = "Images/flappy_bird_bird.png";
bg.src = "Images/flappy_bird_bg.png";
fg.src = "Images/flappy_bird_fg.png";
pipeTop.src = "Images/flappy_bird_pipeUp.png";
pipeBot.src = "Images/flappy_bird_pipeBottom.png";

var fly = new Audio();
var score_audio = new Audio();

fly.src = "Audio/fly.mp3";
score_audio.src = "Audio/score.mp3";

var pipe = [];

pipe[0] = {
    x:cvs.width,
    y:0
}

var gap = 100;
var xPos = 10;
var yPos = 150;
var grav = 2;
var score = 0;
addEventListener("click",clickUpBird);

function draw(){
    ctx.drawImage(bg,0,0);

    
    for(let i = 0;i < pipe.length;i++){
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);

        

        ctx.drawImage(pipeBot, pipe[i].x ,pipe[i].y + pipeTop.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 130){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeTop.height) - pipeTop.height
            })
        }

        if(pipe[i].x == 5){
            score++;
            score_audio.play();
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeTop.width
            && (yPos <= pipe[i].y + pipeTop.height
                || yPos + bird.height >= pipe[i].y + pipeTop.height + gap) || yPos + bird.height >= cvs.height - fg.height){
                    location.reload();
                }

    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird,xPos,yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "25px Verdena";
    ctx.fillText("Рахунок " + score , 10, cvs.height - 20);
    requestAnimationFrame(draw);
}

function clickUpBird(){
    yPos -= 40;
}


pipeBot.onload = draw;

