// on pointe la balise dans laquelle va s'afficher les "projets"
const gallery = document.querySelector(".gallery");

// variable qui va recevoir les données de l'api/works/
let works = [];

// fonction de récupération des données de l'api/works/
async function fetchWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => (works = data));
  // console.log(works);
  WorksDisplay();
}

// fonction pour afficher tous les projets dans <gallery> ..
function WorksDisplay() {
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
  // console.log(works);
}

// au chargement de la page, on afffiche tous les projets :
window.addEventListener("load", fetchWorks);
