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

// ** fonction de récupération des données de l'api/works/ ** //

async function fetchWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => (works = data));
  // console.log(works);
  worksDisplay();
}

// ** fonction pour afficher / filtrer les projets de la gallery :

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

  boutonAfficherTout.classList.add("btn-clicked");
  boutonAfficherObjets.classList.remove("btn-clicked");
  boutonAfficherAppartements.classList.remove("btn-clicked");
  boutonAfficherHotels.classList.remove("btn-clicked");
}

// Afficher les projets "Objets" :
function afficherObjets() {
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

  boutonAfficherTout.classList.remove("btn-clicked");
  boutonAfficherObjets.classList.add("btn-clicked");
  boutonAfficherAppartements.classList.remove("btn-clicked");
  boutonAfficherHotels.classList.remove("btn-clicked");
}

// Afficher les projets "Appartements" :
function afficherAppartements() {
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

  boutonAfficherTout.classList.remove("btn-clicked");
  boutonAfficherObjets.classList.remove("btn-clicked");
  boutonAfficherAppartements.classList.add("btn-clicked");
  boutonAfficherHotels.classList.remove("btn-clicked");
}

// Afficher les projets "Hôtels & restaurents" :
function afficherHotels() {
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

  boutonAfficherTout.classList.remove("btn-clicked");
  boutonAfficherObjets.classList.remove("btn-clicked");
  boutonAfficherAppartements.classList.remove("btn-clicked");
  boutonAfficherHotels.classList.add("btn-clicked");
}

// ** Gestion des boutons de filtrage ** //

boutonAfficherTout.addEventListener("click", worksDisplay);
boutonAfficherObjets.addEventListener("click", afficherObjets);
boutonAfficherAppartements.addEventListener("click", afficherAppartements);
boutonAfficherHotels.addEventListener("click", afficherHotels);

// au chargement de la page, on afffiche tous les projets :
window.addEventListener("load", fetchWorks);
