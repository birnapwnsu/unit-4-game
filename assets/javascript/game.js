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
}

//renders all characters

//render player 

//render combatants

//render one enemy as defender

//re-render defender when attacked

//re-render player when attacked

//render defeated enemy