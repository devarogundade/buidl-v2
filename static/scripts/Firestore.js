import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";

const dotenv = require("dotenv")
dotenv.config()

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const Firestore = {
    instance: getFirestore(firebaseApp),
    fetch: async function(_collection, _document) {
        try {
            const reference = doc(this.instance, _collection, _document);
            const data = await getDoc(reference);

            if (data.exists()) {
                return data.data()
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
            return null
        }
    },
    fetchAll: async function(_collection) {
        try {
            const result = []
            const snapshot = await getDocs(collection(this.instance, _collection))

            snapshot.forEach(document => {
                result.push(document.data())
            });

            return result
        } catch (error) {
            return []
        }
    },
    fetchAllWhere: async function(_collection, key, sign, value) {
        try {
            const result = []

            const _query = query(collection(this.instance, _collection), where(key, sign, value));
            const snapshot = await getDocs(_query)

            console.log(snapshot);

            snapshot.forEach(document => {
                result.push(document.data())
            });

            return result
        } catch (error) {
            console.log(error);
            return []
        }
    },
}

export default Firestore
