/*

Supported register commands: 

Register 0x01 -> [0x3C, 0x01, 0x3E]

    Light Intensity Data

Register 0x02 -> [0x3C, 0x02, 0x3E]

    Temperature Data

Register 0x03 -> [0x3C, 0x03, 0x3E]

    Change the channel of the sensor, between 1-127

Register 0x04 -> [0x3C, 0x04, 0x3E]

    Selftest

Register 0x05 -> [0x3C, 0x05, 0x3E]

    Enable/Disable Silentmode

Register 0x06 -> [0x3C, 0x06, 0x3E]

    Current Uptimer

Register 0x07 -> [0x3C, 0x07, 0x3E]

    Test if sensor is online

Register 0x08 -> [0x3C, 0x08, 0x3E]

    Used to reboot sensor

Register 0x09 -> [0x3C, 0x09, 0x3E]

    Prints the info

*/
/*

Writing Data

The user must write the provided values to the corresponding data node. Subsequent writings always include 
the same name and path to write to the same data node. 

Name -> A short description of the datanode. A device’s datanode is uniquely identified with its name and path. 
        The value is case insensitive.

V -> The value to be written. This must be applicable to the datatype, if provided.

dataType -> When the datatype is not provided, the possible data type is inferred from the value first received by the server.

unit -> The unit associated with the data, preferably 1 or 2 characters.

ts -> Unix Timestamp. The number of milliseconds since the Epoch. When a timestamp is missing, the current timestamp is automatically used.

{
    "name": "Latitude",
    "v": 63,
    "ts": 1414488510057,
    "unit": "c",
    "dataType": "long" 
},

*/

import { Server } from "socket.io";

import { findDevice, REGISTERCOMMANDS as reg } from "./helpers.js";
import { LightSensor } from "./sensor.js";

const io = new Server();

const hexData = reg.READ_LIGHT_DATA;
const devicePath = await findDevice("EA60").catch(() => null);
const sensor = new LightSensor(devicePath);

let PAUSE_SENSOR = false;

setInterval(() => {
    if(!PAUSE_SENSOR) {
        sensor.writeData(hexData);
        sensor.readData();
    }
}, 1000);

io.on("connection", (socket) => {
    console.log(`New connection from: ${socket.handshake.address}`);

    socket.on("message", (data) => {
        if(data === process.env.PAUSE_SENSOR_MSG) {
            if(!PAUSE_SENSOR) console.log("PAUSING SENSOR!");
            else console.log("RESUMING SENSOR!");
            PAUSE_SENSOR = !PAUSE_SENSOR;
        }
    });
});

io.listen(3000);