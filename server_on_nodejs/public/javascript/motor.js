const motorTable = document.querySelector("#jsRobotArmTable");
const MOTOR_NUMS = 6;
const socket = io(); //load socket.io-client and connect to the host that serves the page

function motorSliderInputHandle(event) {
  const inputTag = event.target;
  const fontTag = inputTag.parentNode.querySelector("font");
  fontTag.innerHTML = inputTag.value;
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

  fontTag.innerText = 0;
  inputTag.min = 0;
  inputTag.max = 255;
  inputTag.value = 0;
  inputTag.step = 1;
  inputTag.id = id;
  inputTag.type = "range";
  inputTag.classList.add("motorSlider");
  inputTag.classList.add("blue");
  inputTag.addEventListener("input", motorSliderInputHandle);
  inputTag.addEventListener("change", motorSliderChangeHandle);

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
