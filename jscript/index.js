const buttonColours = ["red", "blue", "green", "yellow"];

let userPattern = [];
let gamePattern = [];
let level = 0;
let check = true;

$(".button").click(function () {
    var selectedColor = $(this).attr("id");
    userPattern.push(selectedColor);
    playSound(selectedColor);
    animatePress(selectedColor);
    checkAnswer(userPattern.length-1);
});

$('body').on("keypress", function(){
    if(check)
    {
        nextSequence();
        check = false;       
    }
});

function nextSequence(){
    level++;
    $(".title").text("Level " + level);
    let randomNum = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel){
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            userPattern = [];
        }
    }else{
        wrongAns();
    }
}

function wrongAns(){
    playSound("wrong");
    gamePattern = [];
    userPattern = [];
    check = true;
    level = 0;
    $(".title").text("Game Over, Press Any Key to Restart ");
    $("body").addClass("wrong");
    setTimeout(function(){
        $("body").removeClass("wrong")
    }, 100);
}