
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfWmXwlKYU1303-f57QZAGU19wqoiAP_s",
    authDomain: "gradpro-a11aa.firebaseapp.com",
    projectId: "gradpro-a11aa",
    storageBucket: "gradpro-a11aa.appspot.com",
    messagingSenderId: "289326948124",
    appId: "1:289326948124:web:de61c43cf1a611df7424d9",
    measurementId: "G-3T088LHP9G"
  };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);