// const { doc } = require("firebase/firestore");

// const { doc } = require("firebase/firestore");


async function settingUp() {
    var userNameDisplay = document.getElementById('profile_username_display');
    var userDpDisplay = document.getElementById('profile_profile_pic');
    var fullNameDisplay = document.getElementById('profile_fullname_display');
    var followerDisplay = document.getElementById('followerCount');
    var followingDIsplay = document.getElementById('followingCount');
await fetch('/en/settingUp').then(async res=>{





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
    setTimeout(function () {
      // after 5 seconds
      window.location = "/en/home";
   }, 1000)
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
  // fetch('/en/umk').then((res)=>{
  //   var data = res.json();
  //   console.log(data.object)
  //   var array = []
  //   array.push(data)
  //   console.log(array.length)
  // })
  console.log('working')
}
function page(){
  window.location = '/en/user'
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
    var userInfo =await data[0];
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
    
    var follow_button = document.getElementById("profile_follow_button");
    follow_button.addEventListener('click', ()=>{
      
        var follow_button = document.getElementById('profile_follow_button');
        follow_button.innerHTML = 'FOLLOWING';
        follow_button.style.backgroundColor = '#ffffff';
        follow_button.style.color ='#d9d9d9'
      
        follow_button.setAttribute('onclick', 'return confirmMessage()')
       fetch('/user/follow', ({
        headers: {
          'Content-Type': 'application/json'
      },
      method:'post',
      body:JSON.stringify(profileData)
       })) 
        
      
    })
  })


  await fetch('/account/q').then(async(res)=>{
    var data = await res.json();
    var q =await data.data[0];
    var follow =await q.follow;
    console.log(follow)
    if(follow == true){
            var followB = document.getElementById('follow_button');
            // console.log('following')
            var follow_button = document.getElementById('profile_follow_button');
            follow_button.innerHTML = 'FOLLOWING';
            follow_button.style.backgroundColor = '#ffffff';
            follow_button.style.color = '#d9d9d9'
             console.log(followB)
            
             followB.setAttribute('onclick', 'return confirmMessage()')
      
          }
    if(follow ==false){
      var followB = document.getElementById('follow_button');
      // console.log('following')
      var follow_button = document.getElementById('profile_follow_button');
      follow_button.innerHTML = 'FOLLOW';
      follow_button.style.backgroundColor = '#d9d9d9';
      follow_button.style.color = 'black'
       console.log(followB)
      
       followB.setAttribute('onclick', 'return follow()')
    }
      

  })
  

 await fetch('/user/thoughts').then(async(res)=>{
    var data =await res.json();
    // console.log(data.thoughts[0])
    var thoughts =await data.thoughts;
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
    
function content(){
  fetch('/en/content').then(async(res)=>{
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
      dp.src = thghtDp;
      div2.appendChild(dp);

      var div3 = document.createElement('div');
      div3.id = 'post_content';
      div1.appendChild(div3);

      var h1 = document.createElement('h1');
      h1.id = 'post_user_name';
      var usernameD = document.createTextNode(userName);
      h1.appendChild(usernameD);
      div3.appendChild(h1);

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