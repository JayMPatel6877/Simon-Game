// Array to store the possible button colors
const buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store the sequence of colors selected by the user and the game
let userPattern = [];
let gamePattern = [];

// Variable to track the current level of the game
let level = 0;

// Boolean flag to determine if the game has started
let check = true;

// Event listener for when a button is clicked by the user
$(".button").click(function () {
    // Get the color of the button clicked by the user
    var selectedColor = $(this).attr("id");

    // Add the selected color to the user's pattern
    userPattern.push(selectedColor);

    // Play the sound associated with the selected color
    playSound(selectedColor);

    // Animate the button press to give visual feedback
    animatePress(selectedColor);

    // Check the user's answer against the game's pattern
    checkAnswer(userPattern.length-1);
});

// Event listener for when any key is pressed to start the game
$(document).on("keypress", function(){
    if(check) {
        // Start the game by generating the first sequence
        nextSequence();

        // Set check to false to prevent restarting the game until it ends
        check = false;       
    }
});

// Function to generate the next color in the sequence
function nextSequence() {
    // Increment the level and update the level title
    level++;
    $(".title").text("Level " + level);

    // Generate a random number to select a color from buttonColours
    let randomNum = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNum];

    // Add the chosen color to the game pattern
    gamePattern.push(randomChosenColour);

    // Flash the button of the chosen color to the user
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    // Play the sound associated with the chosen color
    playSound(randomChosenColour);
}

// Function to play the sound corresponding to a color
function playSound(name) {
    // Create a new Audio object with the appropriate sound file
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

// Function to animate the button press
function animatePress(currentColor) {
    // Add the 'pressed' class to the button to change its appearance
    $("#" + currentColor).addClass("pressed");

    // Remove the 'pressed' class after a short delay to return to normal
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Function to check the user's input against the game pattern
function checkAnswer(currentLevel) {
    // Check if the most recent user's input matches the game pattern
    if(userPattern[currentLevel] === gamePattern[currentLevel]) {
        // If the user has completed the pattern correctly, generate the next sequence
        if(userPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);

            // Reset the user's pattern for the next level
            userPattern = [];
        }
    } else {
        // If the user's input is incorrect, end the game
        wrongAns();
    }
}

// Function to handle a wrong answer
function wrongAns() {
    // Play the 'wrong' sound to indicate the mistake
    playSound("wrong");

    // Reset the game and user patterns, as well as the level and check flag
    gamePattern = [];
    userPattern = [];
    check = true;
    level = 0;

    // Update the title to prompt the user to restart the game
    $(".title").text("Game Over, Press Any Key to Restart ");

    // Temporarily change the body's background color to indicate a wrong answer
    $("body").addClass("wrong");
    setTimeout(function(){
        $("body").removeClass("wrong");
    }, 100);
}
