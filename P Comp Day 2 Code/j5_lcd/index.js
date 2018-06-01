var five = require("johnny-five"),
  board, lcd;

board = new five.Board();

board.on("ready", function() {


  //configure the j5 LCD
  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 12  11   5   4   3   2
    pins: [12, 11, 5, 4, 3, 2],
    backlight: 6,
    rows: 2,
    cols: 16
  });

  // Tell the LCD you will use these characters:
  lcd.useChar("runninga");

  // lcd.clear();
  // lcd.cursor(0, 0);
  // lcd.print(":runninga:");

  for (let i = 0; i < 16; i++) {
    this.wait(500, function() {
      lcd.clear().cursor(0, i).print(":runninga:");
    });
  }

  this.repl.inject({
    lcd: lcd
  });
});