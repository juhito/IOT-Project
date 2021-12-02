import serial from "serialport";
import { postData } from "./helpers.js";

import dotenv from "dotenv/config";

/** Class representing a sensor device. */
class LightSensor {
    #device;
    #sensorData = null;
    wapice_deviceId = process.env.WAPICE_DEVICEID;

    /**
     * Create a sensor and instantiate the connection.
     * 
     * @param {string} devicePath Path of the port.
     */
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

    /**
     * Get the device.
     * 
     * @returns {serial} The device itself.
     */
    get getDevice() { 
        return this.#device; 
    }

    /**
     * Get the current sensor data.
     * 
     * @returns {string} Current sensor data.
     */
    get sensorData() { 
        return this.#sensorData; 
    }


    /**
     * Reads data from the interal buffer and stores it.
     */
    readData() {
        const data = this.#device.read();

        if(data != null) {
            this.#sensorData = data;
        }
    }

    /**
     * Writes data to the device.
     * 
     * @param {number[]} hexData Number array containing the hex command.
     * @returns {void} nothing yet
     */
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

    /**
     * Sends the current sensor data to IOT-Ticket.
     * 
     * @returns {Promise<string>} Response from api.
     */
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