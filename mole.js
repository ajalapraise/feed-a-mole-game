const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 20000;
const SAD_INTERVAL = 500;
const HUNGRY_INTERVAL = 1500;
const wormContainer = document.querySelector(".worm-container");
const dashboard = document.querySelector('.dashboard')
const scoreBox = document.querySelector('#score')
let score = 0;

const getInterval = () =>
  Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);
const getSadInterval = () => Date.now() + SAD_INTERVAL;
const getKingStatus = () => Math.random() > 0.9;
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;

this.el = {
  minutes: document.querySelector(".timer__part--minutes"),
  seconds: document.querySelector(".timer__part--seconds"),
  control: document.querySelector(".start-btn"),
  reset: document.querySelector(".reset-btn")
};

this.interval = null;
this.remainingSeconds = 90;

this.updateInterfaceTime()
this.updateInterfaceControls();

this.el.control.addEventListener('click', () => {
  if (this.interval === null) {
    this.start()
    requestAnimationFrame(nextFrame);
  } else {
    this.stop();

    this.updateInterfaceControls()

  };

});



this.el.reset.addEventListener('click', () => {
  reset()

  //to set time value
  const inputMinutes = 1.5;

  if (inputMinutes < 60) {
    this.stop();
    this.remainingSeconds = inputMinutes * 60;
    this.updateInterfaceTime()
  }

  score = 0
  scoreBox.textContent = `Score: ${score}`;

});

function updateInterfaceTime() {
  const minutes = Math.floor(this.remainingSeconds / 60);
  const seconds = this.remainingSeconds % 60;

  this.el.minutes.textContent = minutes.toString().padStart(2, "0")
  this.el.seconds.textContent = seconds.toString().padStart(2, "0")
}

function updateInterfaceControls() {
  if (this.interval === null) {
    this.el.control.innerHTML = "Start timer";
  } else {
    this.el.control.innerHTML = "Pause timer";
  }
}

function start() {
  if (this.remainingSeconds === 0) return;

  this.interval = setInterval(() => {
    this.remainingSeconds--;
    this.updateInterfaceTime();

    if (this.remainingSeconds === 0) {
      this.stop()
      win()
      document.querySelector('.message').innerHTML = `You win!, your score is ${score}`


    }
  }, 1000)

  this.updateInterfaceControls();

}

function stop() {

  clearInterval(this.interval);
  this.interval = null;

}

function gamePaused() {

}


const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-0")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-1")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-2")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-3")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-4")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-5")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-6")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-7")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-8")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-9")
  }
];

const getNextStatus = mole => {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getSadInterval();
      if (mole.king) {
        mole.node.children[0].src = "./king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./mole-leaving.png";
      }
      mole.status = "leaving";
      break;
    case "leaving":
      mole.next = getInterval();
      mole.king = false;
      mole.node.children[0].classList.toggle("gone", true);
      mole.status = "gone";
      break;
    case "hungry":
      mole.node.children[0].classList.toggle("hungry", false);
      if (mole.king) {
        mole.node.children[0].src = "./king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./mole-sad.png";
      }
      mole.status = "sad";
      mole.next = getSadInterval();
      break;
    case "gone":
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.next = getHungryInterval();
      mole.node.children[0].classList.toggle("hungry", true);
      mole.node.children[0].classList.toggle("gone", false);
      if (mole.king) {
        mole.node.children[0].src = "./king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./mole-hungry.png";
      }
      break;
  }
};

const feed = e => {
  if (e.target.tagName !== "IMG" || !e.target.classList.contains("hungry")) {
    return;
  }

  const mole = moles[+e.target.dataset.index];

  mole.status = "fed";
  mole.next = getSadInterval();
  mole.node.children[0].classList.toggle("hungry", false);
  if (mole.king) {
    mole.node.children[0].src = "./king-mole-fed.png";
    score += 2;
  } else {
    mole.node.children[0].src = "./mole-fed.png";
    score += 1;
  }

  scoreBox.textContent = `Score: ${score} `;




  // if (score >= 100) {
  //   win();
  //   return;
  // }

  // wormContainer.style.width = `${ score }% `;
};

const win = () => {
  document.querySelector(".bg").classList.toggle("hide", true);
  document.querySelector(".win").classList.toggle("show", true);
};

const reset = () => {
  document.querySelector(".bg").classList.toggle("hide", false);
  document.querySelector(".win").classList.toggle("show", false);
  now = 0;
  requestAnimationFrame(nextFrame);
  this.updateInterfaceControls()
}


document.querySelector(".bg").addEventListener("click", feed);

let nextFrame = () => {
  const now = Date.now();
  for (let i = 0; i < moles.length; i++) {
    if (moles[i].next < now) {
      getNextStatus(moles[i]);
    }
  }
  requestAnimationFrame(nextFrame);
};

// requestAnimationFrame(nextFrame);
