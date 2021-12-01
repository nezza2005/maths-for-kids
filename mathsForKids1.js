//Globals
//localStorage to keep track o score regardless of which html page is clicked on.
let count = Number(localStorage.getItem("star-score"));
let value = document.querySelector(".star-number").textContent = count + "/100";
//Arrays
const arrLength = 10;
let randomArr = [];
//Dom targets
const stars = document.getElementById("stars");
const pages = document.querySelectorAll(".pages a");

//generate random numbers and push to randomArr.
function createRandomNumbers() {
  for (let i=0; i<arrLength; i++) {
    randomArr.push(Math.floor(Math.random() * 10))
  }
}
createRandomNumbers();

//Calculate equation depending on what HTMLpage you are on.
function mathoperators() {
  const num1 = document.getElementById("num1").textContent = randomArr[0];
  const num2 = document.getElementById("num2").textContent = randomArr[1];
  if (document.querySelector(".wrapper div").children[1].textContent == "+") {
    return num1 + num2;
  } else if (document.querySelector(".wrapper div").children[1].textContent == "-") {
    return num1 - num2;
  } else if (document.querySelector(".wrapper div").children[1].textContent == "*") {
    return num1 * num2;
  } else if (document.querySelector(".wrapper div").children[1].textContent == "/") {
    return Math.floor(num1 / num2) // find a way to produceonly equations that give an interger number, no decimals.;
  }
}

let randomArr1 = randomArr.filter(number => number !== mathoperators()); //avoid correct answer duplicates.

function createAnswers() {
  //Multiple choice answers
  let option1 = document.getElementById("option1").textContent = randomArr1[0] + randomArr1[1];
  let option2 = document.getElementById("option2").textContent = randomArr1[2] + randomArr1[4];
  let option3 = document.getElementById("option3").textContent = randomArr1[4] + randomArr1[6];
  //Places the correct asnwer randomy within the 3 multiple choice answers.
  const correctAnswerPosition = Math.floor(Math.random() * 3);
  document.querySelectorAll(".options h1")[correctAnswerPosition].textContent = mathoperators();
}
createAnswers();

//What do to if you pick right or wrong answer.
for (let a=0; a<document.querySelectorAll(".options").length; a++) {
//targets the 3 divs that contain random incorrect answers plus correct answer.
document.querySelectorAll(".options")[a].addEventListener("click", function chooseAnswer() {
const number = parseFloat(this.textContent)
  if (mathoperators() === number) {
    keepScore();
    // count++;
    const correct = new Audio("Sounds/correct.mp3");
    correct.play();
    document.querySelector(".wrapper").style.display="none";
    document.querySelector(".well-done").style.display="block";
    randomArr = [];

    setTimeout(function() {
      createRandomNumbers();
      createAnswers();
      document.querySelector(".wrapper").style.display="grid";
      document.querySelector(".well-done").style.display="none";
      starsGained();
    }, 1000);
  } else {
    const incorrect = new Audio("Sounds/incorrect.mp3");
    incorrect.play();
  }
})
}

//stars gained
function starsGained() {
  // resetStars()
  if (count === 100) {
    //reset score to 0.
    document.querySelector(".star-number").textContent = "0/100";
//Display well done completion message.
    document.querySelector(".wrapper").style.display="none";
    document.querySelector(".well-done").style.display="none";
    document.querySelector(".all-stars").style.display="block"
//restart game at zero score.
    setTimeout(function() {
      resetScore();
    }, 3000);

  } else if (count === 1) {
    document.querySelector(".star-number").textContent = count + "/100";
    document.querySelector(".wrapper").style.display="none";
    document.querySelector(".info").style.display="block"

  } else if (count === 10) {
    document.querySelector(".star-number").textContent = count + "/100";
    document.querySelector(".wrapper").style.display="none";
    document.querySelector(".info").style.display="block"
    document.querySelector(".info").textContent="10 stars, keep going!"
    setTimeout(function() {
      document.querySelector(".info").style.display="none"
      document.querySelector(".wrapper").style.display="grid";
    }, 2000);

  } else if (count === 50) {
    document.querySelector(".star-number").textContent = count + "/100";
    document.querySelector(".wrapper").style.display="none";
    document.querySelector(".info").style.display="block"
    document.querySelector(".info").textContent="Half way to that TREAT!!"
    setTimeout(function() {
      document.querySelector(".info").style.display="none"
      document.querySelector(".wrapper").style.display="grid";
    }, 2000);

  } else if (count >0) {
    document.querySelector(".star-number").textContent = count + "/100";
  }
}

//Keeps star score depsite clicking on different html pages by using local storage.
function keepScore(){

  localStorage.setItem("star-score", ++count);
  console.log(count);
}

//Resets star score at any time by deleting item saved in local storage.
function resetScore() {
  window.localStorage.removeItem("star-score");
  document.querySelector(".star-number").textContent = "0/100";
  location.reload();
}

function returnToPlay() {
  document.querySelector(".wrapper").style.display="grid";
  document.querySelector(".well-done").style.display="none";
  document.querySelector(".all-stars").style.display="none"
  document.querySelector(".info").style.display="none"
}



//Listeners
document.querySelector(".small-star").addEventListener("click", resetScore);
document.querySelector(".info a").addEventListener("click", returnToPlay);














//What i have learned.
//how to add an item to the local storage, and manipulate as needed.
//Do not add the random number code to a variable, this just saves one random number only, this is no good if you want to record and push multiple diferent random numbers.




//Alternative way to push muliple random numbers into an array but i dont understand how it works.
// while (numberArray.length <10) {
//
//   if (numberArray.indexOf(randomNum) === -1) numberArray.push(randomNum);
// }
