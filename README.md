# IOT-Project
Determine trespassing with a light sensor

# Description
We are using a light sensor and a laser pointer to determine if an area was trespassed. We make a serial connection to the Dongle which is connected to the sensor wirelessly. We are using this sensor to get light from the pointer and if there is enough variation in the intensity (aka someone gets inbetween) we send this data forward.

The sensor itself has 9 different registers with most of them read only. Receiving data from the device is simple, send it some hex in the form of <0x00-0xff> and it answers. After we receive the data, we send it to Wapice IOT-Ticket where we analyze it and make further steps.

This git page is only for the code in which we make the connection to the sensor and receive and send data forward.

# Requirements
- Light sensor from Techat Oy
- Drivers from https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers
    - Drivers are required for device operation as a Virtual COM Port to facilitate host communication with CP210x products.
- System with Nodejs v14 and Internet Connection.

# Technologies
- Node.js
    - Serialport v9.2.4 (https://www.npmjs.com/package/serialport)
    - Node-fetch v3.0.0 (https://www.npmjs.com/package/node-fetch)
    - Dotenv v10.0.0 (https://www.npmjs.com/package/dotenv)
- REST
- Wapice IOT-Ticket

# Hardware
- Laptop
- Light Sensor from Techat Oy
- Wireless Dongle from Techat Oy
- Laser pointer

# Example
Sending a hex sequence to the device
```sh
device.write([0x3C, 0x01, 0x3E])
```
Received Data is between 0-1023 on register 0x01
```sh
120
```