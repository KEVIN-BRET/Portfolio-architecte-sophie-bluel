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
      if (data.token) {
        loginerror.innerText = "";
        localStorage.setItem("SophieBluelToken", data.token);
        // window.location.href = "index.html";
        console.log(data.token);
      } else {
        loginerror.innerText = "email ou mot de passe incorrect !";
        // console.log("email ou mot de passe incorrect !");
      }
    })
    .catch((error) => {
      console.log("l'API n'a pas répondue : " + error);
    });
}

//** validation du formaulaire */

loginform.addEventListener("input", () => {
  if (!email.validity.valid) {
    emailerror.innerText = "Veuillez saisir une adresse email valide !";
  } else {
    emailerror.innerText = "";
  }
});

loginform.addEventListener("input", () => {
  if (!password.validity.valid) {
    passworderror.innerText =
      "Le mot de passe doit contenir entre 4 et 15 caractères !";
  } else {
    passworderror.innerText = "";
  }
});
