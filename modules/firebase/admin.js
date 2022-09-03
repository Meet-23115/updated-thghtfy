// import firebase-admin package
const admin = require('firebase-admin');
const { getStorage,  } = require('firebase-admin/storage')
const {  getDownloadURL } = require('firebase/storage')

// import service account file (helps to know the firebase project details)
const serviceAccount = require('./thghtfy-32891-firebase-adminsdk-dzirc-495d60ab75.json');

// Intialize the firebase-admin project/account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'thghtfy-32891.appspot.com'

});

const bucket = getStorage().bucket();
// console.log(bucket)
// var getDownloadURL = getDownloadURL();

module.exports = { admin, bucket, }