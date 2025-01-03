// Import necessary modules
const express = require('express');
const path = require('path');
const { SerialPort } = require('serialport'); // Import SerialPort from 'serialport'

// Initialize the Express app
const app = express();
const port = 3000; // Server port

// Initialize the SerialPort connection
const arduinoPort = new SerialPort({
  path: 'COM9', // Change this to the correct port
  baudRate: 9600,
});

// Open the port
arduinoPort.on('open', () => {
  console.log('Serial Port Opened');
});

// Handle errors
arduinoPort.on('error', (err) => {
  console.error('Error:', err.message);
});

// Serve static files like HTML, CSS, and JS
app.use(express.static(path.join(__dirname, 'public')));

// Handle the '/led/on' route to turn on the LED
app.get('/led/on', (req, res) => {
  arduinoPort.write('1', (err) => {  // Send '1' to Arduino to turn the LED on
    if (err) {
      return res.status(500).send('Error turning on the LED');
    }
    //res.send('LED is ON');
  });
});

// Handle the '/led/off' route to turn off the LED
app.get('/led/off', (req, res) => {
  arduinoPort.write('0', (err) => {  // Send '0' to Arduino to turn the LED off
    if (err) {
      return res.status(500).send('Error turning off the LED');
    }
    //res.send('LED is OFF');
  });
});

// Handle the root route to serve your HTML page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
