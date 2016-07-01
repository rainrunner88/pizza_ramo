/**
 * Created by Macbook on 6/28/16.
 */
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var rightPressed = false;
var leftPressed = false;
var pizzaArr = [];

//liza object
var liza = {
    x: canvas.width/2,
    y: canvas.height - 35,
    width: 19,
    height: 31,
    img: document.getElementById("liza"),
    draw: function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
};

//listen to key events
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//key handler
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

//pizza object constructor
//source: html5rocks.com, modified.
function pizzaCon(I) {
    I = I || {};
    I.x = Math.random() * canvas.width;
    I.y = 0;
    I.width = 16;
    I.height = 16;
    I.xVelocity = 0;
    I.yVelocity = 2;
    I.age = Math.floor(Math.random() * 128);
    I.img = document.getElementById("pizza");
    I.active = true;

    I.inBounds = function() {
        return I.x >= 0 && I.x <= canvas.width &&
            I.y >= 0 && I.y <= canvas.height;
    };
    I.draw = function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    I.update = function() {
        I.y += I.yVelocity;
        I.age++;
        I.active = I.active && I.inBounds();
    };

    return I;
};

// collision detection algorithm
// source: html5rocks.com
function collides(a, b) {
    return a.x < b.x + b.width-5 &&
        a.x + a.width-5 > b.x &&
        a.y < b.y + b.height-3 &&
        a.y + a.height-3 > b.y;
}

//alert "dead" after collision
function checkCollides() {
    pizzaArr.forEach(function(pizza) {
        if (collides(pizza, liza)) {
            alert("MMMMM YUMMY");
        }
    })
}
//update pizza, liza position
function update() {
    //movement on keyDown
    if (rightPressed && liza.x < canvas.width-liza.width) {
        liza.x += 3;
    } else if (leftPressed && liza.x > 0) {
        liza.x -= 3;
    }
    //update pizza iteration
    pizzaArr.forEach(function(pizza) {
        pizza.update();
    });
    pizzaArr = pizzaArr.filter(function(pizza) {
        return pizza.active;
    });
    if(Math.random() < 0.1) {
        pizzaArr.push(pizzaCon());
    }
    checkCollides();
}

//draw liza, pizza on canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    liza.draw();
    pizzaArr.forEach(function(pizza) {
        pizza.draw();
    });
}

//draw & update every 10ms
setInterval(function() {
    draw();
    update();
}, 10);