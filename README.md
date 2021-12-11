# IOT-Project
Determine trespassing with a light sensor

# Description
We are using a light sensor and a laser pointer to determine if an area was trespassed. We make a serial connection to the Dongle which is connected to the sensor wirelessly. We are using this sensor to get light from the pointer and if there is enough variation in the intensity (aka someone gets inbetween) we send this data forward.

The sensor itself has 9 different registers with most of them read only. Receiving data from the device is simple, send it some hex in the form of <0x00-0xff> and it answers. After we receive the data, we send it to Wapice IOT-Ticket where we analyze it and make further steps.

# Requirements
- Light sensor from Techat Oy
- Wireless Dongle from Techat Oy
- Drivers from https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers
    - Drivers are required for device operation as a Virtual COM Port to facilitate host communication with CP210x products.
- System with Nodejs v14 and Internet Connection.
- Access to Wapice IOT-Ticket.
- Firebase account with a working project&database.

# Technologies
- Node.js
    - Serialport v9.2.4 (https://www.npmjs.com/package/serialport)
    - Node-fetch v3.0.0 (https://www.npmjs.com/package/node-fetch)
    - Dotenv v10.0.0 (https://www.npmjs.com/package/dotenv)
    - Firebase-admin v10.0.0 (https://www.npmjs.com/package/firebase-admin)
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

# Setting up
1. Clone this repo
```sh
git clone https://github.com/juhito/IOT-Project
```
2. Download and install.
```sh
Node: https://nodejs.org/en/
Uart Drivers: https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers
```
3. Run
```sh
cd iot-project/

npm install
```
in command prompt.

4. Credentials are required to access Wapice's IOT-Ticket and they are located in the projects root dir in a **.env** file. This file isn't included as it contains sensitive information and you should create this file yourself or contact me for more information.

5. Starting the application
```sh
npm run dev
```