const motorTable = document.querySelector("#jsRobotArmTable");
const MOTOR_NUMS = 6;
const socket = io(); //load socket.io-client and connect to the host that serves the page
const MIN_VALUES = [0, 105, 280, 120, 120, 90];
const MAX_VALUES = [1000, 475, 460, 445, 280, 290];
const START_VALUES = [370, 375, 440, 280, 190, 175];
// const MIN_VALUES = [0, 0, 0, 0, 0, 0];
// const MAX_VALUES = [2000, 2000, 2000, 2000, 2000, 2000];
// const START_VALUES = [1350, 700, 1670, 1040, 820, 1100];
const robotArmRefresh = document.querySelector("#jsRobotArmRefresh");
const motorControllers = [];

function handleChangeMotorValue(event) {
  event.preventDefault();
  const inputTag = event.target;
  const id = inputTag.id;
  const value = inputTag.value;
  const motorController = motorControllers[id];

  setMotorValue(id, value);
  sendMotorObj(motorController);
}

function sendMotorObj(motorController) {
  console.log(motorController.motorValueObj);
  socket.emit("motor", motorController.motorValueObj);
}

function getController(id) {
  const pTag = document.createElement("p");
  const sliderTag = document.createElement("input");
  const numberInputTag = document.createElement("input");

  pTag.appendChild(numberInputTag);
  pTag.appendChild(sliderTag);

  numberInputTag.value = START_VALUES[id];
  numberInputTag.type = "number";
  numberInputTag.classList.add("motorNumber");
  numberInputTag.id = id;
  numberInputTag.addEventListener("change", handleChangeMotorValue);
  sliderTag.min = MIN_VALUES[id];
  sliderTag.max = MAX_VALUES[id];
  sliderTag.value = START_VALUES[id];
  sliderTag.step = 1;
  sliderTag.id = id;
  sliderTag.type = "range";
  sliderTag.classList.add("motorSlider");
  sliderTag.classList.add("blue");
  sliderTag.addEventListener("input", handleChangeMotorValue);

  let motorObj = {
    sliderTag,
    numberInputTag,
    motorValueObj: {
      id,
      value: 0
    }
  };
  motorControllers.push(motorObj);

  return pTag;
}

function paintControllers() {
  var i;
  for (i = 0; i < MOTOR_NUMS; i++) {
    const pTag = getController(i);
    motorTable.appendChild(pTag);
  }
}

function setMotorValue(id, value) {
  const motorController = motorControllers[id];

  motorController.motorValueObj.value = value;
  motorController.sliderTag.value = value;
  motorController.numberInputTag.value = value;

  motorController.numberInputTag.classList.add("twinkle");
  setTimeout(twinkleText, 1000, motorController.numberInputTag, "twinkle");
}

function twinkleText(tag, animation) {
  tag.classList.remove(animation);
}

function init() {
  paintControllers();
  robotArmRefresh.addEventListener("click", event => {
    event.preventDefault();
    for (let i = 0; i < MOTOR_NUMS; i++) {
      setMotorValue(i, START_VALUES[i]);
      sendMotorObj(motorControllers[i]);
    }
  });
}

init();
