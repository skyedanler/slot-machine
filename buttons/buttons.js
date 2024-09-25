import { useCredits } from '../credits.js';

let multiplierSingle = document.getElementById('single');
let multiplierDouble = document.getElementById('double');
let multiplierTriple = document.getElementById('triple');
let multiplierQuadruple = document.getElementById('quadruple');
let multiplierQuintuple = document.getElementById('quintuple');

let spinButton = document.getElementById('spin');

//listener event for buttons
multiplierSingle.addEventListener('click', function() {
    useCredits(1);
    //reels spinning function
});

multiplierDouble.addEventListener('click', function() {
    useCredits(2);
    //reels spinning function
});

multiplierTriple.addEventListener('click', function() {
    useCredits(3);
    //reels spinning function
});

multiplierQuadruple.addEventListener('click', function() {
    useCredits(4);
    //reels spinning function
});

multiplierQuintuple.addEventListener('click', function() {
    useCredits(5);
    //reels spinning function
});