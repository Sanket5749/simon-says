let h2 = document.querySelector("h2");
let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "orange", "green"];

let started = false;
let level = 0;
let highScore = 0;

document.addEventListener('keypress', function () {
  if (started == false) {
    console.log("game is started");
    started = true;
  }
  levelUp();
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  highScore++;
  h2.innerText = `level ${level}`;
  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randombtn = document.querySelector(`.${randomColor}`);
  btnFlash(randombtn);
  gameSeq.push(randomColor);
}

function checkResult(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    document.querySelector('body').style.backgroundColor = 'red';
    setTimeout(function() {
        document.querySelector('body').style.backgroundColor = "white";
    }, 300);
    h2.innerHTML = `Game Over! Your Score is <b>${level}</b><br> High Score is <b>${highScore}</b> Press any key to start`;
    restart();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log(userSeq);

  checkResult(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
function restart(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}