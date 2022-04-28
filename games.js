//-------------------- arrays --------------------
//1.3. At the top of file, create a new array buttonColours to hold the sequence "red", "blue", "green", "yellow"
var buttonColours = ["red", "blue", "green", "yellow"];
//1.5. Create a new empty array called gamePattern
var gamePattern = [];
//3.3. Create a new empty array:
var userClickedPattern = [];
//-------------------- variables --------------------
//6.3. Keep track of whether the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//6.2. Create a new variable called level and start at level 0.
var level = 0;

//-----------------------------------------------

//6.1. Use jQuery to detect when a keyboard key has been pressed for the first time and call nextSequence().

$(document).keypress(function () {
  if (!started) {
    //6.4. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//-----------------------------------------------

//3.1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  //3.2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked
  var userChosenColour = $(this).attr("id");
  //3.4. Add the contents of the variable userChosenColour to the end of userClickedPattern
  userClickedPattern.push(userChosenColour);
  //4.1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //7.2. Call checkAnswer() after a user has clicked, passing in the index of the last answer in userClickedPattern
  checkAnswer(userClickedPattern.length - 1);
});

//--------------------- functions ----------------------

//7.1. Create a new function checkAnswer(), to take one input named currentLevel
function checkAnswer(currentLevel) {
  //7.3. Check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //7.4. Check if the user finished the sequence
    if (userClickedPattern.length === gamePattern.length) {
      //7.5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //8.1. Play the sound wrong.mp3 (sounds folder) if the user got the answer wrong.
    playSound("wrong");
    //8.2. Apply "game-over" class (styles.css file) to the body of the website when the user gets the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    //8.3. Change the h1 title if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    //9.2. Call startOver() when the user gets the sequence wrong.
    startOver();
  }
}

//-------------------------------------------

//1.1 create a new function called nextSequence()
function nextSequence() {
  //7.6. Reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];
  //6.5. Increase the level by 1 every time nextSequence() is called.
  level++;
  //6.6. Update the h1 with the change in the value of level.
  $("#level-title").text("Level " + level);
  //1.2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);
  //1.4. Create a new variable called randomChosenColour and use the randomNumber to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];
  //6. Add the new randomChosenColour generated in 1.4. to the end of  gamePattern array.
  gamePattern.push(randomChosenColour);
  //2.1. Use JQuery to select the button with the same id as the randomChosenColor
  //2.2. Use JQuery to animate a flash to the selected Button
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //2.3. Use JavaScript to play the sound for the button colour selected
  playSound(randomChosenColour);
}

//-------------------------------------------

//5.1. Create a new function called animatePress() to take a single input parameter called currentColour.
function animatePress(currentColor) {
  //5.2.Use jQuery to add this pressed class to the button that gets clicked
  $("#" + currentColor).addClass("pressed");
  //5.3. Use Javascript to remove the pressed class after a 100 milliseconds
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//-------------------------------------------

//4.2.Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  //4.3. Add the code used to play sound in nextSequence()
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//-------------------------------------------

//9.1. Create a new function called startOver()
function startOver() {
  //9.3. Reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
