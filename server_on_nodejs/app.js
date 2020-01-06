const http = require("http").createServer(httpHandler);
const fs = require("fs"); //require filesystem module
const io = require("socket.io")(http); //require socket.io module and pass the http object (server)
const Gpio = require("pigpio").Gpio; //include pigpio to interact with the GPIO
const url = require("url");
const GPIO_NUMS = [13, 19, 26, 16, 20, 21];
const motors = [];

function setMotors() {
  GPIO_NUMS.forEach(function(num) {
    const motorObj = {
      gpio: new Gpio(num, { mode: Gpio.OUTPUT }),
      value: 0
    };
    motorObj.gpio.digitalWrite(0);
    motors.push(motorObj);
  });
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
      const motor = motors[id];
      motor.value = value;
      motor.gpio.pwmWrite(value);
      console.log(motor);
    });
  });
}

function exitInit() {
  process.on("SIGINT", function() {
    console.log("good bye!");
    motors.forEach(function(motor) {
      motor.gpio.digitalWrite(0);
    });
    process.exit(); //exit completely
  });
}

init();
