const motorTable = document.querySelector("#jsRobotArmTable");
const MOTOR_NUMS = 6;
const socket = io(); //load socket.io-client and connect to the host that serves the page
const MIN_VALUES = [0, 105, 280, 120, 120, 90];
const MAX_VALUES = [1000, 475, 460, 445, 280, 290];
const START_VALUES = [370, 375, 440, 280, 190, 175];

function motorSliderInputHandle(event) {
  const inputTag = event.target;
  const fontTag = inputTag.parentNode.querySelector("font");
  fontTag.innerHTML = inputTag.value;

  // const inputTag = event.target;
  motorValueObj = {
    id: inputTag.id,
    value: inputTag.value
  };
  console.log(motorValueObj);
  socket.emit("motor", motorValueObj);
}

function motorSliderChangeHandle(event) {
  const inputTag = event.target;
  motorValueObj = {
    id: inputTag.id,
    value: inputTag.value
  };
  console.log(motorValueObj);
  socket.emit("motor", motorValueObj);
}

function getController(id) {
  const pTag = document.createElement("p");
  const fontTag = document.createElement("font");
  const inputTag = document.createElement("input");

  pTag.appendChild(fontTag);
  pTag.appendChild(inputTag);

  fontTag.innerText = START_VALUES[id];
  inputTag.min = MIN_VALUES[id];
  inputTag.max = MAX_VALUES[id];
  inputTag.value = START_VALUES[id];
  inputTag.step = 1;
  inputTag.id = id;
  inputTag.type = "range";
  inputTag.classList.add("motorSlider");
  inputTag.classList.add("blue");
  inputTag.addEventListener("input", motorSliderInputHandle);
  // inputTag.addEventListener("change", motorSliderChangeHandle);

  return pTag;
}

function paintControllers() {
  var i;
  for (i = 0; i < MOTOR_NUMS; i++) {
    const pTag = getController(i);
    motorTable.appendChild(pTag);
  }
}

function init() {
  paintControllers();
}

init();
