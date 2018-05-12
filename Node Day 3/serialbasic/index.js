var com = require("serialport");

var serialPort = new com.SerialPort("/dev/tty.usbmodem143721", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });

serialPort.on('open',function() {
  console.log('Port open');
});

serialPort.on('data', function(data) {
  console.log(data);
});
