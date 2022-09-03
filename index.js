// imports-start
const express = require('express');
const fs = require('fs');
const db = require('./modules/firebase/db')
const auth = require('./modules/firebase/auth')
const bodyparser = require('body-parser')
const  multer   = require('multer');
const cookieParser = require('cookie-parser');
const admin = require('./modules/firebase/admin');
const mlt = require('./modules/multer');
const ft = require('./modules/firebase/firestore');
const sharp = require('sharp')

const path = require('path');
// const { syncBuiltinESMExports } = require('module');
// const { async } = require('@firebase/util');
// const { connectStorageEmulator } = require('firebase/storage');
// const { async } = require('@firebase/util');

require('dotenv').config();


// imports-end

// express-start
const server = express();
server.use(bodyparser.urlencoded({extended:true}))
server.use(express.json());
server.engine("html", require('ejs').renderFile)
server.use('/images', express.static('uploads'));
server.use(express.static('public'));
server.use(cookieParser());
// express-end

// variables

// routes-start
// start-route-start

   

   
server.get('/', (req, res)=>{
    var userCookie = req.cookies;
    console.log(userCookie)
    var userUid = userCookie.userUid;
    if(userUid == null && userUid == undefined){
      res.redirect('/en/signup')
    }
    else {
      console.log(`this is the uid: ${userUid}`)
      const starCountRef =   db.ref(db.db, 'users/' + userUid );
      db.onValue(starCountRef, async(snapshot) => {
        const data = await snapshot.val();
        // console.log(data)
        var userEmail = data.email;
        var userPassword = data.password;
        await auth.signInWithEmailAndPassword(auth.auth, userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user.uid;
          console.log(user)
          // res.json(user)
          // const useruid =  auth.auth.currentUser.uid
          console.log(`user is logged in ${user}`)
          res.redirect('/en/loginLoading')
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
        });
      
   
      })
    }
})

// start-route-end

// signUp-route
server.get('/en/signUp', async (req, res) =>{
    res.render('signup.html')
    // var data = await res.body
});

server.post('/en/username', async(req, res)=>{
  var data = req.body;
  var username= data.username;
  console.log(data)
  console.log(username)
  var doc = ft.doc(ft.ft, `AllUsers/${username}`);
  var search = await ft.getDoc(doc).then(async (val)=>{
    // console.log(val)
    console.log(val.data())
    var username = val.data()

    if(username!=undefined){
      res.sendStatus(420)
    }
    if(username==undefined){
      res.sendStatus(202)
    }
  })


})

server.post('/en/signUp', async (req, res) => {
    const userName = req.body.userName;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;


    
    // const ref = ft.doc(ft.ft, `${userUid}/${thghtid}`);

    
        await auth.createUserWithEmailAndPassword(auth.auth, email, password)
    .then(async(userCredential) => {
      // Signed in 
      const user =  userCredential.user;
      const userUid =  user.uid
      console.log(`user is created userUid: ${userUid}`)
      const userData =  await db.set(db.ref(db.db, 'users/' + userUid), ({
        UserName: userName,
        fullName: fullName,
        email: email,
        uid: userUid,
        password: password,
        followers: {followers:0},
        following: {following:0}
      })) 
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })

      await db.push(db.ref(db.db, `users/${userUid}/FollowersId`), {
        userUid:userUid
      })
      // var thghtid = `thought${time}`
      var col = ft.collection(ft.ft, `AllUsers`)
      const ref = ft.doc(ft.ft,  `AllUsers/${userName}`);
    var allUsersData = {
      username: userName,
      userUid: userUid
    }
    // addDoc('user', data)
    ft.setDoc(ref, allUsersData);
  

    

    })
      
      
      });

server.get('/en/addInfo', (req, res)=>{
  res.render('additionalInfo.html')
})
server.post('/en/addInfo',async (req, res)=>{
  var data =await req.body;
  console.log(data)
  var user = auth.auth.currentUser.uid;
  await db.update(db.ref(db.db, 'users/'+user+'/additionalInfo/'), (data)).then(console.log('hehe'))
})
server.get('/en/dp', (req, res) => {
    res.render('upload_dp.html')
    
});
server.post('/en/dp',async(req, res)=>{
    mlt.upload (req, res, async(err) => {
      if(err){
        console.log(err)
      }  else   {   
        const user = auth.auth.currentUser.uid;
        console.log(`the user ${user} is signed in `)
          // console.log(req.file)
          var dpName = req.file.filename;
          var dpPath = (`./public/uploads/${dpName}`)

          var cloudFileDestination = `images/userDp-${user}.png`
         var upload = await  admin.bucket.upload(dpPath,  {
            destination: `${cloudFileDestination}`,
            metadata : {
              metadata :{
                firebaseStorageDownloadTokens: user,
             }
            }
          })
          res.redirect('/en/settingCookie')
            fs.unlink(`${dpPath}`, (err) => {
              if (err) {
                  throw err;
              }
              console.log("File is deleted.");
          })
  
  
        }
    }) 
  });
  server.get('/en/settingCookie',  (req, res)=>{
    if( auth.auth.currentUser == null){
      res.redirect('/')
    }
    else {
    const user =  auth.auth.currentUser.uid
    console.log(`the user ${user} is signed in `)
    res.cookie("userUid", user, {maxAge: 604800000, httpOnly: true,  })
    res.redirect('/en/loading')
    }
  })

  server.get('/en/loading', (req, res)=>{
    if( auth.auth.currentUser == null){
      res.redirect('/')
    }
    else {
    res.render('creatingAccount.html')
    }
  })
  
// signUp-end

// settingUpAccount-start
server.get('/en/settingUp', async (req, res)=>{
    var userUid = req.cookies.userUid
    const starCountRef =   db.ref(db.db, 'users/' + userUid );
    db.onValue(starCountRef, async(snapshot) => {
    const data = await snapshot.val();
    // console.log(data)
      var userData = await {data}
      console.log(userData)
      db.off(starCountRef, 'value')
       res.send(userData)
      //  res.redirect('/test')
    })
    
  })

  server.get('/thoughts', async (req, res)=>{
    var userUid = req.cookies.userUid;
    var col = ft.collection(ft.ft, `${userUid}`)

    const q = ft.query(col, ft.orderBy('timestamp', 'desc'))


    var thght = await ft.getDocs(q).then(async (val)=>{
      // console.log(val.docs.values)
      let thoughts = []
      val.docs.forEach(async (doc)=>{
        var push = await thoughts.push({...doc.data()})
        // console.log(thoughts)
      })
      res.send(thoughts)
    })
  })
     
  
 

// logIn-start
server.get('/en/login', (req, res) =>{ 
    res.render('login.html')
});

server.post('/en/login',async (req, res) =>{
    // console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)

      await auth.signInWithEmailAndPassword(auth.auth, email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user.uid;
        console.log('this is the user Uid')
        console.log(user)
        res.json({userUid:user})
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        var userNotFound = 'auth/user-not-found';
        var wrongPass = 'auth/wrong-password';
        if(errorCode == userNotFound){
          res.send({problem:'User does not exsist'})  
        }
        if(errorCode == wrongPass){
          res.send({problem:'Wrong Password'})
        }
        else{
          res.send({problem:'Please try again later'})
        }
      });
});

server.get('/en/loginLoading', async (req, res)=>{
    if( auth.auth.currentUser == null){
      res.redirect('/')
    }
    else {
    const user =  auth.auth.currentUser.uid
    res.cookie('userUid', user, { maxAge: 604800000, httpOnly: true })
    res.render('loginLoading.html')
    }
  })
// logIn-end

// home-route-start
server.get('/en/home', (req, res)=>{
    if( auth.auth.currentUser == null){
      res.redirect('/')
    }
    else {
        var userUid = auth.auth.currentUser.uid;
        // res.cookie('userUid', userUid, {maxAge: 604800000, httpOnly: true} )
      res.render('index.html')
      
    }
  })



server.get('/en/content', (req,res)=>{
    var userUid = req.cookies.userUid;
    console.log('beauty and the beach')
  
  var col = ft.collection(ft.ft, `${userUid}-content`);
  const q_ = ft.query(col, ft.orderBy('timestamp', 'desc'))
  var thght = ft.getDocs(q_).then(async (val)=>{
    let dataArray = []
    val.docs.forEach(async(doc)=>{
      console.log({...doc.data()})
      var push = await dataArray.push({...doc.data()})
      // ft.disableNetwork(ft.ft);
      // console.log(dataArray)
      
    
    })
    res.send({thoughts:dataArray});
  })
  
    
  // var col = ft.collection(ft.ft, `${profileId}`)
  // const q = ft.query(col, ft.orderBy('timestamp', 'desc'))
  // var thght = await ft.getDocs(q).then(async (val)=>{
  //   // console.log(val.docs.)
  //   // console.log(...doc.data())
  //   let dataArray = []
  //   val.docs.forEach(async (doc)=>{
  //     console.log({...doc.data()})
  //     var push = await dataArray.push({...doc.data()})
  //     // console.log(thoughts)
  //   //  return dataArray.push(thoughts);
  //   // return thoughts
  //   })
  // })

})
  // home-route-end

// profile-route-start
server.get('/en/profile', (req, res) =>{
    if( auth.auth.currentUser == null){
      res.redirect('/')
    }
    else {
    const user =  auth.auth.currentUser.uid;
    res.cookie("userUid", user, { maxAge: 604800000, httpOnly: true, })
    res.render('profile.html')
    }
    
    })
// profile-route-end


server.get('/profile/followers', async(req,res)=>{
  var userUid = req.cookies.userUid;
  // console.log(userUid)
})
server.get('/profile/following',async(req, res)=>{
  var userUid = req.cookies.userUid;
  console.log(userUid)
})

// create-thought-start
server.get('/en/Create_A_Post', (req, res) =>{

    if( auth.auth.currentUser == null){
      res.redirect('/')
    }
    else {
      var user = auth.auth.currentUser.uid;
      // res.cookie('userUid', user, { maxAge: 604800000, httpOnly: true, })
      res.render('create_thought.html')
    
    }
  })
  
  server.post('/en/Create_A_Post',async (req, res)=>{
    // var userUid = auth.auth.currentUser.uid;
    var cookie = req.cookies;
    var time = Date.now()
    // console.log(cookie)
    var userUid = cookie.userUid;
    const starCountRef =   db.ref(db.db, 'users/' + userUid );
    var uploadedThought = req.body.uploadedThought;
    console.log(uploadedThought);
    db.onValue(starCountRef, async(snapshot) => {
      const data = await snapshot.val();
      // console.log(data)
        var userData = await {data}
        // console.log(userData)
        var username = data.UserName;
        
        var thghtData = ({
          thought: uploadedThought,
          timestamp: time,
          username: username,
          useruid: userUid
        })
        // console.log(data)
      
        var thghtid = `thought${time}`
        var col = ft.collection(ft.ft, `${userUid}`)
        const ref = ft.doc(ft.ft, `${userUid}/${thghtid}`);
      
      // addDoc('user', data)
      await ft.setDoc(ref, thghtData).then(
        console.log('done')
      )
    // console.log(thghtid)
      
      var followersId = db.query(db.ref(db.db, `users/${userUid}/FollowersId`), db.orderByValue());
      await db.onValue(followersId,async (snapshot)=>{
        snapshot.forEach((data) => {
          // console.log(data.val());
          var followerID =  data.val().userUid;
          console.log(followerID)
          // console.log(userUid)
          var content = {
            thought: uploadedThought,
            uploaderId: userUid,
            uploadederUserName: username,
            timestamp: time
          }
          // console.log(content)
          var followerRef = ft.doc(ft.ft, `${followerID}-content/${thghtid}`);
           ft.setDoc(followerRef, content).then(console.log('uploaded'))


        });
        
      });
      });  
  });

  

  server.get('/en/search', (req, res)=>{
    res.render('search.html')
  })
  server.post('/en/umk',async (req, res) =>{
    // var cookie = req.cookies;
    var data = await (req.body)
    // var userUid = cookie.userUid;
    console.log(data)

    // var dbRef =  db.ref(db.db, 'users/');
    // db.onValue(dbRef, async(snapshot) => {
      // const data = await snapshot.val();
      // console.log(data)
      // res.send(data)
    })
 
  // })
  server.post('/en/search',async (req, res)=>{
    // console.log(req.body)
    var data = await req.body;
    var searchInput = data.value;
    console.log(searchInput)
    var col = ft.collection(ft.ft, `AllUsers`);
      const q = ft.query(col, ft.orderBy('username', 'asc'))
      const w = ft.query(q, ft.startAt(`${searchInput}`))
      const fw = ft.query(w, ft.limit(2))
    // const q_ = q.startAt(`${searchInput}`);
      var search = await ft.getDocs(fw).then(async (val)=>{
        // console.log(val)
        // console.log(val.data())
        const allUsers = val.docs.map((d) => ({ id: d.id, ...d.data() }))
        // console.log(data)
        // let users = []
        // val.docs.forEach(async (doc)=>{
        //   var push = await users.push({...doc.data()})
        console.log(allUsers[0])
        res.send({
          users: allUsers
        })
        })
      })
server.get('/search/:user', async(req, res)=>{
  console.log(req.params.user)
  var profielId = req.params.user;
  console.log(profielId)
  res.cookie("profileId", profielId, { httpOnly: true})
  res.render('user.html');
  });

server.get('/account/q',async (req, res)=>{
  var cookies = req.cookies
  var profileId =  cookies.profileId;
  var userUid = cookies.userUid;
  var dataArray = [];
  var userRef = db.ref(db.db, `users/${userUid}/followingId`);
    var followQ = db.query(userRef, db.orderByChild('profileId'), db.equalTo(profileId));
    
      await db.onValue(followQ,async (snapshot)=>{
      console.log(snapshot.val())
      var data =await snapshot.val();

      
      if(data == null){
        var yk = {follow:false}
          await dataArray.push(yk)
        // console.log(dataArray)
      }
      else{
        var yk = {follow:true}
          await dataArray.push(yk)
        // console.log(dataArray)
      }
    })
    var data__ = {data: dataArray}
    //  res.cookie('userUid', userUid, {httpOnly:true})
   await res.send(data__)
})


  server.get('/account/setup', async (req, res)=>{
    var cookies = req.cookies
    var profileId =  cookies.profileId;
    var userUid = cookies.userUid;
    var dataArray = [];
    var accountRef = db.ref(db.db, 'users/' + profileId);
    await db.onValue(accountRef,async (snapshot)=>{
     // console.log(snapshot.val());
     var userInfo = await  snapshot.val();
      db.off(accountRef);
    //  var following =w userInfo.FollowersId;
     // console.log(following);
       await dataArray.push(userInfo);
       res.send(dataArray)
   })   
  })
  server.get('/user/thoughts', async (req, res)=>{
    var cookies = req.cookies
    var profileId = cookies.profileId;
    console.log(profileId)

    var col = ft.collection(ft.ft, `${profileId}`)
    const q = ft.query(col, ft.orderBy('timestamp', 'desc'))
    var thght = await ft.getDocs(q).then(async (val)=>{
      // console.log(val.docs.)
      // console.log(...doc.data())
      let dataArray = []
     await val.docs.forEach(async (doc)=>{
        console.log({...doc.data()})
        var push = await dataArray.push({...doc.data()})
        // console.log(thoughts)
      //  return dataArray.push(thoughts);
      // return thoughts
      })
      res.send({thoughts: dataArray})
      })
  })
  

server.post('/user/follow', async(req, res)=>{
  var profileId = req.cookies.profileId;
  var userUid = req.cookies.userUid;
  console.log(req.body)
  console.log(userUid)
  var userProfile = req.body;
 var userName = userProfile.profileUserName;
 var profileUid = userProfile.profileUid;

  const userData =  await db.push(db.ref(db.db, 'users/' + profileId + '/FollowersId/'), ({
    profileUid:profileUid,
    profileUserName:userName
   }))
    .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
   })
   const profielData = await db.push(db.ref(db.db, `users/${userUid}/followingId/`), ({
    userUid
   })).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  })
   
res.redirect('/user/follow/update')
 
})

server.get('/user/follow/update', async(req, res)=>{
  console.log('president of the united states')
  var profileId = req.cookies.profileId;
  var userUid = req.cookies.userUid;

  var fref = db.ref(db.db, 'users/'+ profileId + '/followers/followers')
  var accountRef =  db.ref(db.db, `users/${profileId}/followers` );
  // res.cookie('profielIdFollowerCount', 'meetGelothra', {httpOnly: true, })
   var dataA = []
    
   var lamar = await  db.onValue(fref, async(snapshot)=>{
       var userInfo = await snapshot.val();
      //  console.log(userInfo)
      //  console.log(userInfo + '4')  
      db.off(fref);
       var dataJ = {followersC:userInfo};
       var doing = dataA.push(dataJ)
    var dataAJ =await dataA[0]
    
    var followerC =await dataAJ.followersC;
    
    var finalOne = followerC;
    
    await finalOne++;
    

     await  db.set(db.ref(db.db, 'users/' + profileId + '/followers'), {
      followers: finalOne
     })
     })    
     res.redirect('/user/following/update')
})
server.get('/user/following/update', async(req, res)=>{
console.log('i am too real');
var profileId = req.cookies.profileId;
  var userUid = req.cookies.userUid;
  var fref = db.ref(db.db, 'users/'+ userUid + '/following/following');
  var dataA = [];

  var lamar = await db.onValue(fref,async (snapshot)=>{
    var userInfo = await snapshot.val();
    console.log(userInfo);
    var dataJ = {followingC:userInfo};
    var doing = dataA.push(dataJ);
    var dataAJ = await dataA[0];
    var followingC = await dataAJ.followingC;

    var finalOne = followingC;
    finalOne++;
    await  db.set(db.ref(db.db, 'users/' + userUid + '/following'), {
      following: finalOne
     })
     db.off(fref);
    console.log(finalOne)
  })

})
  
server.get('/en/unfollow', async(req, res)=>{
  var userUid = req.cookies.userUid;
  var profileId = req.cookies.profileId;
  console.log(userUid)
  console.log(profileId)

  // var ref = db.ref(db.db, `users/${userUid}/`)

  var userRef = db.ref(db.db, `users/${userUid}/followingId`);
    var followQ = db.query(userRef, db.orderByChild('profileId'), db.equalTo(profileId));
    await db.remove(followQ)

    var profileRef = db.ref(db.db, `users/${profileId}/FollowersId`)
    var followingQ = db.query(profileRef, db.orderByChild('userUid'), db.equalTo(userUid))


    await db.remove(followingQ)
    

      res.redirect('/en/updateCount')
  // var followC = db.ref(db.db, `users/${following}`)
})
server.get('/en/updateCount', async(req, res)=>{
  
  var userUid = req.cookies.userUid;
  var profileId = req.cookies.profileId;
  // console.log(userUid)
  // console.log(profileId)

  var followC = db.ref(db.db, `users/${profileId}/followers`)
  var followingC = db.ref(db.db, `users/${userUid}/following`)

  db.onValue(followC,async (snapshot)=>{
    var data = snapshot.val()
    var followers = data.followers;
    db.off(followC)

    console.log(followers)
    followers--;

    db.update(followC, {followers:followers})
  })

  db.onValue(followingC, async(snapshot)=>{
    var data = snapshot.val()
    var following = data.following;
    db.off(followingC)

    console.log(following)

    following--
    console.log(following)
    db.update(followingC, {following:following})
  })
})




server.post('/en/updateDp', (req, res)=>{
  mlt.upload (req, res, async(err) => {
    if(err){
      console.log(err)
    }  else   {   
      // const user = auth.auth.currentUser.uid;
      const user = req.cookies.userUid;
      console.log(`the user ${user} is signed in `)
        // console.log(req.file)
        var dpName = req.file.filename;
        var dpPath = (`./public/uploads/${dpName}`)
        var cloudFileDestination = `images/userDp-${user}.png`
       var upload = await  admin.bucket.upload(dpPath,  {
          destination: `${cloudFileDestination}`,
          metadata : {
            metadata :{
              firebaseStorageDownloadTokens: user,
           }
          }
        })
        res.redirect('/en/profile')
          fs.unlink(`${dpPath}`, (err) => {
            if (err) {
                throw err;
            }
            console.log("File is deleted.");
        })


      }
  })
})
server.get('/en/settings', (req, res)=>{
  res.render('setting.html')
})
server.get('/en/logOut', async(req, res)=>{
  res.clearCookie('userUid');
  auth.signOut(auth.auth)
  res.redirect('/en/signUp')
})

server.get('/en/updateDp', (req, res)=>{
  res.render('updateDp.html')
})
server.post('/en/updateDp', async(req ,res)=>{
  mlt.upload (req, res, async(err) => {
    if(err){
      console.log(err)
    }  else   {   
      const user = auth.auth.currentUser.uid;
      console.log(`the user ${user} is signed in `)
        // console.log(req.file)
        var dpName = req.file.filename;
        var dpPath = (`./public/uploads/${dpName}`)
        var cloudFileDestination = `images/userDp-${user}.png`
       var upload = await  admin.bucket.upload(dpPath,  {
          destination: `${cloudFileDestination}`,
          metadata : {
            metadata :{
              firebaseStorageDownloadTokens: user,
           }
          }
        })
        res.redirect('/en/settingCookie')
          fs.unlink(`${dpPath}`, (err) => {
            if (err) {
                throw err;
            }
            console.log("File is deleted.");
        })


      }
  }) 

})

server.post('/en/newUserName',async (req, res)=>{
  var userUid = req.cookies.userUid;
  console.log(userUid)
  var newUserName = req.body.username;
  var oldUserName = req.body.oldUserName;
  console.log(newUserName)
  console.log(oldUserName);


 await db.update(db.ref(db.db, `users/${userUid}`),{
    UserName:newUserName
  })

  // var doc = ft.doc(ft.ft, `AllUsers/${username}`);
  // var search = await ft.getDoc(doc).then(async (val)=>{
  //   // console.log(val)
  //   console.log(val.data())
  //   var username = val.data()
  // })

  // const del = await ft.doc(ft.ft, `AllUsers/${oldUserName}`);
  const del = await ft.deleteDoc(ft.doc(ft.ft, `AllUsers/${oldUserName}`))


  const ref = ft.doc(ft.ft,  `AllUsers/${newUserName}`);
    var allUsersData = {
      username: newUserName,
      userUid: userUid
    }
    // addDoc('user', data)
   await ft.setDoc(ref, allUsersData);
  

})
server.get('/en/personal', (req, res)=>{
  res.render('personalInfo.html')
})
  
// routes-end

server.listen(process.env.PORT||5999, () => console.log(`server is online`));


