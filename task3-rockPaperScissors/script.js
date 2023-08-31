let currentRoundNumber = 0;
let scores = {
  robot: {
    win: 0,
    lose: 0,
  },
  me: {
    win: 0,
    lose: 0,
  },
};
let currentRoundGesture = {
  robot: null,
  me: null,
};

/*
    0:  rock
    1:  scissor 
    2:  paper

    0 rock  win  1 scissor   win 2 pape 
*/

const numberToGesture = ["rock", "scissor", "paper"];

function compare(robot, me) {
  return robot === me
    ? 0
    : (robot === 0 && me === 1) ||
      (robot === 1 && me === 2) ||
      (robot === 2 && me === 0)
    ? 1
    : -1;
}
/*
     3局2胜
*/
let TEXT = false;
// TEXT = true;
function* testGenerateGusture1() {
  yield { robot: 0, me: 1 };
  yield { robot: 0, me: 1 };
  yield { robot: 1, me: 0 };
}
const generator = testGenerateGusture1();

function generateRandomGusture() {
  return Math.floor(Math.random() * 3);
}

/*
     update score
*/

const robotWinScoreE = document.querySelector("#robot .win");
const robotLoseScoreE = document.querySelector("#robot .lose");
const meWinScoreE = document.querySelector("#me .win");
const meLoseScoreE = document.querySelector("#me .lose");

function updateScore() {
  robotLoseScoreE.innerHTML = scores.robot.lose;
  robotWinScoreE.innerHTML = scores.robot.win;

  meLoseScoreE.innerHTML = scores.me.lose;
  meWinScoreE.innerHTML = scores.me.win;
}
/*
    update gesture
*/
const robotGestureE = document.querySelector("#robot .gesture");
const meGestureE = document.querySelector("#me .gesture");

function updateGesture() {
  function updateOneGesture(elem, gesture) {
    elem.classList.remove("rock");
    elem.classList.remove("paper");
    elem.classList.remove("scissor");
    elem.classList.add(numberToGesture[gesture]);
  }

  updateOneGesture(robotGestureE, currentRoundGesture.robot);
  updateOneGesture(meGestureE, currentRoundGesture.me);
}
/*
    showCurrentRound
*/
const currentRoundE = document.querySelector("#currentRound");

function updateCurrentRound() {
  currentRoundE.innerHTML = `第${currentRoundNumber}回合（3回合）`;
  currentRoundE.classList.add("show");
}

/* 
    showCurrentRoundResult
    showFinalResult
*/
const resultE = document.querySelector("#result");
function showCurrentRoundResult(result) {
  let info = "";
  if (result === 0) {
    info = "本回合平局";
  } else if (result === 1) {
    info = "本回合机器人赢";
  } else info = "本回合你赢";
  resultE.innerHTML = info;
  resultE.classList.add("show");
}

function showFinalResult() {
  if (scores.robot.win === scores.me.win) {
    info = "不错嘛，平局了";
  } else if (scores.robot.win > scores.me.win) {
    info = "(≧v≦)o~~好棒，恭喜机器人获得胜利！";
  } else info = "(≧v≦)o~~好棒，恭喜你获得胜利！";
  resultE.innerHTML = info;
  resultE.classList.add("show");
}
/* hidden next Round
 */

function hiddenNextRound() {
  nextRoundBtn.classList.remove("show");
}
/*
    show dialog
    choose gesture
    comfirm
    calculate
    re-render
*/
const nextRoundBtn = document.querySelector("#nextRound");
const gestureChoose = document.querySelector("#gestureChoose");
const selectE = document.querySelector("#gestureChoose select");
const comfirmBtn = document.querySelector("#comfirmBtn");

nextRoundBtn.addEventListener("click", (e) => {
  gestureChoose.showModal();
});
selectE.addEventListener("change", (e) => {
  comfirmBtn.value = selectE.value;
});
gestureChoose.addEventListener("close", (e) => {
  /* calculate */
  currentRoundGesture.me = Number(gestureChoose.returnValue);
  currentRoundGesture.robot = generateRandomGusture();

  if (TEXT) {
    currentRoundGesture = generator.next().value;
  }
  console.log(currentRoundGesture);
  const result = compare(currentRoundGesture.robot, currentRoundGesture.me);
  if (result === 1) {
    scores.robot.win++;
    scores.me.lose++;
  } else if (result === -1) {
    scores.me.win++;
    scores.robot.lose++;
  }
  currentRoundNumber++;

  /* re-render */
  updateScore();
  updateGesture();
  updateCurrentRound();

  if (
    currentRoundNumber === 3 ||
    scores.robot.win === 2 ||
    scores.me.win === 2
  ) {
    showFinalResult();
    hiddenNextRound();
  } else {
    showCurrentRoundResult(result);
  }
});
