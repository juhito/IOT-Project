import serial from "serialport";
import dotenv from "dotenv/config";
import { postData } from "./helpers.js";

class LightSensor {
    #device;
    #sensorData = null;
    wapice_deviceId = process.env.WAPICE_DEVICEID;

    constructor(devicePath) {
        if(devicePath === null) {
            console.log(`Path is null, exiting...`);
            process.exit(1);
        }

        this.#device = new serial(devicePath, {
            baudRate: 9600,
            parity: "none",
            dataBits: 8,
            stopBits: 1
        });

        this.#device.setEncoding('utf8');
    }

    get getDevice() { return this.#device; }
    get sensorData() { return this.#sensorData; }

    readData() {
        const data = this.#device.read();

        if(data != null) {
            this.#sensorData = data;
        }
    }

    writeData(hexData) {
        if(this.#device.isOpen) {
            this.#device.write(hexData, (err) => {
                if(err) {
                    console.log(`Error: ${err}`);
                    return;
                }
                else {
                    console.log("wrote data");
                }
            });
        }
        else {
            console.log("Device connection isn't ready, can't send data!");
            return;
        }
    }

    async sendData() {
        const response = await postData(`process/write/${this.wapice_deviceId}`, [{
            "name": "Light Intensity",
            "v": parseInt(this.#sensorData),
            "unit": "cd",
            "dataType": "double"
        }]);

        return response;
    }
}

export { LightSensor };