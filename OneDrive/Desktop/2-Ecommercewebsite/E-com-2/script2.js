

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBbiktU_wn2gJTBwwhXSisdcxywVTVmdqs",
    authDomain: "cara-e-com.firebaseapp.com",
    projectId: "cara-e-com",
    storageBucket: "cara-e-com.firebasestorage.app",
    messagingSenderId: "600804713774",
    appId: "1:600804713774:web:4dcdfc671bfd5e76f706bf"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  let isload = false

 function register(params) {

    const email = document.querySelector('.re-email').value
    const password = document.querySelector('.re-password').value
    const confirmPassword = document.querySelector('.re-confirmPassword').value

    const errfeild = document.querySelector('.errMsg')
    errfeild.innerText =''
    errfeild.style.color = "red"
    errfeild.style.textAlign = "center"

 
const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


 if (email.length === 0) {
    errfeild.innerText = 'pleace enter email '
 }
 else if(!emailRegex.test(email)){
    errfeild.innerText = 'Innvalid Email'
 }
 else if(password.length === 0 || confirmPassword.length === 0){
    errfeild.innerText = 'Password and Confirm password are requried'
 }
 else if(confirmPassword !== password){
    errfeild.innerText = 'Password and Confirm password not match'
 }
 else {
    alert('Register Process')

isload = true
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    isload = false
    // Signed up 
    const user = userCredential.user;

    errfeild.style.color = "green"
    errfeild.innerText = "Register Success"
    // ...

    localStorage.setItem("user :", user.accessToken)
    localStorage.setItem("user:", user.email)
    // new page
    window.location.href = 'home.html'
  })
  .catch((error) => {
    isload = false
    const errorCode = error.code;
    const errorMessage = error.message;

    
    errfeild.style.color = "red"
    errfeild.innerText += `Register Filed ${errorMessage}`
    // ..
  });
 }

 console.log(email,password,confirmPassword);


}


function login(params) {
    const loginEmail = document.querySelector('.login-email').value
    const loginPassword = document.querySelector('.login-password').value
   
    const errfeild = document.querySelector('.errMsg2')
    errfeild.innerText =''
    errfeild.style.color = "red"
    errfeild.style.textAlign = "center"

 
const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


 if (loginEmail.length === 0) {
    errfeild.innerText = 'pleace enter email '
 }
 else if(!emailRegex.test(loginEmail)){
    errfeild.innerText = 'Innvalid Email'
 }
 else if(loginPassword.length === 0){
    errfeild.innerText = 'Password are requried'
 }
 else{
    alert('Login Process')
    console.log(loginEmail,loginPassword);

signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;


    localStorage.setItem("user :", user.accessToken)
    localStorage.setItem("user:", user.email)
    // new page
    window.location.href = 'home.html'
    // ...

    errfeild.style.color = 'green'
    errfeild.innerText = 'Login Success'
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    
    errfeild.style.color = 'red'
    errfeild.innerText += `Login Failed ${errorMessage}`
  });
    
 }
}

// const btn = document.querySelector('.btn')
// isload ? btn.innerText = 'Place wait' : btn.innerText = 'Register'


module.register = register
module.login = login




