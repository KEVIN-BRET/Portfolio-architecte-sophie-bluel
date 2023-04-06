// ** La majeure partie des commentaires me sert à retenir les étapes ** //
// ** de mon travail, ils seront épurés pour la version finale  ** //

// on initialise un tableau qui récupèrera les données de l'api /works
let works = [];

// on créé une fonction qui va générer le contenu de la galerie ..
// .. a partir des données de l'api /works
function generateWorksInGallery() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      // on assigne le résultat du fetch à la variable works
      works = data;
      // on pointe la class .gallery avec une variable gallery
      const gallery = document.querySelector(".gallery");
      // une boucle for va chercher dans tout le tableau de l'api/work,
      for (let i = 0; i < works.length; i++) {
        const work = works[i];
        // et génèrer a chaque fois, une balise <figure>,
        const figure = document.createElement("figure");
        // l'image associé (avec son alt)..
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        // .. et sous sous-titre
        const subtitleElement = document.createElement("figcaption");
        subtitleElement.innerText = work.title;
        // on associe parents & enfants :)
        gallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(subtitleElement);
      }
    });
}

generateWorksInGallery();
