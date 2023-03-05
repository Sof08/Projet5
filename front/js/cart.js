//recuperation du contenu du panier du LocalStorage
const contenuPanier = JSON.parse(localStorage.getItem("panierCle"));

//console.log(contenuPanier);

//Utilisation de l'api pour récuperer les données produit
function RecupProduitInfo(idProduit) {
  console.log('hiiii');
  response = fetch('http://localhost:3000/api/products/' + idProduit)
    .then(data => {
      return data.json();
    });
  return response;
}
async function afficherPanier() {
  //vérfication du contenu panier : doit etre different de null et la taille du tableau aussi
  if ((contenuPanier !== null || contenuPanier != 0) && contenuPanier.length != 0) {
    for (let i = 0; i < contenuPanier.length; i++) {
      let produit = contenuPanier[i];
      ProduitInfo = await RecupProduitInfo(produit.idProduit);
      //Ajout des données récupérées dans la page cart.html
      let article = document.createElement('article');
      //Ajout classname a l'article
      article.className = "cart__produit";
      //attribuer id produit a data id de l'article
      article.setAttribute("data-id", produit.idProduit);
      //attribuer couleur produit a data-color de l'article
      article.setAttribute("data-color", produit.couleurProduit);
      const sectionCart = document.querySelector("#cart__items");
      //rattacher l'article a la section id=cart__produits
      sectionCart.appendChild(article);
      const div_img = document.createElement('div');
      //Ajout classname au div img
      div_img.className = "cart__item__img";
      //construction du contenu de l'article
      const imageElement = document.createElement("img");
      imageElement.src = ProduitInfo.imageUrl;
      imageElement.alt = ProduitInfo.altTxt;
      div_img.appendChild(imageElement);
      //construction de la div description
      const divGlobalDescription = document.createElement("div");
      divGlobalDescription.className = "cart__item__content";
      const divDescription = document.createElement("div");
      divDescription.className = "cart__item__content__description";

      //construction de l'element h2 => name produit
      const h2Element = document.createElement("h2");
      h2Element.textContent = ProduitInfo.name;
      //construction de l'element p => couleur du produit
      const CouleurElement = document.createElement("p");
      CouleurElement.textContent = produit.couleurProduit;
      //construction de l'element p => prix du produit
      const PrixElement = document.createElement("p");
      PrixElement.textContent = ProduitInfo.price;
      //construction div quantite 
      const divGlobalQuantite = document.createElement("div");
      divGlobalQuantite.className = "cart__item__content__settings";
      const divQuantite = document.createElement("div");
      divQuantite.className = "cart__item__content__settings__quantity";
      //construction de l'element p => prix du produit
      const QuantiteElement = document.createElement("p");
      QuantiteElement.textContent = "Qté :";
      //construction input quantite
      //produit.cquantiteProduit
      const InputQuantite = document.createElement("input");
      InputQuantite.type = "number";
      InputQuantite.className = "itemQuantity";
      InputQuantite.name = "itemQuantity";
      InputQuantite.min = "1";
      InputQuantite.max = "100";
      InputQuantite.value = produit.quantiteProduit;
      divQuantite.appendChild(QuantiteElement);
      divQuantite.appendChild(InputQuantite);
      //Rattacher les elements nom du produit / couleur du produit / prix du produit a la div description 
      divDescription.appendChild(h2Element);
      divDescription.appendChild(CouleurElement);
      divDescription.appendChild(PrixElement);
      //Rattacher la div description a la div class= cart__item__content
      divGlobalDescription.appendChild(divDescription);
      //Rattacher div quantite a div cart__item__content
      divGlobalQuantite.appendChild(divQuantite);
      divGlobalDescription.appendChild(divGlobalQuantite);
      //construction div supprimer
      const divSupp = document.createElement("div");
      divSupp.className = "cart__item__content__settings__delete";
      const deleteItem = document.createElement('p');
      deleteItem.className = "deleteItem";
      deleteItem.textContent = "Supprimer";
      divGlobalDescription.appendChild(deleteItem);
      //Rattacher la div image a article
      article.appendChild(div_img);
      //Rattacher div description a l'article
      article.appendChild(divGlobalDescription);
    }
    //affichage de la quantité et du prix total des produits
    calculQuantite();
    modifierQuantite();
    supprimerProduit();
  }
}

//fonction qui permet de calculer la totalité de quantité des produits 
//Calculer le total des prix des produits ajoutés dans le panier
async function calculQuantite() {
  const quantite = document.querySelectorAll(".itemQuantity");
  let quantitetotal = 0;
  for (let i = 0; i < quantite.length; i++) {
    const value = quantite[i].value;
    //totalQty += parseInt(value);
    quantitetotal = parseInt(value) + quantitetotal;
  }
  document.querySelector("#totalQuantity").innerText = quantitetotal;

  let prixtotal = 0;

  for (let i = 0; i < contenuPanier.length; i++) {
    let element = contenuPanier[i];
    produitInfo =   await RecupProduitInfo(element.idProduit);
    nouveauPrix = quantite[i].value * produitInfo.price;
    prixtotal  =  nouveauPrix + prixtotal;

  }

  document.querySelector("#totalPrice").innerHTML = prixtotal;

}


//Modifier la quantité d'un produit ajouté dans le panier 
function modifierQuantite() {
  //Selectionner tous item quantite
  const quantite = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < quantite.length; i++) {
    quantite[i].addEventListener("change", (e) => {
    //la nouvelle valeur de quantite
    const valeurModifiee = quantite[i].value;
    //verfication si la valeur verifie la condition suivante 
      if (valeurModifiee > 0 && valeurModifiee <= 100) {
        contenuPanier[i].quantiteProduit = valeurModifiee;
        //modifier le contenu du panier 
        localStorage.setItem("panierCle", JSON.stringify(contenuPanier));
      }
      //calcul total de quantité des produits 
      calculQuantite();
    })
  }
}



//Supprimer un produit du panier 
function supprimerProduit(){
  //Selectionner tous  les boutons supprimer 
  const produitSupprime = document.querySelectorAll(".deleteItem"); 
  produitSupprime.forEach(element => {
      element.addEventListener("click",function (event) {
        /****Cibler le produit qu'on souhaite supprimer****/
        //Récupérer l’ID du produit selectionné => data-id
        const idprodSupp = event.target.closest("article").getAttribute("data-id");
        //Récuperer la couleur du produit selectionné => data-color 
        const couleurprodSupp = event.target.closest("article").getAttribute("data-color");
        //Comparer les l'id et la couleur du produit à supprimé et les valeurs des produits dans LocalStorage
        //Créer et retoruner le nouveau tableau panier sans les élements supprimés
        nouveauPanier = contenuPanier.filter(
            element => element.idProduit !== idprodSupp || element.couleurProduit !== couleurprodSupp
        );
        //Enregistrement du nouveau panier dans localStorage
        localStorage.setItem("panierCle", JSON.stringify(nouveauPanier));
        //rafraîchissement forcé du document afin d'afficher le nouveau panier
        window.location.reload();
      })
  });
}

//Étape 10 : Passer la commande
//declaration les champs du formulaire 
const prenom = document.querySelector("#firstName");
const nom = document.querySelector("#lastName");
const adresse = document.querySelector("#address");
const ville = document.querySelector("#city");
const mail = document.querySelector("#email");

//Message d'erreur
const prenomErreur = document.querySelector("#firstNameErrorMsg");
const nomErreur = document.querySelector("#lastNameErrorMsg");
const adresseErreur = document.querySelector("#addressErrorMsg");
const villeErreur = document.querySelector("#cityErrorMsg");
const mailErreur = document.querySelector("#emailErrorMsg");

//Masques de recherche /Expressions réqulieres pour les champs du formulaire
const prenomRegex = /^[a-zA-Z]+([a-zA-Z]+)*$/;
const nomRegex = /^[a-zA-Z]+([a-zA-Z]+)*$/;
const adresseRegex = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/; 
const villeRegex = /^[a-zA-Z]+([a-zA-Z]+)*$/;
const mailRegex = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;


//verification des champs du formulaire 
function VerifFormulaire(){
  prenom.addEventListener("change", () => {
    if ((prenom.value).match(prenomRegex)) {
      prenomErreur.innerHTML = "";
    } else {
      prenomErreur.innerHTML = "Format incorrect";
      return false;
    }
  });
  nom.addEventListener("change", () => {
    if ((nom.value).match(nomRegex)) {
      nomErreur.innerHTML = "";
    } else {
      nomErreur.innerHTML = "Format incorrect";
      return false;
    }
  });
  adresse.addEventListener("change", () => {
    if ((adresse.value).match(adresseRegex)) {
      adresseErreur.innerHTML = "";
    } else {
      adresseErreur.innerHTML = "Format incorrect";
      return false;
    }
  });
  ville.addEventListener("change", () => {
    if ((ville.value).match(villeRegex)) {
      villeErreur.innerHTML = "";
    } else {
      villeErreur.innerHTML = "Format incorrect";
      return false;
    }
  });
  mail.addEventListener("change", () => {
    if ((mail.value).match(mailRegex)) {
      mailErreur.innerHTML = "";
    } else {
      mailErreur.innerHTML = "Format incorrect";
      return false;
    }
  });
  


}
VerifFormulaire();




afficherPanier();
console.log(contenuPanier);
