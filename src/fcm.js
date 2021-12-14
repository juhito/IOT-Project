import fb from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import fs from "fs";
import { request } from "http";

/** Class representing communication with Google Firebase */
class FCM {
    #fb_config;
    #db;
    
    /**
     * Initializes connection with Google Firebase
     * 
     */
    constructor() {
        this.#fb_config = JSON.parse(fs.readFileSync(process.env.FCM_CONFIG_PATH));

        fb.initializeApp({
            credential: fb.credential.cert(this.#fb_config),
            databaseURL: process.env.FCM_DATABASE_URL
        });

        this.#db = fb.database(fb);
    }

    /**
     * Listen for pause requests from Firebase.
     * 
     * @param {LightSensor} sensor object for getting and updating current state of the sensor.
     */
    listenForPauseRequests(sensor) {
        const requests = this.#db.ref().child("users/pauseRequests");

        requests.on("child_added", (requestSnapshot) => {
            let obj = {};

            sensor.togglePause();

            if(sensor.pauseSensor) {
                obj.title = "Pausing request received.";
                obj.body = "Pausing sensor now."; 
            }
            else {
                obj.title = "Unpause request received.";
                obj.body = "Unpausing sensor now.";
            }

            getMessaging().send({
                notification: obj,
                data: { state: sensor.pauseSensor.toString() },
                token: requestSnapshot.val().token
            }).then((data) => {
                console.log("Sending notification back to token, removing from db!");
                requestSnapshot.ref.remove();
            }).catch((error) => {
                console.log(error);
            });
        });

    }

    /**
     * Listen for state update requests from Firebase.
     * 
     * @param {LightSensor} sensor object for getting current state of the sensor.
     */
    listenForStateRequests(sensor) {
        const requests = this.#db.ref().child("users/stateRequests");

        requests.on("child_added", (requestSnapshot) => {
            getMessaging().send({
                data: { state: sensor.pauseSensor.toString() },
                token: requestSnapshot.val().token
            }).then((data) => {
                console.log("Sending state back to user, removing from db!");
                requestSnapshot.ref.remove();
            }).catch((error) => {
                console.log(error);
            });
        });
    }
};

export { FCM };