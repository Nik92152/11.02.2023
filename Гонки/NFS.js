// Переменные и объекты
let canvas = document.getElementById("canvas");
let format = canvas.getContext("2d");

let lives = 3;
let okLeft = false;
let okRight =false;


let line = new Image()
line.src ="img/line.png";
line.X = 225;
line.Y =  -180;

let line2 = new Image()
line2.src ="img/line.png";
line2.X = 225;
line2.Y = 230;




let car1 = new Image()
car1.src ="img/car1.png";
car1.X = 50;
car1.Y = 590;


let car2 = new Image()
car2.src ="img/car2.png";
car2.X = 50;
car2.Y = -150;

let car3 = new Image()
car3.src ="img/car3.png";
car3.X = 250;
car3.Y = -450;

let Nelson = new Image()
Nelson.src ="img/Nelson.png";
Nelson.X = 80;
Nelson.Y = 200;





//Функции

function drawRectangle(){   //build rectangle
    format.fillStyle = "Grey";
    format.fillRect(0,0,500,700 )  // Всего 4 параметра. НАчало отсчёта в левом верхнем углу. первые 2 параметра - нач. коорд, 3 и 4 - шир и высота области.
 }

function drawLives() {
    format.font = "30px Times New Roman"
    format.fillStyle = "White"
    format.fillText ("Lives: " + lives, 20, 35) //Конкатенация строк и координаты счётчика жизней
}

function drawLines(){
    format.drawImage(line, line.X, line.Y)
    line.Y += 3;
    if (line.Y > 700) {
        line.Y = - 140
    }
    format.drawImage(line2, line2.X, line2.Y)
    line2.Y += 3;
    if (line2.Y > 700) {
        line2.Y = - 140
    }
}

function gameOver() {
    cancelAnimationFrame(myReq);  //В качестве параметра переменная, созданная ниже 
    format.font = "70px Times New Roman";
    format.fillStyle = "Aqua";
    format.fillText("Haa - Haaa", 105, 150);
   format.drawImage(Nelson, Nelson.X, Nelson.Y)
    gameOver = true;

}



function drawCar(){
    if(okLeft === true && car1.X > 0) {car1.X -=10}  //логика передвижения машины
    if(okRight === true && car1.X < 400) {car1.X +=10} // Чтобы машина не выезжала за пределы экрана
    format.drawImage(car1, car1.X, car1.Y);
}

function drawEnemyCar(){
    if (car2.Y + 50 > car1.Y && car2.X + 70 > car1.X && car2.X < car1.X + 70) {
        crash = true
        car2.Y = -100   // Выкидываем машину за экран
        lives --   // Отнимаем жизнь(уменьшаем на 1)
        if ( lives < 1 ) {
               
            gameOver()
        } 
    } else {
            crash = false
        
    }

    if (!crash )  {          //Если НЕ crash, то...
        format.drawImage(car2, car2.X, car2.Y)
        car2.Y +=2
        if (car2.Y > 700) {
            car2.Y = -100
            car2.X = Math.floor(Math.random() * 340) 
            
        }
   }
}




function drawAnotherEnemyCar(){
    if (car3.Y + 50 > car1.Y && car3.X + 70 > car1.X && car3.X < car1.X + 70) {
        crash = true
        car3.Y = -100   // Выкидываем машину за экран
        lives --   // Отнимаем жизнь(уменьшаем на 1)
        if ( lives < 1 ) {
            gameOver()
        } 
    } else {
            crash = false
        
    }

    if (!crash )  {          //Если НЕ crash, то...
        format.drawImage(car3, car3.X, car3.Y)
        car3.Y +=2
        if (car3.Y > 700) {
            car3.Y = -100
            car3.X = Math.floor(Math.random() * 340) 
            
        }
   }
}







 function render () {
    if (gameOver === true){
        return
    }
    drawRectangle();
    drawLives();
    drawLines();
    drawCar();
    drawEnemyCar(); 
    drawAnotherEnemyCar();




    myReq = requestAnimationFrame(render)
 }

render()                                    // Вызов функций

//Обработчики событий(нажатия клавиш)
addEventListener("keydown", function(event) {
    let newDirect = event.keyCode
    if (newDirect === 37) {
        okLeft = true
    }
    
    
    if (newDirect === 39){
        okRight = true
    }
    
})  
//Нажатие клавишы вниз


addEventListener("keyup", function(event) { //Отжатие клавишы вниз
    let newDirect = event.keyCode
    if (newDirect === 37 ) {
        okLeft = false
    }

    if (newDirect === 39){
        okRight = false
    }
    
})

