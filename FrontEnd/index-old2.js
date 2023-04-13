// on pointe la balise dans laquelle vont s'afficher les "filtres"
const filtres = document.querySelector(".filtres");
// on pointe la balise dans laquelle vont s'afficher les "projets"
const gallery = document.querySelector(".gallery");

// un tableau va récupérer les boutons créés pour pouvoir les réutiliser dans des events listener
let boutonsDeFiltres = [];

let categoryId = "";

let projetsfiltrees = [];

// On récupère les données de l'api/works/
let works = [];
async function fetchWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => (works = data));
  // console.log(works);

  // on affiche les catégories
  fetchCategories();

  // on affiche les projets
  afficherProjets();

  //   console.log(works);
}

// On récupère les données de l'api/categories/
let categories = [];
async function fetchCategories() {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => (categories = data));
  //   console.log(categories);

  //   console.log(categories);

  // On affiche les boutons de filtres
  afficherBoutonsFiltres();

  //   console.log(boutonFilterTout);
}

function afficherBoutonsFiltres() {
  // Création du bouton de filtrage "Tous" :
  const boutonFilterTout = document.createElement("button");
  boutonFilterTout.innerText = `Tous`;
  boutonFilterTout.className = "btn btn-all";
  boutonFilterTout.id = "filter-btn-all";

  //   boutonFilterTout.setAttribute("id", "0");

  filtres.appendChild(boutonFilterTout);
  boutonsDeFiltres.push(boutonFilterTout);

  // Création des boutons de filtrage avec les catégoris récupérée par l'api :
  for (let i = 0; i < categories.length; i++) {
    const nomCategorie = categories[i].name;
    const idCategorie = categories[i].id;

    const boutonFiltrerCategories = document.createElement("button");
    boutonFiltrerCategories.innerText = nomCategorie;
    boutonFiltrerCategories.className = `btn btn-${idCategorie}`;
    boutonFiltrerCategories.id = `filter-btn-${idCategorie}`;

    filtres.appendChild(boutonFiltrerCategories);
    boutonsDeFiltres.push(boutonFiltrerCategories);
  }
  //** A PARTIR D'ICI TOUS LES BOUTONS SONT CREE ET PRESENT DANS LE TABLEAU */
  //** JE PEUX DONC LEUR ATTRIBUER DES EVENTLISTENER */

  //   console.log(boutonsDeFiltres);

  //   console.log(boutonFilterTout);

  //   console.log(categoriesId);

  // boutonFilterTout.addEventListener("click", () =>
  //   afficherProjets(idCategorie)
  // );

  //   for (let i = 0; i < boutonsDeFiltres.length; i++) {
  //     const categorie = boutonsDeFiltres[i].addEventListener("click", () => {
  //       afficherProjets(categoryId);
  //     });
  //   }
}

// ** fonction pour afficher / filtrer les projets de la gallery :

// Afficher tous les projets :
function afficherProjets(categoryId) {
  // on efface les élément présent dans la gallery
  gallery.innerHTML = "";

  //   // on créé une variable qui recevra les projets filtrés
  //   let projetsfiltrees = [];

  //   // si on a un parametre categoryId ..

  //   for (let work of works) {
  //     if (categoryId == 1) {
  //       projetsfiltrees = work.categoryId[1];
  //       //   return work.categoryId === categoryId;
  //     } else if (categoryId == 2) {
  //       projetsfiltrees = work.categoryId[2];
  //       //   return work.categoryId === categoryId;
  //     } else if (categoryId == 3) {
  //       projetsfiltrees = work.categoryId[3];
  //       //   return work.categoryId === categoryId;
  //     } else {
  //       // sinon on affiche tous les projets (works)
  //       projetsfiltrees = works;
  //       // console.log("tout les projets");
  //     }
  //   }
  // on affiche chaque projets (filtrés ou non), avec une boucle for

  for (let i = 0; i < works.length; i++) {
    const work = works[i];

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

  console.log(boutonsDeFiltres);

  const boutonAfficherTout = document.querySelector(".btn-1");
  boutonAfficherTout.addEventListener("click", function () {
    const projetsfiltrees = works.filter(function (work) {
      return work.categoryId == 1;
    });
  });

  //   boutonsDeFiltres[1].addEventListener("click", () => afficherProjets(1));
}

window.addEventListener("load", fetchWorks);

// // fonction pour changer le style du bouton de filtre actif :
// function boutonFiltreActif(bouton) {
//   document.querySelectorAll(".btn-clicked").forEach((btn) => {
//     btn.classList.remove("btn-clicked");
//   });
//   bouton.classList.add("btn-clicked");
// }

// au chargement de la page, on afffiche tous les projets :
// window.addEventListener("load", fetchCategories);
