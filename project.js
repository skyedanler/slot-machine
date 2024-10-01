let spinButton = document.getElementById('spin');

let lastMultiplierClicked = null;
const multipliers = document.querySelectorAll('.multiplier');

let reelIndices = {
    reel1: 0,
    reel2: 0,
    reel3: 0,
    reel4: 0,
    reel5: 0,
}

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


let symbolCombo = []; //the combination to be gone through when reels stop
//function to spin the reels
/*This function is displaying the reel as it spins. The problem is, does this reel stay after it's done? because reel in itself is local to the function.*/
function spinReel(reel, reelName) {
    let reelArray = [];
    let startIndex = reelIndices[reelName];
   
    reelArray.push(reel[startIndex]);
    reelArray.push(reel[(startIndex+1) >= reel.length ? 0 : startIndex + 1]);
    reelArray.push(reel[(startIndex+2) >= reel.length ? (startIndex + 2) - reel.length : startIndex + 2]);
    console.log("reel array: " + reelArray);
    reelIndices[reelName] += 1;
    if (reelIndices[reelName] >= reel.length) {
        reelIndices[reelName] = 0;
    }
    console.log("starting index: " + startIndex);
    displayReel(document.getElementById(reelName), reelArray);
    return startIndex; //this should work because it will keep updating but will be finalized after last spin of reel
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
    }, 3000);
}

function startSpin() {//this function will start the spinning action for all reels as well as stop them.
    startReels();
    stopReels();
}


//create array of the five symbol combination it lands on for use in wonCredits
//function to updateCredits based on combination win/not win
function wonCredits(symbolCombo) {
    
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
            document.getElementById('cant-spin').innerHTML = 'Select a multiplier to spin the reels.';
        }
    }
    startSpin();
}