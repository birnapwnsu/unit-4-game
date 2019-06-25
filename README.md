# unit-4-game

This was an assignment that required me to use **jQuery** *extensively* for the first time.

### Here's how the app works:
* When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.
* The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.
* The player chooses an opponent by clicking on an enemy's picture.
* Once the player selects an opponent, that enemy is moved to a defender area.
* The player will now be able to click the attack button.
* Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture.
The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture.
* The player will keep hitting the attack button in an effort to defeat their opponent.
* When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.
* The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.

Each character is an object which contained HP (health points), AP (attack power), CAP (counter attack power), and an image.
The name, HP, and image are displayed on the first page as clickable buttons for the user to select their character. 

### The application is made possible through the use of:
- Containers (which designated where things were meant to be):
1. initial character selection section
2. selected character section
3. action section
4. main defender section
5. choosing targets section
- Functions (which determined the logic behind what happens):
1. displaying user's selected character and moving the rest to the targets section
2. choosing a target puts the target into the defender section 
3. clicking fight inflicts damage on the target while the target damages the user
4. display results of battle onto the jumbotron
5. determining whether you win or lose based on HP
6. continue the game until all opponents are exhausted and you win OR you run out of HP and you lose
