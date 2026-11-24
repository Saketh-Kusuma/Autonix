import {cert, initializeApp} from "firebase-admin";
import serviceAccount from "../../autonix-automation-firebase-adminsdk-fbsvc-7a8ab7fa56.json" with {type:"json"}
const firebase = initializeApp({
    credential:cert(serviceAccount)
});
export default firebase;