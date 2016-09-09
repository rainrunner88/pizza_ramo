/**
 * Created by Macbook on 6/28/16.
 */
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var lizaRightPressed = false;
var lizaLeftPressed = false;
var babyRightPressed = false;
var babyLeftPressed = false;
var pizzaArr = [];
var poopArr = [];
var isPlaying = true;
var gameOver = false;
var interval;

//liza object
const liza = {
    x: canvas.width / 2,
    y: canvas.height - 35,
    width: 19,
    height: 31,
    img: document.getElementById("liza"),
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
};

//baby object
const baby = {
    x: canvas.width / 2,
    y: 0,
    width: 50,
    height: 50,
    img: document.getElementById("baby"),
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    },
    shoot: function () {
        var bulletPosition = this.midpoint();
        poopArr.push(poopCon({
            speed: 5,
            x: bulletPosition.x,
            y: bulletPosition.y
        }));
    },
    midpoint: function () {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    }
};

//pizza object constructor
//source: html5rocks.com, modified.
function pizzaCon(I) {
    I = I || {};
    I.x = Math.random() * canvas.width;
    I.y = 0;
    I.width = 16;
    I.height = 16;
    I.xVelocity = 0;
    I.yVelocity = 1.8;
    I.age = Math.floor(Math.random() * 10);
    I.img = new Image();
    I.img.src = "./src/pizza.png";
    I.active = true;

    I.inBounds = function () {
        return I.x >= 0 && I.x <= canvas.width &&
            I.y >= 0 && I.y <= canvas.height;
    };
    I.draw = function () {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    I.update = function () {
        I.y += I.yVelocity;
        I.age++;
        I.active = I.active && I.inBounds();
    };

    return I;
}

//poop object constructor
function poopCon(I) {
    I.active = true;
    I.xVelocity = 0;
    I.yVelocity = 1.5;
    I.width = 20;
    I.height = 20;
    I.x = baby.x;
    I.y = 10;
    I.img = new Image();
    I.img.src = "./src/poop.png";
    I.inBounds = function () {
        return I.x >= 0 && I.x <= canvas.width &&
            I.y >= 0 && I.y <= canvas.height;
    };
    I.draw = function () {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    I.update = function () {
        I.y += I.yVelocity;
        I.active = I.active && I.inBounds();
    };
    return I;
}

// start button object
const startBtn = {
    w: 100,
    h: 50,
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 25,
    draw: function () {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStlye = "white";
        ctx.fillText("START", canvas.width / 2, canvas.height / 2);
    }
};

// starting text: press enter
function startGameText() {
    ctx.fillStlye = "white";
    ctx.font = "20px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("press ENTER to ", canvas.width / 2, canvas.height / 2 - 50);
}

// restart button object
const restartBtn = {
    w: 100,
    h: 50,
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 25,

    draw: function () {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStlye = "white";
        ctx.fillText("Restart", canvas.width / 2, canvas.height / 2);
    }
};

// gameover text: failed diet
function gameOverTxt() {
    ctx.fillStlye = "white";
    ctx.font = "20px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2 - 110);
    ctx.fillText("Liza failed diet...", canvas.width / 2, canvas.height / 2 - 80);
    ctx.fillText("Please refresh the page to ", canvas.width / 2, canvas.height / 2 - 50);
    isPlaying = true;
}

//listen to key events
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//key handler
function keyDownHandler(e) {
    if (e.keyCode == 68) {
        lizaRightPressed = true;
    }
    else if (e.keyCode == 65) {
        lizaLeftPressed = true;
    }
    else if (e.keyCode == 39) {
        babyRightPressed = true;
    }
    else if (e.keyCode == 37) {
        babyLeftPressed = true;
    }
    // space bar event: shoots poop
    else if (e.keyCode == 32) {
        baby.shoot();
    }
    // enter key event: start the game
    else if (e.keyCode == 13) {
        console.log("start the game");
        if (!gameOver) {
            startGame();
            gameOver = false;
        } else if(gameOver) {
            startGame();
            initLoad();
        }
    }
    else if (e.keyCode == 80) {
        console.log("pause the game");
        isPlaying == true ? startGame() : endGame();
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 68) {
        lizaRightPressed = false;
    }
    else if (e.keyCode == 65) {
        lizaLeftPressed = false;
    }
    else if (e.keyCode == 39) {
        babyRightPressed = false;
    }
    else if (e.keyCode == 37) {
        babyLeftPressed = false;
    }
    else if (e.keyCode == 32) {
        console.log("poop fired");
    }
}

// collision detection algorithm
// source: html5rocks.com
function collides(a, b) {
    return a.x < b.x + b.width - 5 &&
        a.x + a.width - 5 > b.x &&
        a.y < b.y + b.height - 3 &&
        a.y + a.height - 3 > b.y;
}

//end game, display btn & text after collision
function checkCollides() {
    pizzaArr.forEach(function (pizza) {
        if (collides(pizza, liza)) {
            console.info("MMMMM YUMMY");
            endGame();
            restartBtn.draw();
            gameOverTxt();
            gameOver = false;
        }
    });
    poopArr.forEach(function (poop) {
        if (collides(poop, liza)) {
            console.error("EWWWW YOU GOT HIT BY POOP");
            endGame();
            restartBtn.draw();
            gameOverTxt();
            gameOver = false;
        }
    })
}
//update pizza, liza position
function update() {
    // liza's movement on key event
    if (lizaRightPressed && liza.x < canvas.width - liza.width) {
        liza.x += 3;
    } else if (lizaLeftPressed && liza.x > 0) {
        liza.x -= 3;
    }
    // baby's movement on key event
    if (babyRightPressed && baby.x < canvas.width - baby.width) {
        baby.x += 3;
    } else if (babyLeftPressed && baby.x > 0) {
        baby.x -= 3;
    }
    //update pizza iteration
    pizzaArr.forEach(function (pizza) {
        pizza.update();
    });
    pizzaArr = pizzaArr.filter(function (pizza) {
        return pizza.active;
    });
    //update poop iteration
    poopArr.forEach(function (poop) {
        poop.update();
    });
    poopArr = poopArr.filter(function (poop) {
        return poop.active;
    });
    if (Math.random() < 0.1) {
        pizzaArr.push(pizzaCon());
    }
    checkCollides();
}

//draw liza, pizza on canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    liza.draw();
    baby.draw();
    // startBtn.draw();
    // restartBtn.draw();
    pizzaArr.forEach(function (pizza) {
        pizza.draw();
    });
    poopArr.forEach(function (poop) {
        poop.draw();
    });
}

//sets the interval and starts/resumes the game
function startGame() {
    if (isPlaying) {
        interval = setInterval(function () {
            isPlaying = false;
            draw();
            update();
        }, 10);
        return interval;
    }
}
//removes the interval and ends/pauses the game
function endGame() {
    if (!isPlaying) {
        console.log("game over!");
        window.clearInterval(interval);
        isPlaying = true;
    }
}

//initially loading the game
function initLoad() {
    draw();
    startBtn.draw();
    startGameText();
}

initLoad();