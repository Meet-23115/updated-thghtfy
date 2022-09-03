// const { firebase } = require('firebase/app')
const { initializeApp } = require('firebase/app');
const { getDatabase, set, get, onValue, ref, push, limitToFirst, orderByChild, orderByKey, orderByValue, update , child, off, query, equalTo, onChildAdded, remove } = require('firebase/database');
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
  


  const db = getDatabase();

  module.exports = { set, get, onValue, ref, db, push, orderByChild, orderByKey, orderByValue, update,child, off, query, equalTo, onChildAdded, remove}