let inpdir = {x: 0, y: 0}; 
const foodaud = new Audio('music/food.mp3');
const gameoveraud = new Audio('music/Super Mario Death.mp3');
const moveaud = new Audio('music/move.mp3');
const musicaud = new Audio('music/supermario.mp3');
let speed = 10;
let score = 0;
let lptime = 0;
let snakearr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};
function main(c) {
    window.requestAnimationFrame(main);
    if((c - lptime)/1000 < 1/speed){
        return;
    }
    lptime = c;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    if(isCollide(snakearr)){
        gameoveraud.play();
        musicaud.pause();
        inpdir =  {x: 0, y: 0}; 
        alert("Oops!!You lost. Press any key to try again!");
        snakearr = [{x: 13, y: 15}];
        musicaud.play();
        score = 0; 
    }
    if(snakearr[0].y === food.y && snakearr[0].x ===food.x){
        foodaud.play();
        score += 1;
        if(score>highscorevalue){
            highscorevalue = score;
            localStorage.setItem("hiscore", JSON.stringify(highscorevalue));
            hiscoreBox.innerHTML = "HighScore : " + highscorevalue;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakearr.unshift({x: snakearr[0].x + inpdir.x, y: snakearr[0].y + inpdir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    for (let i = snakearr.length - 2; i>=0; i--) { 
        snakearr[i+1] = {...snakearr[i]};
    }

    snakearr[0].x += inpdir.x;
    snakearr[0].y += inpdir.y;
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeelem = document.createElement('div');
        snakeelem.style.gridRowStart = e.y;
        snakeelem.style.gridColumnStart = e.x;

        if(index === 0){
            snakeelem.classList.add('head');
        }
        else{
            snakeelem.classList.add('snake');
        }
        board.appendChild(snakeelem);
    });
    foodelem = document.createElement('div');
    foodelem.style.gridRowStart = food.y;
    foodelem.style.gridColumnStart = food.x;
    foodelem.classList.add('food')
    board.appendChild(foodelem);


}
musicaud.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    highscorevalue = 0;
    localStorage.setItem("hiscore", JSON.stringify(highscorevalue))
}
else{
    highscorevalue = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore : " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inpdir = {x: 0, y: 1}
    moveaud.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inpdir.x = 0;
            inpdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inpdir.x = 0;
            inpdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inpdir.x = -1;
            inpdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inpdir.x = 1;
            inpdir.y = 0;
            break;
        default:
            break;
    }

});
