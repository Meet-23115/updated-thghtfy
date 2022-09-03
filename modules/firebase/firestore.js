const { initializeApp } = require('firebase/app');
// const { set } = require('firebase/database');
const { getFirestore, collection, addDoc, doc, setDoc, orderBy, getDoc, where , getDocs, query, startAt, startAfter, limit, onSnapshot, disableNetwork, deleteDoc } = require('firebase/firestore');
require('firebase/firestore')
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
  


  const ft = getFirestore();



  // const ref = collection(ft, 'user');
  // var data = {
  //   name: 'Meet',
  //   age: 16
  // }
  // // addDoc('user', data)
  // addDoc(ref, data).then(
  //   console.log('done')
  // )
//   console.log(ft)
  module.exports= { ft, collection, addDoc, doc, setDoc,orderBy, getDoc, where, getDocs, query, startAt, startAfter, limit , onSnapshot, disableNetwork, deleteDoc}