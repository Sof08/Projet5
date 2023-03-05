//Récuperer les infos des parametres de l'URL
let idCommande = new URL(location.href).searchParams.get("orderId"); //récupère l'id contenu dans l'url de la page actuelle

//afficher l'id dans le span id 
document.querySelector('#orderId').textContent = idCommande;

