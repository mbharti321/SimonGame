var sequence = [];
var gameLevel = 0;
var gameStarted = false;
var currentSequence = [];

// listen to key press
$(document).on("keypress", function () {
    if (!gameStarted) {
        generateSequenceUnit();
        gameStarted = true;
    }
});

// function to generate new sequenceUnit and add that in existing sequence 
function generateSequenceUnit() {
    var randomNum = Math.floor(Math.random() * 4);
    var newSequenceUnit = "";

    // push newly button color based on newly
    // generated random number
    switch (randomNum) {
        case 0:
            newSequenceUnit = "green";
            break;
        case 1:
            newSequenceUnit = "red";
            break;
        case 2:
            newSequenceUnit = "yellow";
            break;
        case 3:
            newSequenceUnit = "blue";
            break;
        default:
            console.log(randomNum)
    }
    // push newly button color based on newly
    // generated random number
    sequence.push(newSequenceUnit);
    // console.log(newSequenceUnit);
    // console.log(sequence);

    buttonAnimation(newSequenceUnit);

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
    playMusic("error");

    $("body").addClass("game-over");
    $("h1").text("Press A Key to Start");

    //resetting veriables to default
    sequence = [];
    gameLevel = 0;
    gameStarted = false;
    currentSequence = [];

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
function playMusic(key) {
    switch (key) {
        case "green":
            var greenMusic = new Audio("sounds/green.mp3");
            greenMusic.play();
            break;
        case "red":
            var redMusic = new Audio("sounds/red.mp3");
            redMusic.play();
            break;
        case "yellow":
            var yellowMusic = new Audio("sounds/yellow.mp3");
            yellowMusic.play();
            break;
        case "blue":
            var blueMusic = new Audio("sounds/blue.mp3");
            blueMusic.play();
            break;
        case "error":
            var errorMusic = new Audio("sounds/wrong.mp3");
            errorMusic.play();
            break;

        default:
            console.log(key);
    }
}


// delay function
function delay(delayDuration, generateSequenceUnit) {
    setTimeout(function () {
        generateSequenceUnit();
    }, delayDuration);
}