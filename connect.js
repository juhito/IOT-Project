import fetch from "node-fetch";
import dotenv from "dotenv/config";

// get credentials from env variables
const username = process.env.WAPICE_USERNAME;
const password = process.env.WAPICE_PASSWORD;

const apiURL = "https://my.iot-ticket.com/api/v1";

// generate a basic http auth token
const authToken = "Basic " + Buffer.from(username + ":" + password).toString("base64");

// send a get request using fetch
const response = await fetch(`${apiURL}/devices`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": authToken
    }
});

// await response from fetch
const data = await response.json();

console.log(data);