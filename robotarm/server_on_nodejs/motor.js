var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('pigpio').Gpio, //include pigpio to interact with the GPIO
motor1 = new Gpio(13, {mode: Gpio.OUTPUT}),
motor2 = new Gpio(19, {mode: Gpio.OUTPUT}),
motor3 = new Gpio(26, {mode: Gpio.OUTPUT}),
motor4 = new Gpio(16, {mode: Gpio.OUTPUT}),
motor5 = new Gpio(20, {mode: Gpio.OUTPUT}),
motor6 = new Gpio(21, {mode: Gpio.OUTPUT}),
motor1Value = 0,
motor2Value = 0,
motor3Value = 0,
motor4Value = 0,
motor5Value = 0,
motor6Value = 0;

//RESET RGB LED
motor1.digitalWrite(0);
motor2.digitalWrite(0);
motor3.digitalWrite(0);
motor4.digitalWrite(0);
motor5.digitalWrite(0);
motor6.digitalWrite(0);

http.listen(8080); //listen to port 8080

function handler (req, res) { //what to do on requests to port 8080
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file rgb.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from rgb.html
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {// Web Socket Connection
  socket.on('motor', function(data) { //get light switch status from client
    console.log(data); //output data from WebSocket connection to console

    //for common cathode RGB LED 0 is fully off, and 255 is fully on
    motor1Value=parseInt(data[0]);
    motor2Value=parseInt(data[1]);
    motor3Value=parseInt(data[2]);
    motor4Value=parseInt(data[3]);
    motor5Value=parseInt(data[4]);
    motor6Value=parseInt(data[5]);

    motor1.pwmWrite(motor1Value);
    motor2.pwmWrite(motor2Value);
    motor3.pwmWrite(motor3Value);
    motor4.pwmWrite(motor4Value);
    motor5.pwmWrite(motor5Value);
    motor6.pwmWrite(motor6Value);
  });
});

process.on('SIGINT', function () { //on ctrl+c
  motor1.digitalWrite(0);
  motor2.digitalWrite(0);
  motor3.digitalWrite(0);
  motor4.digitalWrite(0);
  motor5.digitalWrite(0);
  motor6.digitalWrite(0);
  
  process.exit(); //exit completely
});