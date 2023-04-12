// on pointe la balise dans laquelle vont s'afficher les "filtres"
const filtres = document.querySelector(".filtres");
// on pointe la balise dans laquelle vont s'afficher les "projets"
const gallery = document.querySelector(".gallery");

// On récupère les données de l'api/works/
async function fetchWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => (works = data));
  // console.log(works);

  // on affiche les catégories
  fetchCategories();

  // on affiche les projets
  afficherProjets();
}

// On récupère les données de l'api/categories/
async function fetchCategories() {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => (categories = data));
  //   console.log(categories);

  // On affiche les boutons de filtres
  afficherBoutonsFiltres();
}

function afficherBoutonsFiltres() {
  // Création du bouton de filtrage "Tous" :
  const boutonFilterTout = document.createElement("button");
  boutonFilterTout.innerText = `Tous`;
  boutonFilterTout.className = "btn btn-0";

  filtres.appendChild(boutonFilterTout);

  boutonFilterTout.addEventListener("click", () => afficherProjets());

  // Création des boutons de filtrage avec les catégoris récupérée par l'api :
  for (let i = 0; i < categories.length; i++) {
    const nomCategorie = categories[i].name;
    const idCategorie = categories[i].id;

    const boutonFiltrerCategories = document.createElement("button");
    boutonFiltrerCategories.innerText = nomCategorie;
    boutonFiltrerCategories.className = `btn btn-${idCategorie}`;

    filtres.appendChild(boutonFiltrerCategories);

    // boutonFiltrerCategories.addEventListener("click", () =>
    //   console.log(nomCategorie)
    // );
  }
}

// ** fonction pour afficher / filtrer les projets de la gallery :

// Afficher tous les projets :
function afficherProjets() {
  //   const gallery = document.querySelector(".gallery");

  for (let i = 0; i < works.length; i++) {
    // const projetId = works[i].id;
    // const projetName = works[i].title;

    const projetCard = document.createElement("figure");
    gallery.appendChild(projetCard);

    const projetImage = document.createElement("img");
    projetImage.src = works[i].imageUrl;
    projetImage.alt = works[i].title;
    projetCard.appendChild(projetImage);

    const projetSousTitre = document.createElement("figcaption");
    projetSousTitre.innerText = works[i].title;
    projetCard.appendChild(projetSousTitre);
  }

  //   boutonFiltreActif(boutonAfficherTout);
}

// // Afficher les projets "Objets" :
// function afficherObjets(categoryId) {
//   const projetsfiltree = works.filter(function (work) {
//     return work.categoryId === categoryId;
//   });

//   gallery.innerHTML = projetsfiltree
//     .map(
//       (work) =>
//         `
//     <figure>
//     <img src="${work.imageUrl}" alt="${work.title}">
//     <figcaption>${work.title}</figcaption>
//     </figure>
//     `
//     )
//     .join("");
//   //   boutonFiltreActif(boutonAfficherObjets);
// }

// fonction pour changer le style du bouton de filtre actif :
function boutonFiltreActif(bouton) {
  document.querySelectorAll(".btn-clicked").forEach((btn) => {
    btn.classList.remove("btn-clicked");
  });
  bouton.classList.add("btn-clicked");
}

// au chargement de la page, on afffiche tous les projets :
// window.addEventListener("load", fetchCategories);
window.addEventListener("load", fetchWorks);
