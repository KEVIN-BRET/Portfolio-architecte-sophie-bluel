// on pointe la balise dans laquelle vont s'afficher les "filtres"
const filtres = document.querySelector(".filtres");
// on pointe la balise dans laquelle vont s'afficher les "projets"
const gallery = document.querySelector(".gallery");

// let works;
// let categories;

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
      boutonFilterTout.addEventListener("click", () => getWorks());

      filtres.appendChild(boutonFilterTout);

      // Création des boutons de filtrage avec les catégories récupérée par l'api :
      for (let i = 0; i < categories.length; i++) {
        const nomCategorie = categories[i].name;
        const Categorie = categories[i].id;

        const boutonFiltrerCategories = document.createElement("button");
        boutonFiltrerCategories.innerText = nomCategorie;
        boutonFiltrerCategories.className = `btn btn-${Categorie}`;
        boutonFiltrerCategories.id = `filter-btn-${Categorie}`;

        filtres.appendChild(boutonFiltrerCategories);

        document
          .getElementById(`filter-btn-${Categorie}`)
          .addEventListener("click", () => getWorks(Categorie));
      }
    });
}

// On appelle l'affichage des catégories
getCategories();

// On appelle l'affichage des projets
getWorks();
