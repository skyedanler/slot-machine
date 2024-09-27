//buttons
let multiplierSingle = document.getElementById('single');
let multiplierDouble = document.getElementById('double');
let multiplierTriple = document.getElementById('triple');
let multiplierQuadruple = document.getElementById('quadruple');
let multiplierQuintuple = document.getElementById('quintuple');

let spinButton = document.getElementById('spin');

//listener event for buttons
let lastMultiplierClicked = null;

const multipliers = document.querySelectorAll('.multiplier');

multipliers.forEach(button => {
    button.addEventListener('click', function() {
        const multiplier = parseInt(button.innerHTML, 10);
        useCredits(multiplier); 
        multipliers.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        /*button.disabled = true;
        spinReel(reel1, Math.floor(Math.random() * 20));
        spinReel(reel2, Math.floor(Math.random() * 20));
        spinReel(reel3, Math.floor(Math.random() * 20));
        spinReel(reel4, Math.floor(Math.random() * 20));
        spinReel(reel5, Math.floor(Math.random() * 20));
        button.disabled = false;*/
        // reels spinning function can go here
    });
});

spinButton.addEventListener('click', function() {
    useCredits(parseInt(document.querySelector('.multiplier.active').innerHTML, 10));//you want to have it useCredits based on last multiplier clicked
    //spins reel with random amount of spins for each reel to ensure combinations aren't always the same
    //TODO: buttons.disabled = true
    /*spinButton.disabled = true;
    spinReel(reel1, Math.floor(Math.random() * 20));
    spinReel(reel2, Math.floor(Math.random() * 20));
    spinReel(reel3, Math.floor(Math.random() * 20));
    spinReel(reel4, Math.floor(Math.random() * 20));
    spinReel(reel5, Math.floor(Math.random() * 20));
    spinButton.disabled = false;*/
    //TODO: buttons.disabled = false;
    //TODO: updateCredits after spin happens
});




//credits
function updateCredits(newCredits) {
    return document.getElementById('credits').innerText = `${newCredits}`;
};

function useCredits(multiplier) { //subtracts credits depending on multiplier pressed
    let credits = parseInt(document.getElementById('credits').innerText, 10);
    document.getElementById('cant-spin').innerHTML = '';

    if (multiplier <= credits) {
        credits -= multiplier;
        updateCredits(credits);
        enoughCredits(credits);
    } 
    else {
        document.getElementById('cant-spin').innerHTML = 'Nice try. You need more credits for that. Choose a different multiplier.';
    }
};

function enoughCredits(credit_count) { //check if there are enough credits for each button to be clickable
    multipliers.forEach(button => {
        if (credit_count < parseInt(button.innerHTML, 10)) {
            button.disabled = true;
            if (credit_count < 20) {
                spinButton.disabled = true;
            }
        }
        else {
            return;
        }
    })
}




//reels
//Symbols
const JS = './images/JS_symbol.png';
const python = './images/python_symbol.png';
const buggy = './images/bug_symbol.png';
const curly_braces = './images/curly_brackets_symbol.png';
const coffee = './images/coffee_cup.png';
const parentheses = './images/parentheses.png';
const semicolon = './images/semicolon.png';

//each reel has the following amount of symbols
const symbolAmount = {
    JS: 1,
    python: 2,
    buggy: 4,
    curly_braces: 3,
    coffee: 1,
    parentheses: 3,
    semicolon: 3
}

function createReel(symbolAmount) {
    let symbols = [];
    for (let symbol in symbolAmount) {
        for (let i = 0; i < symbolAmount[symbol]; i++) {
            symbols.push(eval(symbol));
        }
    }
    symbols = symbols.sort(() => Math.random() - 0.5); //for randomness so that they aren't shuffling through in the same way on the slot machine
    return symbols;
}

// creating all reels with the same amount of symbols based on paytable combination probability
reel1 = createReel(symbolAmount);
reel2 = createReel(symbolAmount);
reel3 = createReel(symbolAmount);
reel4 = createReel(symbolAmount);
reel5 = createReel(symbolAmount);

//function to only display three symbols per reel at a time
function displayReel(reel, symbols) { // TODO: I want five reel divs separated into 3 sections because images must align with those
   
    let selectedSymbols = symbols.slice(0, 3);
    selectedSymbols.forEach(symbol => {
        let img = document.createElement('img');
        img.src = symbol;
        img.classList.add('reel-image');//create class so I can use CSS
        reel.append(img);
    });   
}



//function to spin the reels
/*This function is displaying the reel as it spins. The problem is, does this reel stay after it's done? because reel in itself is local to the function.*/
function spinReel(reel, spins) {

    let pulledValue = 0;

    while (spins > 0) {
        pulledValue = reel.shift();
        reel.push(pulledValue);
        spins -= 1;
        displayReel(document.getElementById(`${reel}`), reel);
    }
    /*The problem with this is that when I spin the reel, I want the images to each change as the spin is happening.
    I don't want it to just change the reel after the spin happens so maybe I need to displayReel() each time in while loop */
}


//displayed reels
displayReel(document.getElementById('reel1'), reel1);
displayReel(document.getElementById('reel2'), reel2);
displayReel(document.getElementById('reel3'), reel3);
displayReel(document.getElementById('reel4'), reel4);
displayReel(document.getElementById('reel5'), reel5);


let symbolCombo = [];//create array of the five symbol combination it lands on for use in wonCredits
//function to updateCredits based on combination win/not win
function wonCredits(symbolCombo) {
    
}

//TODO: perhaps create some functions or quick for loops to do functions for each reel. Gets repetitive