import serial from "serialport";
import { postData } from "./helpers.js";

/** Class representing a sensor device. */
class LightSensor {
    #device;
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
        this._pauseSensor = false;
    }

    /**
     * Pauses the sensor
     */
    togglePause() {
        this._pauseSensor = !this._pauseSensor;
    }

    /**
     * Get's the current state of sensor.
     * 
     * @returns {boolean} boolean value represeting current state of sensor.
     */
    get pauseSensor() {
        return this._pauseSensor;
    }

    /**
     * Reads data from the internal buffer.
     * 
     * @returns {string | null} a string or if no data is available, null.
     */
    readData() {
        return this.#device.read();
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
                /*
                According to the stream docs, write errors don't always provide the error in the callback; 
                sometimes they use the error event.

                If an error occurs, the callback may or may not be called with the error as its first argument. 
                To reliably detect write errors, add a listener for the 'error' event.
                */
                if(err) {
                    console.log(`Error: ${err}`);
                    return;
                }
            });
        }
        else {
            console.log("Device connection isn't ready, can't send data!");
            return;
        }
    }
}

export { LightSensor };