#include <Adafruit_NeoPixel.h> //include the Neo Pixel library

int inputPin = 0; //location of the potentiometer
int outputPin = 6; //location of the addressable LEDs
int knobVal; //value read from the potentiometer, 0 - 1023
int stripVal; //knob value adjusted to the LEDs, 0 - 12
Adafruit_NeoPixel strip = Adafruit_NeoPixel(12, outputPin, NEO_GRB + NEO_KHZ800); //LED variable

void setup() {
  // put your setup code here, to run once:
  strip.begin(); //initialize the LEDs
  strip.show(); //set all LEDs to black
}

void loop() {
  // put your main code here, to run repeatedly:
  knobVal = analogRead(inputPin); //read value from potentiometer
  stripVal = floor(map(knobVal, 0, 1023, 0, 13)); //convert knob value to 0 - 12
  addLed(stripVal); //turn on the appropriate number of LEDs
}

void addLed(int ledLimit) {

  //set all LEDs to black
  for (int i = 0; i < 12; i++) {
    strip.setPixelColor(i, strip.Color(0, 0, 0));
    strip.show();
  }

  //turn on the number of LEDs as specified by the potentiometer
  for (int i = 0; i < ledLimit; i++) {
    if (ledLimit == 0) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.show();
    } else if (ledLimit == 1) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.show();
    } else if (ledLimit == 2) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.show();
    } else if (ledLimit == 3) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.show();
    } else if (ledLimit == 4) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 0, 255));
      strip.show();
    } else if (ledLimit == 5) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 0, 255));
      strip.setPixelColor(5, strip.Color(255, 0, 0));
      strip.show();
    } else if (ledLimit == 6) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 0, 255));
      strip.setPixelColor(5, strip.Color(255, 0, 0));
      strip.setPixelColor(6, strip.Color(255, 127, 0));
      strip.show();
    } else if (ledLimit == 7) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 0, 255));
      strip.setPixelColor(5, strip.Color(255, 0, 0));
      strip.setPixelColor(6, strip.Color(255, 127, 0));
      strip.setPixelColor(7, strip.Color(255, 255, 0));
      strip.show();
    } else if (ledLimit == 8) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 0, 255));
      strip.setPixelColor(5, strip.Color(255, 0, 0));
      strip.setPixelColor(6, strip.Color(255, 127, 0));
      strip.setPixelColor(7, strip.Color(255, 255, 0));
      strip.setPixelColor(8, strip.Color(0, 255, 0));
      strip.show();
    } else if (ledLimit == 9) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 0, 255));
      strip.setPixelColor(5, strip.Color(255, 0, 0));
      strip.setPixelColor(6, strip.Color(255, 127, 0));
      strip.setPixelColor(7, strip.Color(255, 255, 0));
      strip.setPixelColor(8, strip.Color(0, 255, 0));
      strip.setPixelColor(9, strip.Color(0, 0, 255));
      strip.show();
    } else if (ledLimit == 10) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 0, 255));
      strip.setPixelColor(5, strip.Color(255, 0, 0));
      strip.setPixelColor(6, strip.Color(255, 127, 0));
      strip.setPixelColor(7, strip.Color(255, 255, 0));
      strip.setPixelColor(8, strip.Color(0, 255, 0));
      strip.setPixelColor(9, strip.Color(0, 0, 255));
      strip.setPixelColor(10, strip.Color(255, 0, 0));
      strip.show();
    } else if (ledLimit == 11) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 0, 255));
      strip.setPixelColor(5, strip.Color(255, 0, 0));
      strip.setPixelColor(6, strip.Color(255, 127, 0));
      strip.setPixelColor(7, strip.Color(255, 255, 0));
      strip.setPixelColor(8, strip.Color(0, 255, 0));
      strip.setPixelColor(9, strip.Color(0, 0, 255));
      strip.setPixelColor(10, strip.Color(255, 0, 0));
      strip.setPixelColor(11, strip.Color(255, 127, 0));
      strip.show();
    } else if (ledLimit == 12) {
      strip.setPixelColor(0, strip.Color(255, 0, 0));
      strip.setPixelColor(1, strip.Color(255, 127, 0));
      strip.setPixelColor(2, strip.Color(255, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 0, 255));
      strip.setPixelColor(5, strip.Color(255, 0, 0));
      strip.setPixelColor(6, strip.Color(255, 127, 0));
      strip.setPixelColor(7, strip.Color(255, 255, 0));
      strip.setPixelColor(8, strip.Color(0, 255, 0));
      strip.setPixelColor(9, strip.Color(0, 0, 255));
      strip.setPixelColor(10, strip.Color(255, 0, 0));
      strip.setPixelColor(11, strip.Color(255, 127, 0));
      strip.setPixelColor(12, strip.Color(255, 255, 0));
      strip.show();
    }
  }
}

