buttonColors = ["green", "red", "yellow", "blue"];
var sequence = [];
var gameLevel = 0;
var gameStarted = false;
var currentSequence = [];

// listen to key press
$(document).on("keypress", function () {
    if (!gameStarted) {
        startGame();
    }
});
// onclick on start button
$("#startBtn").click(function () {
    resetGame();
    startGame();
});

function startGame() {
    generateSequenceUnit();
    gameStarted = true;
}

// function to generate new sequenceUnit and add that in existing sequence 
function generateSequenceUnit() {
    var randomNum = Math.floor(Math.random() * 4);
    // push newly button color based on newly
    // generated random number
    var newSequenceUnit = buttonColors[randomNum];

    // push newly button color based on newly
    // generated random number
    sequence.push(newSequenceUnit);
    
    // animate selected button
    $("#" + newSequenceUnit).fadeOut(100).fadeIn(100);
    playMusic(newSequenceUnit);

    // update game level
    gameLevel += 1;
    // update h1 heading with Level count
    $("h1").text("Level " + gameLevel);

    // update current sequence with latest sequence
    // currentSequence = sequence;
    currentSequence.push(...sequence);
}




// listen to button click
$(".btn").click(function () {
    // console.log(this.id);
    var clickedButtonId = this.id;
    buttonAnimation(clickedButtonId);
    playMusic(clickedButtonId);

    verifyUserResponce(clickedButtonId);
});

// funtion to check if user clicked the corresponding sequenceUnit
function verifyUserResponce(clickedButtonId) {
    if (!gameStarted) {
        // if game is not started
        gameOverError();
    } else if (clickedButtonId != currentSequence[0]) {
        // wrong input
        gameOverError();
    } else if (clickedButtonId === currentSequence[0]) {
        // if the clicked button matches the sequence
        currentSequence.shift();

        if (currentSequence.length === 0) {
            // if the clicked button was the last element in current sequence,
            // next level, Call generateSequenceUnit(),
            // to add new random sequence unit in existing sequence
            // Add delay between nextLevel
            delay(1000, generateSequenceUnit);
        }
    }
}

// wrong input funtion
function gameOverError() {
    playMusic("wrong");

    $("body").addClass("game-over");
    $("h1").text("Game over, Press any Key to restart");

    resetGame();

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
}

//fuction to animate button when pressed
function buttonAnimation(clickedButtonId) {
    $("#" + clickedButtonId).addClass("pressed");
    setTimeout(function () {
        $("#" + clickedButtonId).removeClass("pressed");
    }, 100);

}



//function to play music based on key pressed/ or button clicked
function playMusic(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// delay function
function delay(delayDuration, generateSequenceUnit) {
    setTimeout(function () {
        generateSequenceUnit();
    }, delayDuration);
}

// Reset Game
function resetGame() {
    //resetting veriables to default
    sequence = [];
    gameLevel = 0;
    gameStarted = false;
    currentSequence = [];
}