import serial
import time
from flask import Flask

app = Flask(__name__)

# Change 'COM8' to the correct COM port for your system
arduino = None

# Initialize the Arduino serial connection
def init_arduino():
    global arduino
    retries = 5
    while retries > 0:
        try:
            arduino = serial.Serial('COM9', 9600, timeout=1)  # Adjust COM port
            print("Connected to Arduino successfully!")
            return True
        except serial.SerialException as e:
            print(f"Error connecting to Arduino: {e}")
            retries -= 1
            print(f"Retrying... ({5 - retries} attempts left)")
            time.sleep(2)  # Wait for 2 seconds before retrying
    return False

@app.route('/on', methods=['GET'])
def turn_on():
    if arduino:
        arduino.write(b'1')  # Send '1' to Arduino to turn on the LED
        return "LED turned ON!"
    else:
        return "Failed to connect to Arduino"

@app.route('/off', methods=['GET'])
def turn_off():
    if arduino:
        arduino.write(b'0')  # Send '0' to Arduino to turn off the LED
        return "LED turned OFF!"
    else:
        return "Failed to connect to Arduino"

if __name__ == '__main__':
    if init_arduino():  # Only start the Flask app if Arduino is successfully connected
        app.run(debug=True, host="0.0.0.0", port=5000)  # Flask app runs on http://127.0.0.1:5000
    else:
        print("Could not initialize Arduino. Flask app not started.")
