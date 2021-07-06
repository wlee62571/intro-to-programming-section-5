const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
//const numberOfGuessesMessage = document.getElementById('num-of-guesses'); ID tag misnamed
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
// const attempts = 0; it changes
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  // hideAllMessages(); not yet

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    // Remove too high or too low messages
    tooHighMessage.style.display = 'none';
    tooLowMessage.style.display = 'none'; 
    
    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    // per chase104: add some extra functionality
    if (Number.isInteger(guess)) {
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
        // revision
        tooHighMessage.style.display = 'none';
        //tooLowMessage.style.display = 'none'; show one message
        // revision
      } else {
        // tooLowMessage.style.display = '';
        tooHighMessage.style.display = '';
        // revision
        //tooHighMessage.style.display = 'none'; show one message
        tooLowMessage.style.display = 'none'; 
        // revision
      } 
    } else { // per chase104: if user submits without entering any info, do not +1 to attempts and display a message
      attempts = attempts -1;
      alert("Please enter a value before submitting");
      tooHighMessage.style.display = 'none';
      tooLowMessage.style.display = 'none'; 
    } 

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

//  if (attempts ==== maxNumberOfAttempts) { too many =
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';
  
  resetButton.style.display = '';
}

// per chase104:allow user to submit by pressing "Enter"
// function checkKeypress(e){
//   console.log(e.key === "Enter")
//   if (e.key === "Enter") {
//   checkGuess()
//   }
//   }
const textbox = document.getElementById("guess");
textbox.addEventListener("keypress", function checkKeypress(e) {
  if (e.key === "Enter") {
    document.getElementById("submit").click();
  }
});

function hideAllMessages() {
  //for (let elementIndex = 0; elementIndex <= messages.length; elementIndex++) { not <=
    for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

//funtion setup() { misspell function
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
//  maxNumberOfAttempts = 0; not maxNumber
  attempts = 0;

  // Enable the input and submit button
  // submitButton.disabeld = false; misspelled disabled
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
