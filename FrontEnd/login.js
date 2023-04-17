// On envoie une requette "post" à l'api/users/login :
function authentification() {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // On inclu le mail et le password saisi dans le formulaire :
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Si les données de réponses contiennent un token ...
      if (data.token) {
        loginerror.innerText = "";
        // .. on l'enregistre dans le Session Storage ..
        sessionStorage.setItem("SophieBluelToken", data.token);
        // .. puis on redirige l'utilisateurs vers la page d'accueil :
        window.location.href = "index.html";
        // console.log(data.token);
      } else {
        // Si les données ne contiennent pas de token, on affiche une erreur :
        loginerror.innerText = "email ou mot de passe incorrect !";
        // console.log("email ou mot de passe incorrect !");
      }
    })
    .catch((error) => {
      console.log("l'API n'a pas répondue : " + error);
    });
}

//** GESTION DES EVENEMENTS **//

// A l'envoi du formulaire, on appelle authentification() :
loginform.addEventListener("submit", (e) => {
  e.preventDefault();
  authentification();
});

// Validation de l'email saisit :
loginform.addEventListener("input", () => {
  if (!email.validity.valid) {
    emailerror.innerText = "Veuillez saisir une adresse email valide !";
  } else {
    emailerror.innerText = "";
  }
});
// Validation du mot de passe saisit :
loginform.addEventListener("input", () => {
  if (!password.validity.valid) {
    passworderror.innerText =
      "Le mot de passe doit contenir entre 4 et 15 caractères !";
  } else {
    passworderror.innerText = "";
  }
});
