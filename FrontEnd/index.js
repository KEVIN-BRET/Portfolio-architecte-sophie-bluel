// on pointe la balise dans laquelle va s'afficher les "projets"
const gallery = document.querySelector(".gallery");

//** Gestion des boutons de filtre **//
const boutonAfficherTout = document.querySelector(".btn-all");
const boutonAfficherObjets = document.querySelector(".btn-objets");
const boutonAfficherAppartements = document.querySelector(".btn-appartements");
const boutonAfficherHotels = document.querySelector(".btn-hotels");
// console.log(boutonAfficherHotels);

// variable qui va recevoir les données de l'api/works/
let works = [];

// fonction de récupération des données de l'api/works/
async function fetchWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => (works = data));
  // console.log(works);
  worksDisplay();
}

// ** fonction pour afficher / filtrer les projets de la gallery :

boutonAfficherTout.addEventListener("click", worksDisplay);

// Afficher tous les projets :
function worksDisplay() {
  gallery.innerHTML = works
    .map(
      (work) =>
        `
        <figure>
          <img src="${work.imageUrl}" alt="${work.title}">
          <figcaption>${work.title}</figcaption>
        </figure>
      `
    )
    .join("");
}

// Afficher les projets "Objets" :

boutonAfficherObjets.addEventListener("click", function () {
  const projetsfiltree = works.filter(function (work) {
    return work.categoryId === 1;
  });
  gallery.innerHTML = projetsfiltree
    .map(
      (work) =>
        `
    <figure>
    <img src="${work.imageUrl}" alt="${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
    `
    )
    .join("");
});

// Afficher les projets "Appartements" :
boutonAfficherAppartements.addEventListener("click", function () {
  const projetsfiltree = works.filter(function (work) {
    return work.categoryId === 2;
  });
  gallery.innerHTML = projetsfiltree
    .map(
      (work) =>
        `
    <figure>
    <img src="${work.imageUrl}" alt="${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
    `
    )
    .join("");
});

// Afficher les projets "Hôtels & restaurents" :
boutonAfficherHotels.addEventListener("click", function () {
  const projetsfiltree = works.filter(function (work) {
    return work.categoryId === 3;
  });
  gallery.innerHTML = projetsfiltree
    .map(
      (work) =>
        `
    <figure>
    <img src="${work.imageUrl}" alt="${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
    `
    )
    .join("");
});

// ** Gestion des boutons de filtrage ** //

// au chargement de la page, on afffiche tous les projets :
window.addEventListener("load", fetchWorks);
