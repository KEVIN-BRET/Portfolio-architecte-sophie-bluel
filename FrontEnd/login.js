// On pointe le formulaire :
// const loginForm = document.getElementById("login-form");

// // On pointe les inputs email & password :
// const inputEmail = document.getElementById("email");
// const inputPassword = document.getElementById("password");
// // console.log(loginForm, inputEmail, inputPassword);

// // on créé une variable qui va recupérer la valeur (en string) ..
// // de l'email saisit :
// let userEmail = "";
// // et du password saisit :
// let userPassword = "";

// // on listen la valeur ecrite dans les inputs email @ password ...
// // on envoi l'email saisi dans la variable userMail :
// inputEmail.addEventListener("input", (e) => {
//   userEmail = e.target.value;
//   console.log(userEmail);
// });
// // on envoi le password saisi dans la variable userPassword :
// inputPassword.addEventListener("input", (e) => {
//   userPassword = e.target.value;
//   console.log(userPassword);
// });

loginform.addEventListener("submit", (e) => {
  e.preventDefault();
  authentification();
});

function authentification() {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("Sophie Bluel Token", data.token);
      window.location.href = "index.html";
      // console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
