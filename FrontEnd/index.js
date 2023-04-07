let works = []; // stock les projets de ./api/works

// génèrer le contenu de la galerie
function generateWorksInGallery() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      works = data;

      const gallery = document.querySelector(".gallery");
      for (let i = 0; i < works.length; i++) {
        const work = works[i];
        // génération du DOM avec chaque "work"
        const figure = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        const subtitleElement = document.createElement("figcaption");
        subtitleElement.innerText = work.title;

        gallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(subtitleElement);
      }
    });
}

generateWorksInGallery();
