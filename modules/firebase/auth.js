const { initializeApp } = require('firebase/app');
const { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, updateEmail, sendSignInLinkToEmail, signOut } = require('firebase/auth');
require('dotenv').config();


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
    };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth();


    function doAuth(email, password){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            const userUid = user.uid;
        })
        
    }
module.exports = { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateEmail, sendSignInLinkToEmail, auth, signOut}