var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern=[];
var st=false;
var level=0;
$(document).keydown(function(){
  if(!st){
   $("#level-title").text("Level " + level);
  nextSequence();
  st=true;

}
});





function nextSequence() {
  userPattern=[];
   level++;
  $("h1").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
}
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  st = false;
}


$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userPattern.length-1);
})
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {



      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      playSound("wrong");
      $("h1").text("Game Over, Press Any Key to Restart");
      st=true;
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();

    }

}
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(colour){
  $("#"+colour).addClass("pressed");
  setTimeout(function(){
    $("#"+colour).removeClass("pressed");
  },100);
}
