import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyAJT9CwI85Yc_g-X2iGLr4TTq4BQZuMAKM",
    authDomain: "maltimart-418ce.firebaseapp.com",
    projectId: "maltimart-418ce",
    storageBucket: "maltimart-418ce.appspot.com",
    messagingSenderId: "162723515120",
    appId: "1:162723515120:web:5f2d4c8f4c3b90c35c5035"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export default app;