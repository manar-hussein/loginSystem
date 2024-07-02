
let userName =document.querySelector("[name=userName]");
let userEmail =document.querySelector("[name=userEmail]");
let userPassword=document.querySelector("[name=userPasswor]");
let oldUserEmail=document.querySelector("[name=email]");
let oldUserPassword=document.querySelector("[name=password]");
let users=[];

if(localStorage.getItem("users") != null){
     users=JSON.parse(localStorage.getItem("users"));
}

function nameValidation(name){
    let regex=/^[A-Z][A-Za-z]{2,}/;
    if(regex.test(name)){
        userName.style.border="white 1px solid"
        document.getElementById("guidName").classList.add("d-none");
        return true;
    }else
    {
        userName.style.border="red 3px solid"
        document.getElementById("guidName").classList.remove("d-none");
        return false;
    };

};
 document.querySelector("#guidName").addEventListener("input",function(){nameValidation(userName.value)});
   

function usedEmail(input)
{
    let olderUser = users.filter((user,i)=> (input.value ==users[i].email))
    if(olderUser.length !=0){
        return true;
    }else{
        return false
    }
    
};

function isOldUser ()
{
    if(usedEmail(userEmail)){
        document.querySelector("#oldEmail").classList.remove("d-none");
        document.querySelector("[name=userEmail]").style.border="red 3px solid";
        document.getElementById("guidEmail").classList.add("d-none")
        return false
    }else
    {
        if(emailSyntaxValidation())
        {
            document.querySelector("#oldEmail").classList.add("d-none");
            return true;
            
        }else
        {
            document.querySelector("#oldEmail").classList.add("d-none");
            return false;
        }

    }
};


function emailSyntaxValidation ()
{
    let regex=/^.+(yahoo|gmail)\.com$/
    if(regex.test(userEmail.value)){
        userEmail.style.border="solid 1px white";
      document.getElementById("guidEmail").classList.add("d-none")
      return true;
    }else{
        userEmail.style.border="solid 3px red";
        document.getElementById("guidEmail").classList.remove("d-none")
        return false;

    }
};

function passwordValidation ()
{
    let regex=/^(?=.*\d)(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(regex.test(userPassword.value))
    {
        userPassword.style.border="1px white solid";
        document.getElementById("guidPassword").classList.add("d-none");
        return true;
    }else
    {
        userPassword.style.border="3px red solid";
        document.getElementById("guidPassword").classList.remove("d-none");
        return false;
    }
};
document.querySelector("[name=userPasswor]").addEventListener("input",passwordValidation);


function addUser ()
{
   if(nameValidation(userName.value)  && isOldUser() && passwordValidation() ){
    let user={
        name:userName.value,
        email:userEmail.value,
        password:userPassword.value,
       };
         users.push(user);
      localStorage.setItem("users",JSON.stringify(users));

      signIn();
   }
};



document.querySelector(".BtnSignUp").addEventListener("click",addUser);
userName.addEventListener("input",function(){nameValidation(userName.value)});


document.querySelector(".signInBtn").addEventListener("click",signIn);
function signUp ()
{
    document.querySelector("#signUp").classList.replace("d-none" , "d-block");
    document.querySelector(".login").classList.replace("d-block","d-none");
};
document.querySelector(".signUpBtn").addEventListener("click",signUp);

function signIn ()
{
   document.querySelector("#signUp").classList.replace("d-block" , "d-none");
   document.querySelector(".login").classList.replace("d-none","d-block");

};


document.querySelector(".loginBtn").addEventListener("click",logIn);
function logIn ()
{
    let currentUserIndex ;
    users.filter(function(user,i){
        if(users[i].email == oldUserEmail.value)
        {
            currentUserIndex=i;
            document.querySelector("[name=email]").style.border="white 1px solid";
            document.getElementById("wrongEmail").classList.add("d-none");
        }
    })
    console.log(currentUserIndex);
    try {
        if(oldUserPassword.value == users[currentUserIndex].password)
        {   
          
            oldUserPassword.style.border="white 1px solid";
            document.getElementById("password").classList.add("d-none");
            window.open("home.html","_self");
            return true;
        }else
        {
            oldUserPassword.style.border="red 3px solid";
            document.getElementById("password").classList.remove("d-none");
            return false;
        };
    } catch (error) {
        oldUserPassword.style.border="white 1px solid";
        document.getElementById("password").classList.add("d-none");
        document.querySelector("[name=email]").style.border="red 3px solid";
        document.getElementById("wrongEmail").classList.remove("d-none");
        return false;
        
    };
  
};






