// on pointe la balise dans laquelle vont s'afficher les "filtres"
const filtres = document.querySelector(".filtres");
// on pointe la balise dans laquelle vont s'afficher les "projets"
const gallery = document.querySelector(".gallery");
// on pointe le formulaire d'ajout de photo :
const addPhotoForm = document.getElementById("addphotoform");

let works;
let categories;

// récupération des projets avec l'Api/works/
function getWorks(categoryId) {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      works = data;

      // Si un categoryId est fourni, on filtre les éléments
      if (categoryId) {
        works = works.filter((work) => work.categoryId === categoryId);
      }
      // on efface les élément présent dans la gallery
      gallery.innerHTML = "";

      // on affiche chaque projets (filtrés ou non), avec une boucle for
      for (let i = 0; i < works.length; i++) {
        // chaque projet sera contenu dans une <figure> ..
        const projetCard = document.createElement("figure");
        projetCard.dataset.id = `categorie${works[i].categoryId}`;
        gallery.appendChild(projetCard);
        // qui contiendra une image ..
        const projetImage = document.createElement("img");
        projetImage.src = works[i].imageUrl;
        projetImage.alt = works[i].title;
        projetCard.appendChild(projetImage);
        // .. et un sous titre
        const projetSousTitre = document.createElement("figcaption");
        projetSousTitre.innerText = works[i].title;
        projetCard.appendChild(projetSousTitre);
      }
      //   console.log(works);
    })
    .catch((error) => {
      console.log(`L'API Works n'a pas répondue : ${error}`);
      galleryerror.innerText = "Impossible d'afficher les projets !";
    });
}

// récupération des catégories avec l'Api/categories/
function getCategories() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      categories = data;

      // Création du bouton de filtrage "Tous" :
      const boutonFilterTout = document.createElement("button");
      boutonFilterTout.innerText = `Tous`;
      boutonFilterTout.className = "btn btn-all";
      boutonFilterTout.id = "filter-btn-all";
      // au premier chargement, le bouton "tous" est "surligné"
      boutonFilterTout.classList.add("btn-clicked");
      // au click, il affiche "tous" les projets ...
      boutonFilterTout.addEventListener("click", () => getWorks());
      // ... et il se "surligne", si il ne l'était plus !
      boutonFilterTout.addEventListener("click", () =>
        boutonFiltreActif(boutonFilterTout)
      );

      filtres.appendChild(boutonFilterTout);

      // Création des boutons de filtrage avec les catégories récupérée par l'api :
      for (let i = 0; i < categories.length; i++) {
        const nomCategorie = categories[i].name;
        const Categorie = categories[i].id;

        const boutonFiltrerCategories = document.createElement("button");
        boutonFiltrerCategories.innerText = nomCategorie;
        boutonFiltrerCategories.className = `btn btn-${Categorie}`;
        boutonFiltrerCategories.id = `filter-btn-${Categorie}`;
        // au click, le bouton de la categories choisi change de style (se "surligne") :
        boutonFiltrerCategories.addEventListener("click", () =>
          boutonFiltreActif(boutonFiltrerCategories)
        );

        filtres.appendChild(boutonFiltrerCategories);
        // au click, il affiche les projets de sa catégorie :
        document
          .getElementById(`filter-btn-${Categorie}`)
          .addEventListener("click", () => getWorks(Categorie));
      }
    })
    .catch((error) => {
      console.log(`L'API Categories n'a pas répondue : ${error}`);
      filtreserror.innerText = "Impossible d'afficher les catégories !";
    });
}

// fonction pour changer le style du bouton de filtre actif :
function boutonFiltreActif(bouton) {
  document.querySelectorAll(".btn-clicked").forEach((btn) => {
    btn.classList.remove("btn-clicked");
  });
  bouton.classList.add("btn-clicked");
}

//** ----- gestion du login / logout ----- //

// si le token est présent dans le local storage :
if (localStorage.SophieBluelToken) {
  // on affiche tout les éléments de la class .edition :
  document.querySelectorAll(".edition").forEach((element) => {
    element.style.display = "flex";
  });

  header.style.marginTop = "100px"; // on ajoute du margin-top pour compenser la banniere
  loginlink.style.display = "none"; // on fait disparaitre le lien login
}
// au click sur "logout", on efface le token et on retourne sur index.html
logoutlink.addEventListener("click", () => {
  localStorage.SophieBluelToken = "";
  window.location.href = "index.html";
});

//** ----- ouverture / fermeture de la modale ----- **//

// la modale s'ouvre au click sur le bouton modifier :
galleryedition.addEventListener("click", (e) => {
  modale1.style.display = "flex";
  getWorksInModal();
});

// la modale se ferme au click sur le bouton fermer (x) :
closemodale.addEventListener("click", (e) => {
  modale1.style.display = "none";
});
// ou en appuyant sur Esc, on ferme la modale
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    modale1.style.display = "none";
  }
});
// ou en cliaquant à coté de la modale :
window.addEventListener("click", (e) => {
  // console.log(e);
  if (e.target == modale1) {
    modale1.style.display = "none";
  }
});

//** ----- affichage des projets dans la modale ----- **//

function getWorksInModal() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      works = data;

      // on efface les élément présent dans la gallery
      modalegalery.innerHTML = "";

      // on affiche chaque projets avec une boucle for
      for (let i = 0; i < works.length; i++) {
        // Création d'une carte par projet (preview + soustitre) :
        const projetCard = document.createElement("figure");
        projetCard.dataset.id = `${works[i].id}`;
        modalegalery.appendChild(projetCard);
        // projetPreview va contenir : img + trash + view :
        const projetPreview = document.createElement("button");
        projetPreview.dataset.id = `projetpreview${works[i].id}`;
        projetPreview.classList.add("projetpreview");
        projetCard.appendChild(projetPreview);
        // img = l'image :
        const projetImage = document.createElement("img");
        projetImage.src = works[i].imageUrl;
        projetImage.alt = works[i].title;
        projetImage.title = works[i].title;
        projetPreview.appendChild(projetImage);
        // trash = bouton de suppression :
        const projetDelete = document.createElement("button");
        projetDelete.classList.add("icon", "icon-trash");
        projetDelete.title = "Supprimer ce projet";
        projetDelete.innerHTML += `<i class="fa-solid fa-trash-can"></i>`;
        projetPreview.appendChild(projetDelete);
        // view = bouton agrandir :
        const projetLargeView = document.createElement("button");
        projetLargeView.dataset.id = `largeviewprojet${works[i].id}`;
        projetLargeView.classList.add("icon", "icon-largeview");
        projetLargeView.title = "Agrandir";
        projetLargeView.innerHTML += `<i class="fa-solid fa-arrows-up-down-left-right"></i>`;
        projetPreview.appendChild(projetLargeView);
        // Soustitres :
        const projetSousTitre = document.createElement("figcaption");
        projetSousTitre.innerHTML = `<a id="editerprojet" href="#">éditer</a>`;
        projetCard.appendChild(projetSousTitre);

        // Suppression d'un projet au click sur la corbeille :
        projetDelete.onclick = (id) => deleteConfirm(id);

        // Suppression de tous les projets :
        // (non demandé : je coderai cette fonction plus tard ..)

        // Ouverture de la modale d'ajout photo :
        addPhotoBtn.onclick = () => {
          addPhotoModale();
          // addPhotoWindow.style.display = "flex";
        };

        // Fermeture de la modale d'ajout photo :
        closeAddPhotoWindow.onclick = () => {
          addPhotoWindow.style.display = "none";
          getWorksInModal();
        };
        returnToGallery.onclick = () => {
          addPhotoWindow.style.display = "none";
          getWorksInModal();
        };

        // ** Fonction de confirmation de suppression ** //
        function deleteConfirm(id) {
          // on affiche la fenêtre de confirmation :
          confirmationwindow.style.display = "flex";
          // on récupère le nom du projet :
          projetasupprimer.innerText = `${works[i].title}`;
          // on récupère l'image & ses attibuts :
          imageprojetasupprimer.src = works[i].imageUrl;
          imageprojetasupprimer.alt = works[i].title;
          imageprojetasupprimer.title = works[i].title;
          imageprojetasupprimer.width = 150;
          imageprojetasupprimer.style.margin = "0 auto";
          // évènement au click sur "Supprimer" :
          confirmersuppression.onclick = () => {
            console.log(`Projet n°${works[i].id} supprimé !`);
            deleteWork(works[i].id);
            getWorksInModal();
            confirmationwindow.style.display = "none";
          };
          // évènement au click sur "Annuler" :
          annulersuppression.onclick = () => {
            console.log("Suppression annulée");
            confirmationwindow.style.display = "none";
          };
        }
      }
    })
    .catch((error) => console.log(`L'API Works n'a pas répondue : ${error}`));
}

// Fonction de suppression de projet(s) :
function deleteWork(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      accept: "*/*",
      Authorization: `Bearer ${localStorage.SophieBluelToken}`,
    },
  }).catch((error) => console.log(`L'API Works n'a pas répondue : ${error}`));
}

// Fonction d'ajout de photo :
function addPhotoModale() {
  // on affiche la fenêtre d'ajout de photo
  addPhotoWindow.style.display = "flex";

  // on pointe le formulaire :
  const addPhotoForm = document.getElementById("addphotoform");

  // injection des catégories dans le formulaire :
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      categories = data;

      // on pointe le <select> parent des <option value="categorie"> :
      const addPhotoCatergorie = document.getElementById("categorielist");

      // pour chaque catégorie :
      for (let i = 0; i < categories.length; i++) {
        // on récupère le nom & l'id :
        const nomCategorie = categories[i].name;
        const Categorie = categories[i].id;
        // on créé une balise <option> :
        const categorieOption = document.createElement("option");
        categorieOption.innerText = nomCategorie;

        categorieOption.value = `${Categorie}`;
        // categorieOption.dataset.photoCat = `${Categorie}`;
        addPhotoCatergorie.appendChild(categorieOption);
      }
    })
    .catch((error) => {
      console.log(`L'API Categories n'a pas répondue : ${error}`);
      // filtreserror.innerText = "Impossible d'afficher les catégories !";
    });

  // Récupération de l'image pour l'apercu :
  function previewImage() {
    if (this.files.length === 0) {
      return;
    }
    // on la garde dans une variable :
    const file = this.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // quand le fichier est chargé, on affiche l'apercu :
    fileReader.addEventListener("load", (e) => displayUploadImage(e, file));
    // console.log(this.files);
  }

  // Afichage de l'apercu de l'image :
  function displayUploadImage(e, file) {
    // on fait disparaitre les options de choix d'image :
    addPhotoMenu.style.display = "none";
    // on fait apparaitre l'immage ..
    const importedPhoto = document.getElementById("importedPhoto");
    importedPhoto.style.display = "flex";
    importedPhoto.src = e.target.result;
    // et son bouton close ..
    const closeimportedPhoto = document.getElementById("closeimportedPhoto");
    closeimportedPhoto.style.display = "flex";
    closeimportedPhoto.title = "Supprimer cette image";
    // si on clique sur close :
    closeimportedPhoto.addEventListener("click", (e) => {
      // on vide la valeur de l'input 
      addPhotoInput.value = "";
      // on fait disparaitre l'image et son bouton close
      importedPhoto.style.display = "none";
      closeimportedPhoto.style.display = "none";
      // on fait ré-apparaitre les options de choix d'image :
      addPhotoMenu.style.display = "flex";
    });
  }

  // on pointe l'input de la petite section d'ajout de photo :
  const addPhotoInput = document.querySelector('input[id="addphoto"]');
  //
  addPhotoInput.addEventListener("change", previewImage);
  //

  addPhotoInput.addEventListener("change", (e) => {
    //
    if (e.target.value.match(/\.(jpe?g|png)$/i)) {
      errorDisplay("photo", "");
      //
      //
    } else if (!e.target.value.match(/\.(jpe?g|png)$/i)) {
      errorDisplay("photo", "La photo doit être au format .jpg ou .png");
    }
  });

  // on pointe l'input du titre de la photo :
  const titlePhotoInput = document.querySelector('input[id="phototitle"]');
  // on affiche une erreur si la longueur n'est pas bonne :
  titlePhotoInput.addEventListener("input", (e) => {
    if (
      e.target.value.length > 0 &&
      (e.target.value.length < 3 || e.target.value.length > 20)
    ) {
      errorDisplay("title", "Le titre doit contenir entre 3 et 40 caractères");
    } else {
      errorDisplay("title", "");
    }
  });

  // on pointe la liste de catégories :
  const selectCatInput = document.querySelector('select[id="categorielist"]');
  // on affiche une erreur si aucune n'est sélectionnée :
  selectCatInput.addEventListener("change", () => {
    if (selectCatInput.selectedIndex !== 0) {
      errorDisplay("categorie", "");
    }
  });

  // on stock les valeur saisies dans des variables :
  let title, imageUrl, categoryId;

  // au click sur le bouton Envoyer on lance la fonction de validationp :
  addPhotoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //
    inputsChecker();
    //
    if (title && imageUrl && categoryId) {
      const formData = {
        title,
        imageUrl,
        categoryId,
      };
      //
      console.log(formData);
      // inputs.forEach((input) => (input.value = ""));
      titlePhotoInput.value = "";
      addPhotoInput.value = "";
      selectCatInput.value = "";

      //
      title = null;
      imageUrl = null;
      categoryId = null;
      //
      alert("Photo envoyée !");
    } else {
      alert("Veuillez renseigner tous les champs");
    }

    //
  });

  // Validation des inputs :
  function inputsChecker() {
    // on teste le titre :
    if (titlePhotoInput.value.length < 3 || titlePhotoInput.value.length > 40) {
      errorDisplay("title", "Le titre doit contenir entre 3 et 40 caractères");
      title = null;
      //
    } else if (selectCatInput.selectedIndex == 0) {
      errorDisplay("categorie", "Veuillez séléctionner une catégorie");
      categoryId = null;
    } else {
      // on retire la class .error et on dit valid=true
      errorDisplay("title", "", true);
      // passe la valeur des inputs (validés) à leur variable :
      title = titlePhotoInput.value;
      imageUrl = addPhotoInput.value;
      categoryId = selectCatInput.value;
    }
  }
}

// Gestion de l'affichage des erreurs des inputs formulaire :
const errorDisplay = (tag, message, valid) => {
  // on pointe les éléments de manière dynamique :
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  // Si l'entrée n'est pas valide ..
  if (!valid) {
    // on ajoute la classe .error
    container.classList.add("error");
    // et un message d'erreur (dynamique) dans le span dedié
    span.textContent = message;
    // sinon
  } else {
    // on retire la class .error au container
    container.classList.remove("error");
    // et on peut aussi afficher un message dans le span
    span.textContent = message;
  }
};

//** ----- Lancement de la page d'accueil ----- **/

// On appelle l'affichage des catégories
getCategories();

// On appelle l'affichage des projets
getWorks();
