//Récuperer les infos des parametres de l'URL
let idCommande = new URL(location.href).searchParams.get("orderId"); 

//afficher l'id dans le span id 
//ID ALEATOIRE?
document.querySelector('#orderId').textContent = idCommande;
        //Vider le localStorage
        localStorage.clear();

