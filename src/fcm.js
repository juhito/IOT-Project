import fb from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import fs from "fs";

/** Class representing communication with Google Firebase */
class FCM {
    #fb_config;
    #db;
    
    constructor() {
        this.#fb_config = JSON.parse(fs.readFileSync(process.env.FCM_CONFIG_PATH));

        fb.initializeApp({
            credential: fb.credential.cert(this.#fb_config),
            databaseURL: process.env.FCM_DATABASE_URL
        });

        this.#db = fb.database(fb);
    }

    listenForPauseRequests(sensor) {
        const requests = this.#db.ref().child("pauseRequests");
        requests.on("child_added", (requestSnapshot) => {
            const request = requestSnapshot.val();
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
                token: request.token
            }).then((data) => {
                console.log("Sending notification back to user, removing from db!");
                requestSnapshot.ref.remove();
            }).catch((error) => {
                console.log(error);
            });
        });
    }
};


export { FCM };