let credit_box = document.getElementById('credits');
let credits = 1000;

function updateCredits(newCredits) {
    credit_box.innerText = `${newCredits}`;
}

//function that subtracts credits depending on multiplier pressed
function useCredits(multiplier) {
    if (multiplier == multiplierSingle) {
        credits -= 20;
    } 
    else if (multiplier == multiplierDouble) {
        credits -= 40;
    }
    else if (multiplier == multiplierTriple) {
        credits -= 60;
    }
    else if (multiplier == multiplierQuadruple) {
        credits -= 80;
    }
    else {
        credits -= 100;
    }
    updateCredits(credits);
}