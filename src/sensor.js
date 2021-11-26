import serial from "serialport";

class LightSensor {
    device = null;
    sensorData = null;

    constructor() {

    }

    async init() {
        const devicePath = await this.findDevice("EA60");
        
        if(devicePath === null) {
            console.log("Device not found, exiting...");
            process.exit(1);
        }

        this.device = new serial(devicePath, {
            baudRate: 9600,
            parity: "none",
            dataBits: 8,
            stopBits: 1
        });

        this.device.on("open", () => console.log("Connection is now ready and open!"));
    }

    async findDevice(deviceId) {
        const deviceList = await serial.list();
        let tempDevice = null;
        deviceList.forEach(device => {
            if(device.productId === deviceId) {
                console.log(`Found device ${deviceId} on port ${device.path}!`);
                tempDevice = device;
                return;
            }
        });
    
        return tempDevice.path;
    }

    readData() {
        this.device.on("data", (data) => {

        })
    }

    writeData(hexData) {
    }

    sendData() {
        /*
        const response = await postData(`process/write/${deviceId}`, [{
            "name": "Light Intensity",
            "v": parseInt(tempString),
            "unit": "cd",
            "dataType": "double"
        }]);*/
    }

}

export { LightSensor };