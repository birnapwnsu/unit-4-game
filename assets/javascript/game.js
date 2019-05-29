$(document).ready(function() {

//array of characters
const characters = {
    'yoda': {
        name: 'yoda',
        health: 180,
        attack: 9, 
        enemyCounter: 20,
        imageUrl: "assets/images/yoda.jpg" 
    },

    'darth_maul': {
        name: 'darth_maul',
        health: 120,
        attack: 15, 
        enemyCounter: 15, 
        imageUrl: "assets/images/darth_maul.jpg" 
    },

    'boba_fett': {
        name: 'boba_fett',
        health: 140,
        attack: 14, 
        enemyCounter: 15,
        imageUrl: "assets/images/boba_fett.jpg"  
    },

    'obi_wan_kenobi': {
        name: 'obi_wan_kenobi',
        health: 160,
        attack: 20, 
        enemyCounter: 25, 
        imageUrl: "assets/images/obi_wan_kenobi.jpg"  
    }
};

//variables
let currSelected;
let currDefender;
let combatants = [];
let indexOfSel;
let attackResult;
let turnCounter = 1;
let killCount = 0;

//make character function which results in obj, class/id, and string
let renderOne = function(character, renderArea, makeChar) {
    let charDiv = $("<div class='character' data-name='" + character.name + "'>");
    let charName = $("<div class='character-name'>").text(character.name);
    let charHealth = $("<div class='character-health'>").text(character.health);
    let charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    charDiv.append(charName).append(charHealth);
    $(renderArea).append(charDiv);
    if (makeChar == 'enemy') {
        $(charDiv).addClass('enemy');
    }else if (makeChar == 'defender') {
        currDefender = character;
        $(charDiv).addClass('target-enemy');
    }
}

// Create function to render game message to DOM
let renderMessage = function(message) {
    let gameMesageSet = $("#gameMessage");
    let newMessage = $("<div>").text(message);
    gameMesageSet.append(newMessage);

    if (message == 'clearMessage') {
      gameMesageSet.text('');
    }
};

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
    var gameStateMessage = "You have defated " + charObj.name + ", you can choose to fight another enemy.";
    renderMessage(gameStateMessage);
    }

//need to render characters for users to choose their character
//need to render characters for users to choose to fight against
//need functions to allow actions between objects
// -action done to defender reflected
// -damage shown as result of combat
// -win condition otherwise game continues

//need a function restart the game

});

