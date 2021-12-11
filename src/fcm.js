import fb from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import fs from "fs";

/** Class representing communication with Google Firebase */
class FCM {
    constructor() {
        this.#fb_config = JSON.parse(fs.readFileSync(process.env.FCM_CONFIG_PATH));
        fb.initializeApp({
            credential: fb.credential.cert(this.#fb_config),
            databaseURL: process.env.FCM_DATABASE_URL
        });

        this.#db = fb.database();
    }

    testConnection() {
        const ref = db.ref("Tokens");
        ref.once("value", (snapshop) => {
            console.log(snapshop.val());
        })
    }
};


export { FCM };