const http = require("http").createServer(httpHandler);
const fs = require("fs"); //require filesystem module
const io = require("socket.io")(http); //require socket.io module and pass the http object (server)
const url = require("url");
const MOTOR_NUMS = 6;
// const START_VALUES = [1350, 700, 1670, 1040, 820, 1100];
const START_VALUES = [370, 375, 440, 280, 190, 175];
const makePwmDriver = require("adafruit-i2c-pwm-driver");
const pwmDriver = makePwmDriver({ address: 0x40, device: "/dev/i2c-1" });
const MOTOR_FREQUENCY = 50;

function setMotors() {
  pwmDriver.setPWMFreq(MOTOR_FREQUENCY);
  for (let i = 0; i < MOTOR_NUMS; i++) {
    pwmDriver.setPWM(i, 0, START_VALUES[i]);
  }
}

function init() {
  setMotors();
  socketInit();
  exitInit();
  http.listen(8080); //listen to port 8080
}

function httpHandler(req, res) {
  var pathName = url.parse(req.url).pathname;
  if (pathName === "/") {
    //what to do on requests to port 8080
    fs.readFile(__dirname + "/index.html", function(err, data) {
      //read file rgb.html in public folder
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" }); //display 404 on error
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" }); //write HTML
      res.write(data); //write data from rgb.html
      return res.end();
    });
  } else if (pathName == "/public/javascript/motor.js") {
    fs.readFile(__dirname + "/public/javascript/motor.js", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (pathName == "/public/image/refresh.png") {
    fs.readFile(__dirname + "/public/image/refresh.png", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (pathName == "/public/css/index.css") {
    fs.readFile(__dirname + "/public/css/index.css", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      return res.end();
    });
  } else {
    return res.end("404 Not Found");
  }
}

function socketInit() {
  io.sockets.on("connection", function(socket) {
    // Web Socket Connection
    socket.on("motor", function(data) {
      console.log(data);
      const value = parseInt(data.value);
      const id = parseInt(data.id);
      pwmDriver.setPWM(id, 0, value);
    });
  });
}

function exitInit() {
  process.on("SIGINT", function() {
    console.log("good bye!");
    for (let i = 0; i < MOTOR_NUMS; i++) {
      pwmDriver.setPWM(i, 0, 0);
    }
    process.exit(); //exit completely
  });
}

init();
