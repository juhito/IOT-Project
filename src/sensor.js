import serial from "serialport";
import { postData } from "./helpers.js";

/** Class representing a sensor device. */
class LightSensor {
    #device;

    #CURRENT_DATA_SEND = 0;
    #MAX_DATA_SEND = 10;

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
     * Reads data from the internal buffer and stores it.
     */
    readData() {
        const data = this.#device.read();
        console.log("Data read: " + data);
        if(data != null) {
            if(parseInt(data) < 100) {
                this.#CURRENT_DATA_SEND++;
                let ts = Math.floor(new Date().getTime() / 1000); // GENERATE EPOCH TIMESTAMP
                
                // if sensor value stays low long enough, stop spamming. 
                if(this.#CURRENT_DATA_SEND <= this.#MAX_DATA_SEND) {
                    // send data
                }
                else { // stop sending data until sensor value something something
                    
                }   
            }
            else {
                this.#CURRENT_DATA_SEND = 0;
            }
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

    /**
     * Sends the current sensor data to IOT-Ticket.
     * 
     * @returns {Promise<Object>} Response from api.
     */
    sendData() {
/*
        const response = await postData(`process/write/${this.wapice_deviceId}`, [{
            "name": "Light Intensity",
            "v": parseInt(this.#sensorData),
            "unit": "cd",
            "dataType": "double"
        }]);

        return response;*/
    }
}

export { LightSensor };