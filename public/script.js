// 17-10-23
// const { doc } = require("firebase/firestore");

// const { CONSTANTS } = require("@firebase/util");

// const { doc } = require("firebase/firestore");




// const { async } = require("@firebase/util");

// const { doc } = require("firebase/firestore");


async function settingUp() {
    var userNameDisplay = document.getElementById('profile_username_display');
    var userDpDisplay = document.getElementById('profile_profile_pic');
    var fullNameDisplay = document.getElementById('profile_fullname_display');
    var followerDisplay = document.getElementById('followerCount');
    var followingDIsplay = document.getElementById('followingCount');
await fetch('/en/settingUp').then(async res=>{


document.getElementById('skeletonUsername').remove()
document.getElementById('skeletonFullname').remove()
document.getElementById('skeletonFollowers').remove()
document.getElementById('skeletonFollowing').remove()


    var data = await (res.json())
      console.log(data)
      var userName =await data.data.UserName;
      console.log(userName)
      var fullName =await data.data.fullName;
      var followerCount =await data.data.followers.followers;
      var followingCount =await data.data.following.following;
      // var additionalInfo = await data.data.additionalInfo;
      // console.log(additionalInfo)
      // var dob = additionalInfo.pronoun;
      // var pronoun = 
      // var mediaToken = data.mt
      var uid = data.data.uid
      userNameDisplay.innerHTML = userName;
      fullNameDisplay.innerHTML =await fullName;
      followerDisplay.innerHTML =await followerCount;
      followingDIsplay.innerHTML =await followingCount;      
      userDpDisplay.src =await `https://firebasestorage.googleapis.com/v0/b/thghtfy-32891.appspot.com/o/images%2FuserDp-${uid}.png?alt=media&token=${uid}`  
      
      
           console.log(userNameDisplay.innerHTML)
})

await fetch('/thoughts').then(async res=>{
  document.getElementById('skeletonPosts').remove()
    var data = await (res.json());
    console.log(data)
    var dataLength = data.length;
    console.log(dataLength)
    if(dataLength == 0){
      var message = document.getElementById('profile_page_message');
      message.innerHTML = 'NO THOUGHTS UPLOADED YET'
    }
    else{
      data.forEach(element => {
        console.log(element.thought);
        var thoughtContent = element.thought;
        var thoughtUsername = element.username;
        var thoughtUid = element.useruid;

        
        const postDiv2 = document.createElement('div');
        postDiv2.id = 'profile_post';
        

        const postDiv3 = document.createElement('div');
        postDiv3.id = 'profile_post_dp';
        postDiv2.appendChild(postDiv3);

        const postImg = document.createElement('img');
        postImg.className = 'profile_post_dp';
        postImg.src = `https://firebasestorage.googleapis.com/v0/b/thghtfy-32891.appspot.com/o/images%2FuserDp-${thoughtUid}.png?alt=media&token=${thoughtUid}` 
        postDiv3.appendChild(postImg);

        const postDiv4 = document.createElement('div');
        postDiv4.id = 'profile_post_content';
        postDiv2.appendChild(postDiv4);

        const postDiv5 = document.createElement('div');
        postDiv5.id = 'profile_post_username';
        postDiv4.appendChild(postDiv5);

        const postH1 = document.createElement('h1');
        postH1.className = 'profile_post_username';
        const postUsername = document.createTextNode(thoughtUsername);
        postH1.appendChild(postUsername);
        postDiv5.appendChild(postH1);
        const postDiv6 = document.createElement('div');
        postDiv6.id = 'profile_post_thought';
        const postData = document.createTextNode(thoughtContent);
        postDiv6.appendChild(postData);
        postDiv4.appendChild(postDiv6);
        const thoughtHolder = document.getElementById('profile_posted_thought');
        thoughtHolder.appendChild(postDiv2) 
    });
    }
    
})

return  console.log('fuck up the fun');

}


async function loading(){
  // await fetch('/en/test')

  

  fetch('/settingData').then(async(res)=>{
      var data =await res.json()
      var username = data.userName;
      var fullName = data.fullName;
      // console.log(username)
      var userData = {
        username:username,
        fullName:fullName
      }
      window.localStorage.setItem('username', username)
      window.localStorage.setItem('fullName', fullName)
      // var username = window.localStorage.getItem('username')
      // var fullName = window.localStorage.getItem('fullName')
      // console.log(username, fullName)
         
 
  })

  // if('geolocation' in navigator){
  //   await navigator.geolocation.getCurrentPosition(async(position)=>{
  //     console.log(position.coords.latitude)
  //     console.log(position.coords.longitude)

  //     var username = window.localStorage.getItem('username')
  //     var lon = position.coords.longitude;
  //     var lat = position.coords.latitude;
      
  //     var coords = {
  //       lon:lon,
  //       lat:lat,
  //       username:username
  //     }
  //   })
  // } else{
  //   console.log('no it is not')
  // }


  function getCoordintes() {
    console.log('i aint fly')
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
  
    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;
  
    }
  
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    navigator.geolocation.getCurrentPosition(success, error, options);
}
  
// Step 2: Get city name
function getCity(coordinates) {
  console.log('flyyy')
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
  
    // Paste your LocationIQ token below.
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.80b680017f519a9431e7b49e89f534c1&lat=" +
    lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
  
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            var address = response.address;
            // var username = window.localStorage.getItem('username')
            window.sessionStorage.setItem('location', `${city}`)
            console.log(city)
            // console.log(address)
           
            return;
        }
    }
}
  
  getCoordintes()

  setTimeout(function(){
    var location = window.sessionStorage.getItem('location');
var username = window.localStorage.getItem('username');
  
var data = {
  city:location,
  username:username
}

console.log(`this is the city ${location}`);

fetch('/location', ({
  headers:{
    'Content-Type': 'application/json'
  },
  method:'post',
  body:JSON.stringify(data)
}))
window.sessionStorage.removeItem('location')

fetch('/en/recom',  ({
  headers:{
    'Content-Type': 'application/json'
  },
  method:'post',
  body:JSON.stringify(data)
}))
  }, 5000)
  
  
    await setTimeout(function () {
      // after 5 seconds
      window.location = "/en/home";
   }, 5500)
  //  console.log('still fetched')
   
}
  function expand(){
    // var Idiv = document.getElementById('home_header_link');
    var Ddiv = document.getElementById('home_header_logo_img');
    var ext = document.getElementById('home_header_link_ext');
    var nml = document.getElementById('home_header_link');
    nml.style.width = '140%';
    Ddiv.style.height = '60%';
    ext.style.display = 'flex';
    nml.style.display = 'none'
    
  }
  function shrink(){
    var Ddiv = document.getElementById('home_header_logo_img');
    var ext = document.getElementById('home_header_link_ext');
    var nml = document.getElementById('home_header_link');
    nml.style.width = '60%';
    Ddiv.style.height = '100%';
    ext.style.display = 'none';
    nml.style.display = 'flex'
  }
function umk(){
  console.log('working')
  fetch('/')
}
function page(){
  window.location = '/en/user'
}

function closeSearch(){
  console.log('close the search')
  var holder = document.getElementById('search_input_holder');
  holder.style.width = '100%'

  document.getElementById('search_result_wrapper').remove()
  document.getElementById('closeSearch').remove()
}


 async function user(){
 await  fetch('/account/setup').then(async(res)=>{
    var data =await res.json();

// location.reload();
    console.log(data)
    // console.log(data.data[0])
//     var question = data.data[0];
//     var follow = question.follow;
//     console.log(follow);
//     
// // 
    var userInfo =await data[1];
    var username = userInfo.UserName;
    var fullName = userInfo.fullName;
    var userUid = userInfo.uid;
    var dp = `https://firebasestorage.googleapis.com/v0/b/thghtfy-32891.appspot.com/o/images%2FuserDp-${userUid}.png?alt=media&token=${userUid}` 
    var followC =  userInfo.followers.followers;
    var followingC =  userInfo.following.following;



    var usernameD = document.getElementById('profile_username_display');
    usernameD.innerHTML =await username;

    var fullNameD = document.getElementById('profile_fullname_display');
    fullNameD.innerHTML =await fullName;

    var profileDp = document.getElementById('profile_profile_pic');
    profileDp.src =await dp;

    var followD = document.getElementById('followerCount');
    followD.innerHTML =await followC;

    var followingD = document.getElementById('followingCount');
    followingD.innerHTML = await followingC;

    var profileData = {
      profileUid: userUid,
      profileUserName: username

    }
    
    
    var q =await data[0];
    var follow =await q.follow;
    // console.log(follow)
    if(follow == true){
            var followB = document.getElementById('follow_button');
            // console.log('following')
            var follow_button = document.getElementById('profile_follow_button');
            follow_button.innerHTML = 'FOLLOWING';
            follow_button.style.backgroundColor = '#ffffff';
            follow_button.style.color = '#d9d9d9'
             console.log(followB)
            console.log(follow_button)
             followB.setAttribute('onclick', 'return confirmMessage()')
      
          }
    if(follow ==false){
      
      // var followB = document.getElementById('follow_button');
      // // console.log('following')
      // var follow_button = document.getElementById('profile_follow_button');
      // follow_button.innerHTML = 'FOLLOW';
      // follow_button.style.backgroundColor = '#d9d9d9';
      // follow_button.style.color = 'black'
      //  console.log(followB)
      var follow_button = document.getElementById("profile_follow_button");
    follow_button.addEventListener('click',async ()=>{
      
        var follow_button = document.getElementById('profile_follow_button');
        follow_button.innerHTML = 'FOLLOWING';
        follow_button.style.backgroundColor = '#ffffff';
        follow_button.style.color ='#d9d9d9'
      
        follow_button.setAttribute('onclick', 'return confirmMessage()')
       await fetch('/user/follow', ({
        headers: {
          'Content-Type': 'application/json'
      },
      method:'post',
      body:JSON.stringify(profileData)
       })) 


       
        return true
      
    })
      //  followB.setAttribute('onclick', 'return follow()')
    }

    var thoughts =await data[2];
    console.log(thoughts)
   //  var ans = [data]
   //   // console.log(ans[0])
   //   var que = ans[0]
   //   console.log(que.)
 
   await  thoughts.forEach(element => {
       console.log(element.thought);
       var thoughtContent = element.thought;
       var thoughtUsername = element.username;
       var thoughtUid = element.useruid;
   
       
       const postDiv2 = document.createElement('div');
       postDiv2.id = 'profile_post';
       
   
       const postDiv3 = document.createElement('div');
       postDiv3.id = 'profile_post_dp';
       postDiv2.appendChild(postDiv3);
   
       const postImg = document.createElement('img');
       postImg.className = 'profile_post_dp';
       postImg.src = `https://firebasestorage.googleapis.com/v0/b/thghtfy-32891.appspot.com/o/images%2FuserDp-${thoughtUid}.png?alt=media&token=${thoughtUid}` 
       postDiv3.appendChild(postImg);
   
       const postDiv4 = document.createElement('div');
       postDiv4.id = 'profile_post_content';
       postDiv2.appendChild(postDiv4);
   
       const postDiv5 = document.createElement('div');
       postDiv5.id = 'profile_post_username';
       postDiv4.appendChild(postDiv5);
   
       const postH1 = document.createElement('h1');
       postH1.className = 'profile_post_username';
       const postUsername = document.createTextNode(thoughtUsername);
       postH1.appendChild(postUsername);
       postDiv5.appendChild(postH1);
       
       const postDiv6 = document.createElement('div');
       postDiv6.id = 'profile_post_thought';
       const postData = document.createTextNode(thoughtContent);
       postDiv6.appendChild(postData);
       postDiv4.appendChild(postDiv6);
       
       const thoughtHolder = document.getElementById('profile_posted_thought');
       thoughtHolder.appendChild(postDiv2)
       return true;
     })
  })
}




function confirmMessage(){
  var span = document.getElementById("confirmMessage");

  var div1 = document.createElement('div');
  div1.id = 'confirm_message';

  var div2 = document.createElement("div");
  div2.id = 'confirmMessageHolder';
  div1.appendChild(div2);

  var div3 = document.createElement("div");
  div3.id = "confirmMessageWrapper";
  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.id = "confirmMessageH";
  div4.innerHTML = "UNFOLLOW THIS USER?";
  div3.appendChild(div4);

  var div5= document.createElement("div");
  div5.id="confirmMessageA";
  div3.appendChild(div5);

  var div6 = document.createElement("div");
  div6.id = "confirmMessageY";
  div6.innerHTML = "YES"
  div6.setAttribute('onclick', 'return unfollow()');
  div5.appendChild(div6)


  var div7 = document.createElement("div");
  div7.id = "confirmMessageN";
  div7.innerHTML = "NO"
  div7.setAttribute('onclick', 'return closeMessage()')
  div5.appendChild(div7)

  span.appendChild(div1)
}

function closeMessage(){
  var span = document.getElementById("confirmMessage");
  var div =  document.getElementById("confirm_message");
  span.removeChild(div)
  // var following = document.
}
function follow(){
  
}
  function unfollow(){
    console.log('unfollowed')
    // var button = document.getElementById('follow_button');
    
    var followB = document.getElementById('follow_button');
    var follow_button = document.getElementById('profile_follow_button');
    follow_button.innerHTML = 'FOLLOW';
    follow_button.style.backgroundColor = '#D9D9D9';
    follow_button.style.color = 'black'
            followB.setAttribute = ('onclick', 'return follow()');
      
           

    fetch('/en/unfollow')
    closeMessage();
  }
  function newUser(){
    
  }
    
function content(){
  // window.localStorage.setItem('newUser', true)
  var username = window.localStorage.getItem('username')
  var newUser = window.localStorage.getItem('newUser');
  console.log(username)
  console.log(newUser)
  if (newUser == 'true' ){
    console.log('this is a new user')
    // first ins
    var ins1 = document.createElement('div')
    ins1.id = 'newUserInsWrapper1'

    var ins1A = document.createElement('div')
    ins1A.id = 'newUserInsArrow'
    ins1.appendChild(ins1A);

    var ins1B = document.createElement('div')
    ins1B.id = 'newUserInsBox';

    var ins1Bp = document.createElement('p')
    var text = 'Click to share your thoughts'
    var textNode = document.createTextNode(text)
    ins1Bp.appendChild(textNode)
    ins1B.appendChild(ins1Bp)

    var ins1Ba = document.createElement('a')
    ins1Ba.id = 'next_ins1'
    ins1Ba.className = 'next_ins'
    ins1Ba.innerHTML = 'Next'
    ins1B.appendChild(ins1Ba)

    ins1.appendChild(ins1B)
    document.getElementById('homePageBody').appendChild(ins1)

    var next = document.getElementById('next_ins1')
    next.addEventListener('click', ()=>{
      console.log('this is a new user')
      document.getElementById('newUserInsWrapper1').remove();
      // second ins
      var ins1 = document.createElement('div')
      ins1.id = 'newUserInsWrapper2'
  
      var ins1A = document.createElement('div')
      ins1A.id = 'newUserInsArrow2'
      ins1.appendChild(ins1A);
  
      var ins1B = document.createElement('div')
      ins1B.id = 'newUserInsBox';
  
      var ins1Bp = document.createElement('p')
      var text = 'Click for more options'
      var textNode = document.createTextNode(text)
      ins1Bp.appendChild(textNode)
      ins1B.appendChild(ins1Bp)
  
      var ins1Ba = document.createElement('a')
      ins1Ba.id = 'next_ins2'
      ins1Ba.className = 'next_ins'
      ins1Ba.innerHTML = 'Next'
      ins1B.appendChild(ins1Ba)
  
      ins1.appendChild(ins1B)
      // console.log(ins1)
      document.getElementById('homePageBody').appendChild(ins1)
  
      // var next1 = document.getElementById('next_ins1')
      var next = document.getElementById('next_ins2')
      next.addEventListener('click', ()=>{
        console.log('this is a new user')
        document.getElementById('newUserInsWrapper2').remove();
        // third ins
        expand()
        var ins1 = document.createElement('div')
        ins1.id = 'newUserInsWrapper3'
    
        var ins1A = document.createElement('div')
        ins1A.id = 'newUserInsArrow3'
        ins1.appendChild(ins1A);
    
        var ins1B = document.createElement('div')
        ins1B.id = 'newUserInsBox';
    
        var ins1Bp = document.createElement('p')
        var text = 'Click to go to profile'
        var textNode = document.createTextNode(text)
        ins1Bp.appendChild(textNode)
        ins1B.appendChild(ins1Bp)
    
        var ins1Ba = document.createElement('a')
        ins1Ba.id = 'next_ins3'
        ins1Ba.className = 'next_ins'
        ins1Ba.innerHTML = 'Next'
        ins1B.appendChild(ins1Ba)
    
        ins1.appendChild(ins1B)
        // console.log(ins1)
        document.getElementById('homePageBody').appendChild(ins1)
    
        var next = document.getElementById('next_ins3')

        next.addEventListener('click', ()=>{
          console.log('this is a new user')
          document.getElementById('newUserInsWrapper3').remove();

          // fourth ins
          var ins1 = document.createElement('div')
          ins1.id = 'newUserInsWrapper4'
      
          var ins1A = document.createElement('div')
          ins1A.id = 'newUserInsArrow4'
          ins1.appendChild(ins1A);
      
          var ins1B = document.createElement('div')
          ins1B.id = 'newUserInsBox';
      
          var ins1Bp = document.createElement('p')
          var text = 'click to search users'
          var textNode = document.createTextNode(text)
          ins1Bp.appendChild(textNode)
          ins1B.appendChild(ins1Bp)
      
          var ins1Ba = document.createElement('a')
          ins1Ba.id = 'next_ins4'
          ins1Ba.className = 'next_ins'
          ins1Ba.innerHTML = 'NEXT'
          ins1B.appendChild(ins1Ba)
      
          ins1.appendChild(ins1B)
          // console.log(ins1)
          document.getElementById('homePageBody').appendChild(ins1)
      
          var next = document.getElementById('next_ins4')
          next.addEventListener('click', ()=>{

            document.getElementById('newUserInsWrapper4').remove();
            shrink();
            window.localStorage.removeItem('newUser')
            window.location = '/en/recom'

            // window.localStorage.removeItem('newUser')

            // var recomDiv = document.createElement('div');
            // recomDiv.id = 'reccomedation'

            // var div1 = document.createElement('div');
            // div1.id = 'recomHeading';
            // recomDiv.appendChild(div1);

            // var h1 = document.createElement('h1');
            // var text1 = 'RECCOMENDATION'
            // var textnode1 = document.createTextNode(text1);
            // h1.appendChild(textnode1);
            // div1.appendChild(h1)

            // var div2 = document.createElement('div');
            // div2.id = 'recomWrapper'
            // recomDiv.appendChild(div2);

            

            // document.getElementById('homePageBody').appendChild(recomDiv)


            

           
            // var button = document.getElementById('recomEndB')
            // button.addEventListener(('click'), ()=>{
            //   document.getElementById('reccomedation').remove()
            // })




          })

        

      })
    })
    
    })
      
   
    // var next = document.getElementById('next_ins3');
    // next.addEventListener('click', ()=>{
    //   console.log('I am confuseed')
    //   document.getElementById('newUserInsWrapper3').remove();
    //   var ins1 = document.createElement('div')
    //   ins1.id = 'newUserInsWrapper4'
  
    //   var ins1A = document.createElement('div')
    //   ins1A.id = 'newUserInsArrow4'
    //   ins1.appendChild(ins1A);
  
    //   var ins1B = document.createElement('div')
    //   ins1B.id = 'newUserInsBox';
  
    //   var ins1Bp = document.createElement('p')
    //   var text = 'Click for more options'
    //   var textNode = document.createTextNode(text)
    //   ins1Bp.appendChild(textNode)
    //   ins1B.appendChild(ins1Bp)
  
    //   var ins1Ba = document.createElement('a')
    //   ins1Ba.id = 'next_ins4'
    //   ins1Ba.className = 'next_ins'
    //   ins1Ba.innerHTML = 'Next'
    //   ins1B.appendChild(ins1Ba)
  
    //   ins1.appendChild(ins1B)
    //   document.getElementById('homePageBody').appendChild(ins1)
  
    //   // var next1 = document.getElementById('next_ins1')
    // })
  }

  fetch('/en/content').then(async(res)=>{
    document.getElementById("homeSkeletonContainer").remove()

    var data =await res.json();
    var thght = data.thoughts;
    thght.forEach(element => {
      console.log(element)
      var thought = element.thought;
      var userName = element.uploadederUserName;
      var thoughtUid = element.uploaderId;
      var thghtDp = `https://firebasestorage.googleapis.com/v0/b/thghtfy-32891.appspot.com/o/images%2FuserDp-${thoughtUid}.png?alt=media&token=${thoughtUid}` 
      
      var div1 = document.createElement('div');
      div1.id = 'post_container';

      var div2 = document.createElement('div');
      div2.id = 'post_dp';
      div1.appendChild(div2);

      var dp = document.createElement('img');
      dp.id = 'home_posts_dp';
      dp.className = 'skeleton'
      dp.src = thghtDp;
      div2.appendChild(dp);

      var div3 = document.createElement('div');
      div3.id = 'post_content';
      div1.appendChild(div3);

    
      var link= document.createElement('a');
      if(userName == username){
       link.href = '/en/profile' 
      }
      else{
        link.href =`/search/${thoughtUid}`
      }
      
      link.id = 'contentLinks'
      var h1 = document.createElement('h1');
      h1.id = 'post_user_name';
      var usernameD = document.createTextNode(userName);
      
      h1.appendChild(usernameD);
      link.appendChild(h1);
      div3.appendChild(link)
      

      var p = document.createElement('p');
      p.id = 'post_thought';
      var thoughtC = document.createTextNode(thought);
      p.appendChild(thoughtC);
      div3.appendChild(p);

      var main= document.getElementById('home_posts');
      main.appendChild(div1);


      
    });


  })

}
async function umk(){
  fetch('/en/reccomend').then(async(res)=>{
    document.getElementById('recomSkeletons').remove()
             
    // console.log(res.json())
    var data =await res.json()
    // console.log(data)
    var recomends =await data.recomends
    console.log(recomends)
    if (recomends.length ==0){

      var norecom = document.createElement('div')
      norecom.innerHTML = 'NO RECCOMENDATIONS'
      norecom.id = 'noRecomMessage'
      document.getElementById('recomWrapper').appendChild(norecom)
      
      console.log('no recom')
    }
    else{
      await recomends.forEach(element => {
        var username = element.username;
        var userUid = element.userUid;
        // console.log(element)
        var div1 = document.createElement('div');
        div1.id = 'recom'
  
        var div2 = document.createElement('div');
        div2.id = 'recomLeft';
        
  
        var a1 = document.createElement('a')
        a1.id = 'recomLink'
        a1.href = `/search/${userUid}`
  
        var dp = document.createElement('img')
        dp.id = 'recomDp'
        dp.className = 'skeleton'
        dp.src = `https://firebasestorage.googleapis.com/v0/b/thghtfy-32891.appspot.com/o/images%2FuserDp-${userUid}.png?alt=media&token=${userUid}` 
        a1.appendChild(dp)
        div2.appendChild(a1);
        div1.appendChild(div2);
  
        var div3 = document.createElement('div')
        div3.id = 'recomMiddle'
  
        var a2 = document.createElement('a')
        a2.href = `/search/${userUid}`
        a2.id = 'recomLink'
  
        var div4 = document.createElement('div')
        div4.id= 'recomnames'
  
        var h1 = document.createElement('h1')
        var text = document.createTextNode(username)
        h1.appendChild(text)
        h1.id = 'recomUsername'
  
        var h2 = document.createElement('h1')
        h2.id = 'recomFullName'
  
        div4.appendChild(h1)
        div4.appendChild(h2)
        a2.appendChild(div4)
        div3.appendChild(a2)
        div1.appendChild(div3)
  
        var div5 = document.createElement('div')
        div5.id = 'recomRight'
  
        var followLink = document.createElement('a')
        followLink.id = 'followLink'
        followLink.href = `/recom/follow/${userUid}/${username}`
        followLink.setAttribute('onclick', 'return followedRecom()')
  
       
  
  
        console.log(followLink)
        var div6 = document.createElement('div')
  
  
        div6.id = 'recomFollow'
        div6.innerHTML = 'FOLLOW'
  
        followLink.appendChild(div6)
        div5.appendChild(followLink)

        var  removeLink = document.createElement('a')
        removeLink.id = 'removeRecom'
        removeLink.href = `/umk/remove/${userUid}/${username}`;

        var recomRemove = document.createElement('div')
        recomRemove.id = 'recomRemove'
        recomRemove.innerHTML = 'X'

        removeLink.appendChild(recomRemove)
        div5.appendChild(removeLink)
        
        
        div1.appendChild(div5)

        removeLink.addEventListener('click', ()=>{
          div1.remove();
        })
        followLink.addEventListener('click', ()=>{
          div6.innerHTML = 'FOLLOWING'
          window.location = '/en/search'
          
        })
  
        document.getElementById('recomWrapper').appendChild(div1)
      });
    }

   



    var end = document.createElement('div')
    end.id= 'recomEnd'

    var skip = document.createElement('a')
    skip.id = 'recomEndB'
    skip.setAttribute('href', '/en/home')
    skip.innerHTML = 'SKIP'
    console.log(skip)

    // skip.onclick(()=>{
    //   document.getElementById('reccomedation').remove()
    // })

    end.appendChild(skip)

    document.getElementById('reccomedation').appendChild(end)

     
  })

}

async function recommend(){

  fetch('/en/reccomend').then(async(res)=>{
              
             
    // console.log(res.json())
    var data =await res.json()
    // console.log(data)
    var recomends =await data.recomends
    console.log(recomends)
    if (recomends.length ==0){

      var norecom = document.createElement('div')
      norecom.innerHTML = 'NO RECCOMENDATIONS'
      norecom.id = 'noRecomMessage'
      document.getElementById('recomWrapper').appendChild(norecom)
      
      console.log('no recom')
    }
    else{
      await recomends.forEach(element => {
        var username = element.username;
        var userUid = element.userUid;
        // console.log(element)
        var div1 = document.createElement('div');
        div1.id = 'recom'
  
        var div2 = document.createElement('div');
        div2.id = 'recomLeft';
        
  
        var a1 = document.createElement('a')
        a1.id = 'recomLink'
        a1.href = `/search/${userUid}`
  
        var dp = document.createElement('img')
        dp.id = 'recomDp'
        dp.src = `https://firebasestorage.googleapis.com/v0/b/thghtfy-32891.appspot.com/o/images%2FuserDp-${userUid}.png?alt=media&token=${userUid}` 
        a1.appendChild(dp)
        div2.appendChild(a1);
        div1.appendChild(div2);
  
        var div3 = document.createElement('div')
        div3.id = 'recomMiddle'
  
        var a2 = document.createElement('a')
        a2.href = `/search/${userUid}`
        a2.id = 'recomLink'
  
        var div4 = document.createElement('div')
        div4.id= 'recomnames'
  
        var h1 = document.createElement('h1')
        var text = document.createTextNode(username)
        h1.appendChild(text)
        h1.id = 'recomUsername'
  
        var h2 = document.createElement('h1')
        h2.id = 'recomFullName'
  
        div4.appendChild(h1)
        div4.appendChild(h2)
        a2.appendChild(div4)
        div3.appendChild(a2)
        div1.appendChild(div3)
  
        var div5 = document.createElement('div')
        div5.id = 'recomRight'
  
        var followLink = document.createElement('a')
        followLink.id = 'followLink'
        followLink.href = `/recom/follow/${userUid}/${username}`
        followLink.setAttribute('onclick', 'return followedRecom()')
  
       
  
  
        console.log(followLink)
        var div6 = document.createElement('div')
  
  
        div6.id = 'recomFollow'
        div6.innerHTML = 'FOLLOW'
  
        followLink.appendChild(div6)
        div5.appendChild(followLink)

        var  removeLink = document.createElement('a')
        removeLink.id = 'removeRecom'
        removeLink.href = `/recom/remove/${userUid}/${username}`;

        var recomRemove = document.createElement('div')
        recomRemove.id = 'recomRemove'
        recomRemove.innerHTML = 'X'

        removeLink.appendChild(recomRemove)
        div5.appendChild(removeLink)
        
        
        div1.appendChild(div5)

        removeLink.addEventListener('click', ()=>{
          div1.remove();
        })
        followLink.addEventListener('click', ()=>{
          div6.innerHTML = 'FOLLOWING'
          
        })
  
        document.getElementById('recomWrapper').appendChild(div1)
      });
    }

   



    var end = document.createElement('div')
    end.id= 'recomEnd'

    var skip = document.createElement('a')
    skip.id = 'recomEndB'
    skip.setAttribute('href', '/en/home')
    skip.innerHTML = 'SKIP'
    console.log(skip)

    // skip.onclick(()=>{
    //   document.getElementById('reccomedation').remove()
    // })

    end.appendChild(skip)

    document.getElementById('reccomedation').appendChild(end)

     
  })

}


async function recomEnd(){
  window.location =await '/en/home'
  console.log('button is pressed')
  // window.localStorage.removeItem('newUser')
}
function logOut(){
  
  fetch('/en/logOut').then(()=>{
    window.location = '/en/signUp'
  })
}

async function settings(){
  await fetch('/en/settingUp').then(async res=>{

    var picDisplay = document.getElementById('profile_profile_pic')
    var userNameD = document.getElementById("userNameD")
    var dobD = document.getElementById("dobD");
    var genderD = document.getElementById("genderD");
    var pronounsD = document.getElementById("pronounsD")




    var data = await (res.json())
      console.log(data)
      var userName =await data.data.UserName;
      // console.log(userName)
      var fullName =await data.data.fullName;
      var followerCount =await data.data.followers.followers;
      var followingCount =await data.data.following.following;
      var additionalInfo = await data.data.additionalInfo;
      console.log(additionalInfo)
      var dob = additionalInfo.dob;
      var gender = additionalInfo.gender;
      var pronoun = additionalInfo.pronoun;
      // var pronoun = 
      // var mediaToken = data.mt
      var uid = data.data.uid;
      var profilePic = `https://firebasestorage.googleapis.com/v0/b/thghtfy-32891.appspot.com/o/images%2FuserDp-${uid}.png?alt=media&token=${uid}`; 

      picDisplay.src = profilePic;
      userNameD.innerHTML = userName;
      // dobD.innerHTML = dob;
      // genderD.innerHTML = gender;
      // pronounsD.innerHTML = pronoun;


  });

}

function updateDp(){
  window.location = '/en/updateDp'
}
function updateUserName(){
  document.getElementById("userNamechange").style.height = '100px'
   var wrapper = document.getElementById('userNameChangeWrapper');
   var div = document.getElementById('username_change_button')
   
   var input = document.createElement('input');
   input.id = 'updateUserName';
   input.type = 'text';
   input.name = 'newUserName';
   input.setAttribute('autocomplete', 'off')
   input.placeholder = 'NEW USER NAME'

   div.innerHTML = '';
   div.appendChild(input)
   div.onclick = ''

   var change = document.createElement('div');
   change.id = 'changeUserNameBWrapper';
   var submit = document.createElement('input');
   submit.type = 'button';
   submit.value = 'CHANGE';
   submit.id = 'changeUserNameButton';

   var message = document.createElement('span');
   message.id = 'message';
   

   
   submit.setAttribute('onclick', "return newUserName()");
   change.appendChild(submit);
   wrapper.appendChild(message)
   wrapper.appendChild(change);
  //  console.log(wrapper)
  var main = document.getElementById('userNamechange');
  console.log(main)

}
 function newUserName(){
  var oldUserName = document.getElementById('userNameD').innerHTML;
  console.log(oldUserName);
  var input = document.getElementById("updateUserName").value;
  var input = input.toLowerCase();
  var inputLength = input.length;

  if(input == ''){
    document.getElementById('message').innerHTML = 'USER NAME CAN NOT BE EMPTY'
  }
  if(inputLength > 14){
    document.getElementById('message').innerHTML = 'USERNAME CANNOT EXCEED 14 CHARACTERS'
  }
  else{ 
    
  const usernames = {
    username:input,
    oldUserName:oldUserName
  }
  const usernameCheck = {
    username:input
  }
  fetch('/en/username', ({
    headers: {
      'Content-Type': 'application/json'
  },
  method:'post',
  body:JSON.stringify(usernameCheck)
  })).then((res)=>{
    console.log(res.status)
    var status = res.status;
    if(status == 420){
      document.getElementById('message').innerHTML = 'USER NAME IS NOT AVAILABLE'
      
    }
    if(status == 202){
      document.getElementById('message').innerHTML = ''
      fetch('/en/newUserName', ({
        headers:{
          'Content-Type': 'application/json'
        },
        method:'post',
        body:JSON.stringify(usernames)
      }))
      window.location = '/en/settings'
    }
  })
  } 
}

async function personalInfo(){
  console.log('khumbaya my lord')
  window.location = '/en/personal'
}
function profileFollowers(){
  fetch('/profile/followers')

}
function profileFollowing(){
  fetch('/profile/following')
  
}