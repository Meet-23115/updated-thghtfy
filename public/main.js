// const { enableIndexedDbPersistence } = require("firebase/firestore");

// const { async } = require("@firebase/util");

// const { async } = require("@firebase/util");

// const { async } = require("@firebase/util");


   function  signUp() {  
    var username = document.getElementById('sign_up_user_name_input').value;
    var pw = document.getElementById('sign_up_password_input').value;
    var pwC = document.getElementById("sign_up_password_conformation_input").value;
    //check empty password field  
    if(username == "A"|| username == "B"|| username == "C"|| username == "D"|| username == "E"|| username == "F"|| username == "G"|| username == "H"|| username == "I"|| username == "J"|| username == "K"|| username == "L"|| username == "M"|| username == "N"|| username == "O"|| username == "P"|| username == "Q"|| username == "R"|| username == "S"|| username == "T"|| username == "U"|| username == "V"|| username == "W"|| username == "X"|| username == "Y"|| username == "Z"){
      return false;
    }
    if(pw == "") {  
       document.getElementById("message2").innerHTML = "**Fill the password please!";  
       return false;  
    }  
    // if(pw == "A" || pw == "B" || pw == "C" ||pw == "D" ||pw == "E" ||pw == "F" ||pw == "G" ||pw == "H" ||pw == "I" ||pw == "J" ||pw == "K" ||pw == "L" ||pw == "M" ||pw == "N" ||pw == "O" ||pw == "P" ||pw == "Q" ||pw == "R" ||pw == "S" ||pw == "T" ||pw == "U" ||pw == "V" ||pw == "W" ||pw == "X" ||pw == "Y" ||pw == "Z" ){
    //   document.getElementById("message").innerHTML = "**All charactes should be lowercase"
    // }

   //minimum password length validation  
    if(pw.length < 8) {  
       document.getElementById("message2").innerHTML = "**Password length must be atleast 8 characters";  
       return false;  
    }  
  //maximum length of password validation  
    if(pw.length > 15) {  
       document.getElementById("message2").innerHTML = "**Password length must not exceed 15 characters";  
       return false;  
    } if(pw != pwC) { 
       document.getElementById("message2").innerHTML = "**Passwords do not match";
       return false;
    }  else  {
        var  fuserName =  document.getElementById("sign_up_user_name_input").value;
        const userName = fuserName.toLowerCase();
        // const userName = userName.toLowerCase();
        const fullName = document.getElementById("sign_up_full_name_input").value;
        const email = document.getElementById("sign_up_email_input").value;
        const password = document.getElementById("sign_up_password_conformation_input").value;
        var form = document.getElementById("sign_up_form");
        const signUpData = {userName,fullName,email,password};
        const usernameCheck = {
          username:userName
        }
        const options = {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(signUpData)
        };
        
      
        fetch('/en/username', ({
          headers:{
            'Content-Type':'application/json'
          },
          method:'post',
          body:JSON.stringify(usernameCheck)
        })).then(async(res)=>{
          var ans =await res.status
          if(ans==202){
            console.log('UserName is available')
            
            fetch('/en/signUp', options)
           window.location = '/en/addInfo'
            
          }
          if(ans==420){
            console.log('username is not available')
            document.getElementById('message').innerHTML = 'Username is taken'
          }
        })


        return false;


          // var statusArray = []
        
        // fetch('/en/signUp', options).then(async(res)=>{
        //   var ans =await res.json();
        //   // console.log(ans)
        //   console.log(ans)
        //   // await statusArray.push(ans)
        //   // console.log(ans)
        //   if(ans != undefined){
        //     // console.log(ans)
        //     document.getElementById('message').innerHTML = 'Username is taken'
        //     // var data__={
        //     //   ans:false
        //     // }
        //   //  await statusArray.push(data__)
        //       return false;
            
        //   }
        //   else{
        //     // document.forms["sign_up_form"].submit()
        //     window.location = '/en/addInfo'
        //   //  return true;
            
        //   }
        // })




        // if(status!=undefined){
        //   return false;
        // }
        // if(status == undefined){
        //   return true;
        // }
        // return false;
        // // console.log(statusArray)
        // if(status == false){
        //   return false;
        // }
        // if(status == true ){
        //   return true;
        // }
        // return false
    }
  }
  async function addInfo(){
  var dob =await document.getElementById('add_info_dob_input').value;
  
  var gender =await document.querySelector('input[name="GENDER"]:checked').value;
  var pronoun =await document.querySelector('input[name="PRONOUN"]:checked').value;
  console.log(dob, gender, pronoun)
    var data = {
      dob:dob,
      gender:gender,
      pronoun:pronoun
    }
    console.log(data)

   await fetch('/en/addInfo', ({
    headers: {
      'Content-Type': 'application/json'
  },
      method: 'POST',
      body: JSON.stringify(data)
    }))
    return false;
  }


 async function logIn(){
   const email = document.getElementById('log_in_email').value;
   const password = document.getElementById('log_in_password').value;
   
   const logInData =await {email, password};
      console.log(logInData)
     await fetch('/en/login', ({
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(logInData)
    })).then(async(res)=>{
        var ans =await res.json();
        // console.log(ans)
        var prob = ans.problem;
      var uid = ans.userUid;
        if (uid != undefined){
          console.log(uid)
          var loginForm = document.getElementById("log_in_form");
          loginForm.submit();
        }
        if (prob != undefined){
          console.log(prob)
          var message = document.getElementById('loginMessage');
          message.innerHTML = prob
        }

        // var userUid =await ans.userUid;
        // console.log(userUid)
        
        // var problem = ans.problem
        // if (problem != undefined){
        //   document.getElementById('loginMessage').innerHTML = problem;
        //   return false;
        // }
        // else{
        //   document.cookie =await  `userUid=${userUid}`;
      
        // }
      })
      
  }


  
  function uploadDp(){
  
    document.getElementById("upload_dp_form").submit();
        return true;
  };
  
  
  async function upLoadingThought(){
    var uploadedThought = await document.getElementById('posted_thought').value;
    
    console.log(uploadedThought)
    var data = {uploadedThought}
    await fetch('/en/Create_A_Post', ({
      headers: {
        'Content-Type': 'application/json'
    },
      method: 'POST',
      body: JSON.stringify(data)
    })).then((res)=>{
        document.getElementById('createThoughtForm').submit();
      })
    
    // window.location= "/en/home";
   
  }




  function search(){
    var input = document.getElementById('search_input');
    var history = document.getElementById('history');
    var userUsername = window.localStorage.getItem('username')
    // console.log(username)
   console.log(input)
      input.addEventListener('input',async ()=>{
       
        var value = input.value;
        var value = value.toLowerCase();
        
        if(value == ""){
         
          // history.innerText = 'History';
          return true
          
        }
        if(value != ""){
          // history.remove();
          console.log(value)
          var data = {value}
          await fetch('/en/search', ({
            headers: {
              'Content-Type': 'application/json'
          },
            method: 'POST',
            body: JSON.stringify(data)
          })).then( async(res)=>{
            var data =await res.json();
            // console.log(data.users[0])
           var dataArray = data.users;
           console.log(dataArray.length)
           dataArray.forEach(async element => {
            
            var userUid = element.userUid;
            var username = element.username;
            if(username== userUsername){
              console.log(username)
              return true;
            }
            else{
            var link = document.createElement('a');
            link.id = 'contentLinks';
            link.href = `/search/${userUid}`;
            


            var div2 = document.createElement('div');
            div2.id = 'search_result';
            var div3 = document.createElement('div');
            div3.id = 'search_result_dp';
            div2.appendChild(div3);
            var img = document.createElement('img');
            img.id = 'search_result_img';
            img.src = `https://firebasestorage.googleapis.com/v0/b/thghtfy-32891.appspot.com/o/images%2FuserDp-${userUid}.png?alt=media&token=${userUid}`
            div3.appendChild(img);
            var div4 = document.createElement('div');
            div4.id = 'search_result_username_wrapper';
            div2.appendChild(div4);
            var h1 = document.createElement('h1');
            h1.id = 'search_result_username';
            var text = document.createTextNode(username);
            h1.appendChild(text);
            div4.appendChild(h1);
            link.appendChild(div2);
            document.getElementById('search_results').appendChild(link);
              await  input.addEventListener('input', async()=>{
              await div2.remove()
            })

            var follow = document.getElementById('follow_button');
            }
            console.log(username)
            console.log(userUid)

            
           });  
          })  
        }
      })
    }
// async function follow(){
//   // fetch('/user/follow', ({
//   //   method: 'POST'
//   // }))
// }
    
  
  
function updateDp(){
  document.getElementById("update_dp_form").submit();
        return true;
}

function settingClose(){
  var settings = document.getElementById('settings');
  settings.style.width = '0vw';
  settings.style.height = '0vh'
}
