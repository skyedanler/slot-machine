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
        // reels spinning function can go here
    });
});

spinButton.addEventListener('click', function() {
    useCredits(parseInt(document.querySelector('.multiplier.active').innerHTML, 10));
    //you want to have it useCredits based on last multiplier clicked
});




//credits
function updateCredits(newCredits) {
    return document.getElementById('credits').innerText = `${newCredits}`;
};

function useCredits(multiplier) { //subtracts credits depending on multiplier pressed
    let credits = parseInt(document.getElementById('credits').innerText, 10);

    if (multiplier <= credits) {
        credits -= multiplier;
        updateCredits(credits);
        enoughCredits(credits);
    } 
    else {
        alert('Not enough credits to play this game.');
        return;
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