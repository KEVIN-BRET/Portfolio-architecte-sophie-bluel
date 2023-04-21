// Suppression d'un projet au click sur la corbeille :
projetDelete.onclick = (id) => deleteConfirm(id);
// Suppression de tous les projets :
const allWorks = works.map(function (work) {
  return work.id;
});
deleteallphotos.onclick = (id) => {
  deleteConfirm(allWorks);
};

///----------------------------

function deleteConfirm(id) {
  // on affiche la fenêtre de confirmation :
  confirmationwindow.style.display = "flex";
  // Si on clique sur "Supprimer la galerie" :
  // (si la valeur est un tableau[de tous les projets])
  if (Array.isArray(id)) {
    // on affiche "tous les projets vont être supprimés !"
    projetasupprimer.innerText = `!! TOUS LES PROJETS !!`;
    imageprojetasupprimer.src = "";
    imageprojetasupprimer.alt = "";
    // sinon ..
  } else {
    // on récupère le nom du projet :
    projetasupprimer.innerText = `${works[i].title}`;
    // on récupère l'image & ses attibuts :
    imageprojetasupprimer.src = works[i].imageUrl;
    imageprojetasupprimer.alt = works[i].title;
    imageprojetasupprimer.title = works[i].title;
    imageprojetasupprimer.width = 150;
    imageprojetasupprimer.style.margin = "0 auto";
  }

  // évènement au click sur "Supprimer" :
  confirmersuppression.onclick = () => {
    if (Array.isArray(id)) {
      console.log("supprimer toute la gallerie !!");
      deleteWork(id);
    } else {
      console.log("supprimer n°" + works[i].id);
      deleteWork(works[i].id);
    }
    getWorksInModal();
    confirmationwindow.style.display = "none";
  };

  // évènement au click sur "Annuler" :
  annulersuppression.onclick = () => {
    console.log("Suppression annulée :)");
    confirmationwindow.style.display = "none";
  };
}

//--------------------------
