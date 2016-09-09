# Pizza Ramo

![alt tag](https://github.com/rainrunner88/pizza_ramo/blob/master/Screen%20Shot%202016-09-09%20at%203.23.32%20PM.png)

##Links
- GitHub
	- https://sungju881203.github.io/pizza_ramo/

##Technology used
* html5 canvas
* css
* javascript


##How to play

###Game play
* P (pause the game)
* Enter (start game)
* Refresh (restart)

###Control
* PLAYER1: Ethan's Baby
  Left Arrow (move left)
  Right Arrow (move right)
  Spacebar (fire poop)

* Player2: Liza Ramo
  A (move left)
  D (move right)
  Dodge the pizza and survive!

###Canvas
Draws baby and liza on the bottom of the canvas.
Runs forEach loop to iterate pizza array and randomly display on top of canvas.
Takes space bar events and draws poops on each events.
Gets updated & draws canvas every 10ms.

###Javascript
PizzaCon is constructor that gets iterated to display pizza.
Once it gets displayed, it moves downward.
Detects collision between liza and pizza. when they collides, checkCollides display alert message.

##Area to improve
* add scoreboard and time
