// on pointe la balise dans laquelle va s'afficher les "projets"
const gallery = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres");

//** Gestion des boutons de filtre **//
const boutonAfficherTout = document.querySelector(".btn-0");
const boutonAfficherObjets = document.querySelector(".btn-1");
const boutonAfficherAppartements = document.querySelector(".btn-2");
const boutonAfficherHotels = document.querySelector(".btn-3");
// console.log(boutonAfficherHotels);

// ** fonction de récupération des données de l'api/works/ ** //

async function fetchWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => (works = data));
  // console.log(works);
  afficherProjets();
}

async function fetchCategories() {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => (categories = data));
  // console.log(works);
  afficherBoutonsFiltres();
}

function afficherBoutonsFiltres() {
  document.querySelector(".filtres").innerHTML += `
        <button class="btn btn-0" id="btn-0">
          Tous
      `;

  for (let i = 0; i < categories.length; i++) {
    const nomCategorie = categories[i].name;
    const idCategorie = categories[i].id;

    document.querySelector(".filtres").innerHTML += `
        <button class="btn btn-${idCategorie}" id="btn-${idCategorie}">
          ${nomCategorie}
      `;
  }
}

window.addEventListener("load", fetchCategories);

// ** fonction pour afficher / filtrer les projets de la gallery :

// fonction pour changer le style du bouton de filtre actif :
function boutonFiltreActif(bouton) {
  document.querySelectorAll(".btn-clicked").forEach((btn) => {
    btn.classList.remove("btn-clicked");
  });
  bouton.classList.add("btn-clicked");
}

// Afficher tous les projets :
function afficherProjets() {
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
  boutonFiltreActif(boutonAfficherTout);
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

// ** Gestion des boutons de filtrage ** //

// boutonAfficherTout.addEventListener("click", afficherProjets);
// boutonAfficherObjets.addEventListener("click", afficherObjets);
// boutonAfficherAppartements.addEventListener("click", afficherAppartements);
// boutonAfficherHotels.addEventListener("click", afficherHotels);

// au chargement de la page, on afffiche tous les projets :
// window.addEventListener("load", fetchCategories);
window.addEventListener("load", fetchWorks);
