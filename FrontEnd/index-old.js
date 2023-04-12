// on pointe la balise dans laquelle va s'afficher les "projets"
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

let boutonAfficherTout;
let boutonAfficherObjets;
let boutonAfficherAppartements;
let boutonAfficherHotels;

//** Gestion des boutons de filtre **//

function boutonsFiltres() {
  boutonAfficherTout = document.querySelector(".filter-0");
  boutonAfficherObjets = document.querySelector(".filter-1");
  boutonAfficherAppartements = document.querySelector(".filter-2");
  boutonAfficherHotels = document.querySelector(".filter-3");
  // console.log(boutonAfficherHotels);

  // ** Gestion des boutons de filtrage ** //

  boutonAfficherTout.addEventListener("click", worksDisplay);
  boutonAfficherObjets.addEventListener("click", afficherObjets);
  boutonAfficherAppartements.addEventListener("click", afficherAppartements);
  boutonAfficherHotels.addEventListener("click", afficherHotels);

  // console.log(boutonAfficherTout);
}

// récupération des categories depuis l'api :
async function fetchCategories() {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => (categories = data));

  // console.log(categories);
  afficherFiltres();
  // boutonsFiltres();
}
fetchCategories();

function afficherFiltres() {
  const categorieTous = document.createElement("button");

  filters.appendChild(button);
  // filters.innerHTML += `
  //         <button class="btn filter-0">Tous</button>
  //       `;
  // filters.innerHTML += categories
  //   .map(
  //     (categorie) =>
  //       `
  //         <button class="btn filter-${categorie.id}">${categorie.name}</button>
  //       `
  //   )
  //   .join("");
  // console.log(categories);
}
// fonction pour changer le style du bouton de filtre actif :
function boutonFiltreActif(bouton) {
  document.querySelectorAll(".btn-clicked").forEach((btn) => {
    btn.classList.remove("btn-clicked");
  });
  bouton.classList.add("btn-clicked");
}

// récupération des projets depuis l'api :
async function fetchWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => (works = data));

  console.log(works);
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
  // boutonFiltreActif(boutonAfficherTout);
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
  boutonFiltreActif(boutonAfficherObjets);
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
  boutonFiltreActif(boutonAfficherAppartements);
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
  boutonFiltreActif(boutonAfficherHotels);
}

// au chargement de la page, on afffiche tous les projets :
window.addEventListener("load", fetchWorks);
