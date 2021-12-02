import fetch from "node-fetch";
import serial from "serialport";
import dotenv from "dotenv/config";

// get credentials from env variables
const username = process.env.WAPICE_USERNAME;
const password = process.env.WAPICE_PASSWORD;

const apiURL = "https://my.iot-ticket.com/api/v1";

// generate a basic http auth token
const authToken = "Basic " + Buffer.from(username + ":" + password).toString("base64");

const REGISTERCOMMANDS = {
    READ_LIGHT_DATA: [0x3C, 0x01, 0x3E],
    READ_TEMP_DATA: [0x3C, 0x02, 0x3E],
    REBOOT: [0x3C, 0x08, 0x3E]
};

/**
 * Get Data from Wapice IOT-Ticket API, returns the data as json.
 * 
 * @param {string} endpoint The endpoint where to pull data from.
 * @return {json} Detailed response from API as json.
 */
async function getData(endpoint) {
    const response = await fetch(`${apiURL}/${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken
        }
    });
    
    return response.json();
}

/**
 * Post Data to Wapice IOT-Ticket API, returns a detailed response as json.
 * 
 * @param {string} endpoint The endpoint where to send the data.
 * @param {object} data Complete object with required values.
 * @return {json} Detailed response from API as json.
 */
async function postData(endpoint, data) {
    const response = await fetch(`${apiURL}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken
        },
        body: JSON.stringify(data)
    })

    return response.json();
}

/**
 * Uses serialport.list() which retrieves all available ports with metadata and then
 * loops over that list to find the given device. 
 * 
 * @param {string} deviceId ID of the device you're looking for.
 * @returns {Promise<string>} Path to the port
 */
async function findDevice(deviceId) {
    const deviceList = await serial.list();
    let tempDevice = null;
    deviceList.forEach(device => {
        if(device.productId === deviceId) {
            console.log(`Found device ${deviceId} on port ${device.path}!`);
            tempDevice = device;
            return;
        }
    });

    if(tempDevice === null) console.log(`Couldn't find device with id ${deviceId}`); 
    return tempDevice !== null ? tempDevice.path : null;
}
    
export { getData, postData, findDevice, REGISTERCOMMANDS };