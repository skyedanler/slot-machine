let spinButton = document.getElementById('spin');

let lastMultiplierClicked = null;
const multipliers = document.querySelectorAll('.multiplier');
let buttons = document.getElementsByTagName('button');//for use in enabling/disabling

let reelIndices = {
    reel1: 0,
    reel2: 0,
    reel3: 0,
    reel4: 0,
    reel5: 0,
}

let symbolCombo = {
    reel1: null,
    reel2: null,
    reel3: null,
    reel4: null,
    reel5: null,
} 


//credits
function updateCredits(newCredits) { //TODO: make sure the updateCredits is updating proportional to the multiplier clicked
    let credits = parseInt(document.getElementById('credits').innerText, 10);

    if (newCredits > 0) {
        let multiple = parseInt(document.querySelector('.multiplier.active').innerHTML, 10)/20;//calculuates how much credits should be multiplied by for wins based on multiplier that's selected
        newCredits = newCredits * multiple;//calculates new winning amount of credits
        document.getElementById('message').innerHTML = `You won ${newCredits} credits! Now spend more credits!`;
        credits += newCredits;
    }
    else {
        document.getElementById('message').innerHTML = 'Yikes, better luck next time.';
    }
    document.getElementById('credits').innerText = `${credits}`;
};

//subtracts credits depending on multiplier pressed
function useCredits(multiplier) {
    let credits = parseInt(document.getElementById('credits').innerText, 10);
    document.getElementById('message').innerHTML = '';

    if (multiplier <= credits) {
        credits -= multiplier;
        document.getElementById('credits').innerText = `${credits}`;
        enoughCredits(credits);
    } 
    else {
        document.getElementById('message').innerHTML = 'Nice try. You need more credits for that. Choose a different multiplier.';
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
const reel1 = createReel(symbolAmount);
const reel2 = createReel(symbolAmount);
const reel3 = createReel(symbolAmount);
const reel4 = createReel(symbolAmount);
const reel5 = createReel(symbolAmount);

//function to only display three symbols per reel at a time
function displayReel(reel, symbols) {
    reel.innerHTML = ''; //clear any previous symbols to adjust the spin
   
    symbols.forEach(symbol => {
        let img = document.createElement('img');
        img.src = symbol;
        img.classList.add('reel-image');//creates class so I can use CSS
        reel.append(img);
    });   
}

//initial displayed reels (might get rid of this)
//reels.forEach(reel => displayReel(document.getElementById(`${reel}`), reel.slice(0,3)));
if (document.querySelectorAll('.multiplier.active').length === 0) {
    displayReel(document.getElementById('reel1'), reel1.slice(0,3));
    displayReel(document.getElementById('reel2'), reel2.slice(0,3));
    displayReel(document.getElementById('reel3'), reel3.slice(0,3));
    displayReel(document.getElementById('reel4'), reel4.slice(0,3));
    displayReel(document.getElementById('reel5'), reel5.slice(0,3));
};

//function to spin the reels
/*This function is displaying the reel as it spins. The problem is, does this reel stay after it's done? because reel in itself is local to the function.*/
function spinReel(reel, reelName) {
    let reelArray = [];
    let startIndex = reelIndices[reelName];
   
    reelArray.push(reel[startIndex]);
    reelArray.push(reel[(startIndex+1) >= reel.length ? 0 : startIndex + 1]);
    reelArray.push(reel[(startIndex+2) >= reel.length ? (startIndex + 2) - reel.length : startIndex + 2]);
   
    reelIndices[reelName] += 1;
    if (reelIndices[reelName] >= reel.length) {
        reelIndices[reelName] = 0;
    }

    displayReel(document.getElementById(reelName), reelArray);
    symbolCombo[reelName] = reelArray[1];
}

function startReels() {//starting spinning the reels at their respective interval times
    reel1Spin = setInterval(() => spinReel(reel1, 'reel1'), 100);
    reel2Spin = setInterval(() => spinReel(reel2, 'reel2'), 200);
    reel3Spin = setInterval(() => spinReel(reel3, 'reel3'), 300);
    reel4Spin = setInterval(() => spinReel(reel4, 'reel4'), 400);
    reel5Spin = setInterval(() => spinReel(reel5, 'reel5'), 500);
}

function stopReels() {//stop all spinning after 3 seconds
    setTimeout(() => { 
        clearInterval(reel1Spin);
        clearInterval(reel2Spin);
        clearInterval(reel3Spin);
        clearInterval(reel4Spin);
        clearInterval(reel5Spin);

        //enable buttons again when we are clearing the intervals and stopping the reels. stopReels has timeout and anything we do after it in startSpin may not render so we do it here.
        Array.from(buttons).forEach(btn => btn.disabled = false);

        wonCredits();
    }, 3000);
}

function startSpin() {//this function will start the spinning action for all reels as well as stop them.
    Array.from(buttons).forEach(btn => btn.disabled = true); //want to disable buttons when the spin starts
    startReels();
    stopReels();
}


//function to updateCredits based on combination win/not win
function wonCredits() {
    const symbolValues = Object.values(symbolCombo);

    if (symbolValues.filter(sym => sym === JS).length === 5) {
        updateCredits(2000);
    }
    else if (symbolValues.filter(sym => sym === JS).length === 4) {
        updateCredits(1500);
    }
    else if (symbolValues.filter(sym => sym === JS).length === 3) {
        updateCredits(1000);
    }
    else if (symbolValues.filter(sym => sym === python).length === 5) {
        updateCredits(1500);
    }
    else if (symbolValues.filter(sym => sym === python).length === 4) {
        updateCredits(1200);
    }
    else if (symbolValues.filter(sym => sym === python).length === 3) {
        updateCredits(800);
    }
    else if ((symbolValues.filter(sym => sym === JS).length === 2) && (symbolValues.filter(sym => sym === python).length === 2)) {
        updateCredits(500);
    }
    else if (symbolValues.filter(sym => sym === buggy).length === 5) {
        updateCredits(600);
    }
    else if (symbolValues.filter(sym => sym === buggy).length === 4) {
        updateCredits(400);
    }
    else if (((symbolValues.filter(sym => sym === JS).length === 1) || (symbolValues.filter(sym => sym === python).length === 1)) && (symbolValues.filter(sym => sym === buggy).length === 3)) {
        updateCredits(400);
    }
    else if (symbolValues.filter(sym => sym === coffee).length === 5) {
        document.getElementById('message').innerHTML = 'You won a free spin! Spinning now...';
        startSpin();
    }
    else if (symbolValues.filter(sym => sym === buggy).length === 4) {//TODO: change this to reflect the any 4 of semicolon, parenthese, curly braces
        updateCredits(300);
    }
    else {
        updateCredits(0);
    }
}

//TODO: perhaps create some functions or quick for loops to do functions for each reel. Gets repetitive

//the onclick function for buttons
function buttonAction(buttonID) {
    const button = document.getElementById(buttonID);

    if (button.classList.contains('multiplier')) {
        const multiplier = parseInt(button.innerHTML, 10);
        useCredits(multiplier); 
        multipliers.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
    else {
        const activeMultiplierButton = document.querySelector('.multiplier.active');
        if (activeMultiplierButton) {
            const activeMultiplier = parseInt(activeMultiplierButton.innerHTML, 10);
            useCredits(activeMultiplier); 
        } else {
            document.getElementById('message').innerHTML = 'Select a multiplier to spin the reels.';
        }
    }
    startSpin();
}