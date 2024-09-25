import { useCredits, updateCredits } from './credits.js';

let multiplierSingle = document.getElementById('single');
let multiplierDouble = document.getElementById('double');
let multiplierTriple = document.getElementById('triple');
let multiplierQuadruple = document.getElementById('quadruple');
let multiplierQuintuple = document.getElementById('quintuple');

let spinButton = document.getElementById('spin');

multiplierSingle.addEventListener('click', function() {
    useCredits(multiplierSingle);
    //reels spinning function
});