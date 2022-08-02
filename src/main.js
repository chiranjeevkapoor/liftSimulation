const numOfFloors = document.getElementById("floors");
const numOfLifts = document.getElementById("lifts");
const generatorButton = document.getElementById("generator");
const output = document.getElementById("output");

generatorButton.addEventListener("click", () => {
  if (numOfFloors.value >= 1 && numOfLifts.value >= 1) {
    output.innerHTML = floorsGenerator(numOfFloors.value);
  } else {
    output.innerHTML = `<p>Wrong input, pls try again</p>`;
  }
});

function floorsGenerator(totalNumOfFloors) {
  let generatedFloors = ``;
  for (let i = totalNumOfFloors - 1; i >= 0; i--) {
    generatedFloors += `<div class='floorcontainer' data-floorContainer="${i}"><div class="wrapper">
        
                <div class="lift-btns">
                    <button class="move btn-up" data-floor="${i}">UP</button>
                    <button class="move btn-up" data-floor="${i}">DOWN</button>
                </div>

                <div class="lift-container">
                ${i === 0 ? liftGenerator(numOfLifts.value) : ""}
                </div>
            </div>

            <div class="floor">
                <div class="floor-line"></div>
                <div class="floor-num-text">
                    Floor:<span class="floor-num">${i}</span>
                </div>
            </div>
        </div>`;
  }
  return generatedFloors;
}

function liftGenerator(totalNumOfLifts) {
  let generatedLifts = ``;
  for (let i = 0; i < totalNumOfLifts; i++) {
    generatedLifts += `<div class="lift" data-liftposition="${i}">
          <div class="left-door"></div>
          <div class="right-door"></div>
        </div>`;
  }
  return generatedLifts;
}

let currentFloor = 0;

addEventListener("click", (e) => {
  if (e.target.classList.contains("move")) {
    if (e.target.dataset.floor == currentFloor) {
      return;
    } else {
      checkLift(e.target.dataset.floor);
    }
    currentFloor = e.target.dataset.floor;
  }
});

function checkLift(targetFloor) {
  const allLift = Array.from(document.getElementsByClassName("lift"));
  for (let index = 0; index < allLift.length; index++) {
    if (!allLift[index].classList.contains("inuse")) {
      startLift(targetFloor, allLift[index]);
      return;
    }
  }
}

function startLift(targetFloor, notInUse) {
  const currentPosition = notInUse.dataset.liftposition;
  const time = Math.abs(targetFloor - currentPosition);
  notInUse.style.transition = `transform ${time * 2}s linear`;
  notInUse.style.transform = `translateY(${-130 * targetFloor}px)`;
  notInUse.classList.add("inuse");
  notInUse.dataset.liftposition = targetFloor;
  setTimeout(() => {
    notInUse.children[0].classList.add("move-left");
    notInUse.children[1].classList.add("move-right");
  }, time * 2000 + 1000);
  setTimeout(() => {
    notInUse.children[0].classList.remove("move-left");
    notInUse.children[1].classList.remove("move-right");
  }, time * 2000 + 4000);

  setTimeout(() => {
    notInUse.classList.remove("inuse");
  }, time * 2000 + 6000);
}
