# IOT-Project
Determine trespassing with a light sensor

# Description
We are using a light sensor and a laser pointer to determine if an area was trespassed. We make a serial connection to the Dongle which is connected to the sensor wirelessly. The sensor itself has 9 different registers with most of them read only. Receiving data from the device is simple, send it some hex in the form of <0x00-0xff> and it answers. After we receive the data, we send it to Wapice IOT-Ticket where we analyze it and make further steps.

This git page is only for the code in which we make the connection to the sensor and receive and send data forward.

# Requirements
- Light sensor from Techat Oy
- Drivers from https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers
    - Drivers are required for device operation as a Virtual COM Port to facilitate host communication with CP210x products.
- Node.js v14
- Currently only tested on Windows powered machine.

# Technologies
- Node.js
    - https://www.npmjs.com/package/serialport
- REST
- Wapice IOT-Ticket

# Hardware
- Laptop
- Light Sensor from Techat Oy
- Laser pointer