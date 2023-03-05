//recuration de l'url de la page du produit
const str = window.location.search;
console.log(str);
//chercher les parametres dans Url
const urlParams = new URLSearchParams(str);
//recuperer l'ID dans les parametres
const id_product = urlParams.get('id');


//console.log(id_product);
const url_product_api = `http://localhost:3000/api/products/${id_product}`;

fetch(url_product_api)
    .then((res) => res.json())
    .then((product) => {
        //image
        const imageElement = document.createElement("img");
        imageElement.src = product.imageUrl;
        document.querySelector('.item__img').appendChild(imageElement);

        //nom produit
        const nomElement = document.createElement("name");
        //product.name concerne l'api
        nomElement.innerText = product.name;
        document.querySelector('.item__content__titlePrice').appendChild(nomElement);

        //prix du produit
        document.querySelector('#price').textContent = product.price;
        //description du produit
        //querySelector concerne l'id dans html, textContent ou innertext concerne l'api
        document.querySelector('#description').textContent = product.description;
        
        //liste des couleurs recuperation des couleurs dans l'api
        const couleurs = product.colors;
        //faire une boucle sur le tableau couleur vu dans l'api, pour parcourir et selectionner les couleurs une à une
        for (const couleur of couleurs) {
            //creation de l'element "option"
            /*<select name="" id="colors">
                <option value="valeur=couleur">text=couleur</option>
            </select>*/
            couleurOption = document.createElement("option");
            //definir le nom de l'option
            couleurOption.text = couleur;
            //definir la valeur de l'option
            couleurOption.value = couleur;
            //rattacher l'element option à l'élément select qui a ID = colors
            document.querySelector('#colors').appendChild(couleurOption);
        }

        //Ajout un produit au panier/LocalStorage
        const button = document.getElementById("addToCart");
        const couleurSelect = document.querySelector('#colors');
        const quantiteSelect = document.querySelector("#quantity");

        //Assigner la fonction click
        button.addEventListener("click", () => {
            let contenuPanier = null;
            //initialisation du contenu du panier
			contenuPanier = {
				//Ajout la charge utile
				idProduit: id_product,
				couleurProduit: couleurSelect.value,
				quantiteProduit: quantiteSelect.value
			};
            //verfication de l'état du panier / getItem => lecture
            
            function lecturePanier() {
				let contenuPanier = JSON.parse(localStorage.getItem("panierCle"));
                if (contenuPanier == null) {
                    //initialisation du localStorage dans le cas ou il est vide création d'un tableau
                    console.log('ici1');
					return [];				
				} else {
                    console.log('ici2');
					return contenuPanier;
				}
			}
            //Enregistrement du panier / setItem =>écriture
            function enregistrementPanier(contenuPanier) {
				localStorage.setItem("panierCle", JSON.stringify(contenuPanier));
			}

            function ajoutProduit(produit) {
                //appel de la fonction de lecture get
				let contenuPanier = lecturePanier();
				//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find =>lien utilisé
				let resultat = contenuPanier.find(
                    //Comparer les l'id et la couleur du produit sélectionné et les valeurs des produits dans LocalStorage
					(element) =>
						element.idProduit === produit.idProduit &&
						element.couleurProduit === produit.couleurProduit	
				); 
                //Point de vigilance du projet !!
                //si les produits sont différents (pas le meme ID et pas la meme couleur) => la valeur undefined est renvoyée.
				if (resultat == undefined && couleurSelect.value != "") {
					produit.quantiteProduit = quantiteSelect.value;  
                    contenuPanier[contenuPanier.length] = produit;
					//contenuPanier.push(produit);
                    console.log(produit.quantiteProduit);
                    console.log('Iciiiiiiiiii1');					 
				} else {
                    //le cas ou les produits sont similaires on incrémente la valeur quantité produit
					let  incrementeQuantite = parseInt(resultat.quantiteProduit) + parseInt(quantiteSelect.value); 
					resultat.quantiteProduit = incrementeQuantite;
                    console.log(parseInt(resultat.quantiteProduit));
                    console.log(quantiteSelect.value);
                    console.log('Iciiiiiiiiii2');
				}
                //appel de la fonction ecriture
				enregistrementPanier(contenuPanier);
				
			}
			
            //Verification si le choix de couleur est vide envoyer un message d'erreur 
			if (couleurSelect.value == "") {
				alert("Veuillez sélectionner une couleur !");
			}
			// Si la quantité sélectionnée est nulle OU si elle dépasse 100 envoyer un message d'erreur
			else if ( quantiteSelect.value <= 0 || quantiteSelect.value > 100) {
				alert("Veuillez sélectionner une quantité valide !");
			} else {
				//Enregistrement du contenu du panier dans le localStorage
				ajoutProduit(contenuPanier);
			}

        });

    });




