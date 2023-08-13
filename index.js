let userClickedPattern = []; //User

let level = 0;

let score = 0;

let started = false;

let gamePattern = []; // The Computer

let buttonColours = ["red", "blue", "green", "yellow"];

//  Event Listeners ***********
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playsound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//  Answer Checking

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html(
      "Game   Over, Press Any Key To Restart <br> Your Score: " + level
    );
    if (score <= level) {
      score = level;
      $("h2").text("Highest Score: " + score + "   ");
    }
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  ++level;
  $("#level-title").text("Level  " + level);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomColourChoosen = buttonColours[randomNumber];
  gamePattern.push(randomColourChoosen);

  $("#" + randomColourChoosen)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomColourChoosen);
}
// Sounds ****************************

function playsound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animation ****************************

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
