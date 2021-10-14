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


// import the required library to make serial connections
const serial = require("serialport");

// instantiate connection to the device
const device = new serial("COM3", {
    baudRate: 9600,
    parity: "none",
    dataBits: 8,
    stopBits: 1
});

// when we receive data from the device
device.on("data", (data) => {
    console.log("Data: " + data);
})

// when the connection is ready
device.on("open", () => {
    // send data as hex sequence
    device.write([0x3C, 0x09, 0x3E], (err) => {
        if(err) 
            console.log("Error on write: ", err.message);
    
        console.log("message written");
    })
});
