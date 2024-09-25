let credit_box = document.getElementById('credits');
let credits = credit_box.innerText;

//updates the credits in the credit box
function updateCredits(newCredits) {
    return credit_box.innerText = `${newCredits}`;
}

//subtracts credits depending on multiplier pressed
function useCredits(multiplier) {
    if (multiplier === 1) {
        credits -= 20;
    } 
    else if (multiplier === 2) {
        credits -= 40;
    }
    else if (multiplier === 3) {
        credits -= 60;
    }
    else if (multiplier === 4) {
        credits -= 80;
    }
    else {
        credits -= 100;
    }
    return updateCredits(credits);
}