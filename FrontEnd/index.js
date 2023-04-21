// on pointe la balise dans laquelle vont s'afficher les "filtres"
const filtres = document.querySelector(".filtres");
// on pointe la balise dans laquelle vont s'afficher les "projets"
const gallery = document.querySelector(".gallery");

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
        //
        const projetCard = document.createElement("figure");
        projetCard.dataset.id = `categorie${works[i].categoryId}`;
        gallery.appendChild(projetCard);

        const projetImage = document.createElement("img");
        projetImage.src = works[i].imageUrl;
        projetImage.alt = works[i].title;
        projetCard.appendChild(projetImage);

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

//** ----- gestion du lien login / logout ----- //

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
  e.preventDefault();
  modale1.style.display = "flex";
  getWorksInModal();
});

// la modale se ferme au click sur le bouton fermer (x) :
closemodale.addEventListener("click", (e) => {
  // e.preventDefault();
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
        const allWorks = works.map(function (work) {
          return work.id;
        });
        deleteallphotos.onclick = (id) => {
          deleteConfirm(allWorks);
        };

        // ** Fonction de confirmation de suppression ** //

        function deleteConfirm(id) {
          // on affiche la fenêtre de confirmation :
          confirmationwindow.style.display = "flex";
          // Si on clique sur "Supprimer la galerie" :
          // (si la valeur est un tableau[de tous les projets])
          if (Array.isArray(id)) {
            // on affiche "tous les projets vont être supprimés !"
            projetasupprimer.innerText = `!! TOUS LES PROJETS !!`;
            imageprojetasupprimer.src = "";
            imageprojetasupprimer.alt = "";
            // sinon ..
          } else {
            // on récupère le nom du projet :
            projetasupprimer.innerText = `${works[i].title}`;
            // on récupère l'image & ses attibuts :
            imageprojetasupprimer.src = works[i].imageUrl;
            imageprojetasupprimer.alt = works[i].title;
            imageprojetasupprimer.title = works[i].title;
            imageprojetasupprimer.width = 150;
            imageprojetasupprimer.style.margin = "0 auto";
          }

          // évènement au click sur "Supprimer" :
          confirmersuppression.onclick = () => {
            if (Array.isArray(id)) {
              console.log("supprimer toute la gallerie !!");
              deleteWork(id);
            } else {
              console.log("supprimer n°" + works[i].id);
              deleteWork(works[i].id);
            }
            getWorksInModal();
            confirmationwindow.style.display = "none";
          };

          // évènement au click sur "Annuler" :
          annulersuppression.onclick = () => {
            console.log("Suppression annulée :)");
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

//** ----- Lancement de la page d'accueil ----- **/

// On appelle l'affichage des catégories
getCategories();

// On appelle l'affichage des projets
getWorks();
