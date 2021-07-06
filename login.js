const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginEmail = loginForm['login-email'].value;
    const loginPassword = loginForm['login-password'].value;
    // console.log(loginEmail, loginPassword);
    auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(() => {
        console.log('login success');
        location = "splash.html";
    }).catch(err => {
        const loginError = document.getElementById("loginError");
        loginError.innerText = err.message;
    })
})
function forgot(){
    firebase.auth().sendPasswordResetEmail(document.getElementById('login-email').value)
            .then(() => {
                const text = document.getElementById('loginError')
                text.innerHTML = 'Email Sent'
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage)
              const text = document.getElementById('loginError')
              text.innerHTML = errorMessage
              // ..
            });
}
