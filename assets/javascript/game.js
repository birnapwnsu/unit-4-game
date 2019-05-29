$(document).ready(function() {

//array of characters
const characters = {
    'yoda': {
        name: 'yoda',
        health: 160,
        attack: 9, 
        enemyCounter: 22,
        imageUrl: "assets/images/yoda.jpg" 
    },

    'darth maul': {
        name: 'darth maul',
        health: 150,
        attack: 10, 
        enemyCounter: 18, 
        imageUrl: "assets/images/darth_maul.jpg" 
    },

    'boba fett': {
        name: 'boba fett',
        health: 140,
        attack: 12, 
        enemyCounter: 17,
        imageUrl: "assets/images/boba_fett.jpg"  
    },

    'obi wan kenobi': {
        name: 'obi wan kenobi',
        health: 130,
        attack: 13, 
        enemyCounter: 27, 
        imageUrl: "assets/images/obi_wan_kenobi.jpg"  
    }
};

//variables
let currSelected;
let currDefender;
let combatants = [];
let turnCounter = 1;
let killCount = 0;

//make character function which results in obj, class/id, and string
let renderOne = function(character, renderArea, makeChar) {
    let charDiv = $("<div class='character' data-name='" + character.name + "'>");
    let charName = $("<div class='character-name'>").text(character.name);
    let charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    let charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
    if (makeChar == 'enemy') {
        $(charDiv).addClass('enemy');
    }else if (makeChar == 'defender') {
        currDefender = character;
        $(charDiv).addClass('target-enemy');
    }
};

// Create function to render game message to DOM
let renderMessage = function(message) {
    let gameMesageSet = $("#gameMessage");
    let newMessage = $("<div>").text(message);
    gameMesageSet.append(newMessage);

    if (message == 'clearMessage') {
      gameMesageSet.text('');
    }
};

let renderCharacters = function(charObj, areaRender) {
//renders all characters
if (areaRender == '#characters-section') {
    $(areaRender).empty();
    for (var key in charObj) {
        if (charObj.hasOwnProperty(key)) {
            renderOne(charObj[key], areaRender, '');
        }
    }
}

//render player 
if (areaRender == '#selected') {
    $('#selected').prepend("Your Character");       
    renderOne(charObj, areaRender, '');
    $('#attack-button').css('visibility', 'visible');
}

//render combatants
if (areaRender == '#targets-section') {
    $('#targets-section').prepend("Choose Your Next Opponent");      
    for (var i = 0; i < charObj.length; i++) {
        renderOne(charObj[i], areaRender, 'enemy');
}

//render one enemy as defender
$(document).on('click', '.enemy', function() {
    //select an combatant to fight
    name = ($(this).data('name'));
    //if defernder area is empty
    if ($('#defender').children().length === 0) {
        renderCharacters(name, '#defender');
        $(this).hide();
        renderMessage("clearMessage");
        }
    });
}
//render defender
if (areaRender == '#defender') {
    $(areaRender).empty();
    for (var i = 0; i < combatants.length; i++) {
    //add enemy to defender area
        if (combatants[i].name == charObj) {
        $('#defender').append("Your selected opponent")
        renderOne(combatants[i], areaRender, 'defender');
        }
    }
}

//re-render defender when attacked
if (areaRender == 'playerDamage') {
    $('#defender').empty();
    $('#defender').append("Your selected opponent")
    renderOne(charObj, '#defender', 'defender');
}

//re-render player when attacked
if (areaRender == 'enemyDamage') {
    $('#selected').empty();
    renderOne(charObj, '#selected', '');
}

//render defeated enemy
if (areaRender == 'enemyDefeated') {
    $('#defender').empty();
   let gameStateMessage = "You have defated " + charObj.name + ", you can choose to fight another enemy.";
    renderMessage(gameStateMessage);
    }
};

//need to render characters for users to choose their character
renderCharacters(characters, '#characters-section');
$(document).on('click', '.character', function() {
    name = $(this).data('name');

  //if no player char has been selected
    if (!currSelected) {
    currSelected = characters[name];
    for (var key in characters) {
        if (key != name) {
            combatants.push(characters[key]);
        }
    }
$("#characters-section").hide();
renderCharacters(currSelected, '#selected');

//need to render characters for users to choose to fight against
renderCharacters(combatants, '#targets-section');
}
});

//need functions to allow actions between objects
$("#attack-button").on("click", function() {
if ($('#defender').children().length !== 0) {

// -action done to defender reflected
    let attackMessage = "You attacked " + currDefender.name + " for " + (currSelected.attack * turnCounter) + " damage.";
    renderMessage("clearMessage");

// -damage shown as result of combat
    currDefender.health = currDefender.health - (currSelected.attack * turnCounter);

// -win condition otherwise game continues
    if (currDefender.health > 0) {

    //keep playing if enemy is not dead
        renderCharacters(currDefender, 'playerDamage');

    //player damage reflected
        let counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyCounter + " damage.";
        renderMessage(attackMessage);
        renderMessage(counterAttackMessage);

        currSelected.health = currSelected.health - currDefender.enemyCounter;
        renderCharacters(currSelected, 'enemyDamage');
    if (currSelected.health <= 0) {
        renderMessage("clearMessage");
        restartGame("You have been defeated...GAME OVER!!!");
        $("#attack-button").unbind("click");
        }
    } else {
        renderCharacters(currDefender, 'enemyDefeated');
        killCount++;

        if (killCount >= 3) {
            renderMessage("clearMessage");
            restartGame("You Won!!!! GAME OVER!!!");
        }
    }
    turnCounter++;
} else {
    renderMessage("clearMessage");
    renderMessage("No enemy here.");
}
});


//need a function restart the game
const restartGame = function(inputEndGame) {
    const restart = $('<button class="btn">Restart</button>').click(function() {
      location.reload();
    });
    const gameState = $("<div>").text(inputEndGame);
    $("#gameMessage").append(gameState);
    $("#gameMessage").append(restart);
  };

});