//updates the credits in the credit box
function updateCredits(newCredits) {
    return document.getElementById('credits').innerText = `${newCredits}`;
};

//subtracts credits depending on multiplier pressed
function useCredits(multiplier) {
    let credits = parseInt(document.getElementById('credits').innerText, 10);

    if (multiplier <= credits) {
        credits -= multiplier;
        return updateCredits(credits);
    } 
    else {
        alert('Not enough credits to play this game.');
        return;
    }
};

module.exports = {useCredits};