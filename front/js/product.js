//recuperation de l'url de la page du produit
const str = window.location.search;
//console.log(str);
//chercher les parametres dans Url ?
const urlParams = new URLSearchParams(str);

//recuperer l'ID dans les parametres
const id_product = urlParams.get('id');


//console.log(id_product);
const url_product_api = "http://localhost:3000/api/products/"+id_product;
//creation dun fetch connection a l'url product
fetch(url_product_api)
    .then((res) => res.json())
    .then((product) => {
        //image
        //creation d'element dans la page produit
        const imageElement = document.createElement("img");
        //on rattache l'element creer qui correspond nom dans l'api
        imageElement.src = product.imageUrl;
        //on recupere la classe a travers le query et on rattache le parent
        document.querySelector('.item__img').appendChild(imageElement);

        const nomElement = document.createElement("name");
        nomElement.innerText = product.name;
        document.querySelector('.item__content__titlePrice').appendChild(nomElement);

        //prix du produit, ID html query
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
            let contenuPanier = undefined;
            //initialisation du contenu du panier
			contenuPanier = {
				//Ajout la charge utile selectionnn
				idProduit: id_product,
				couleurProduit: couleurSelect.value,
				quantiteProduit: quantiteSelect.value
			};
            //verfication de l'état du panier / getItem => lecture du panier
            
            function lecturePanier() {
                //???
				let contenuPanier = JSON.parse(localStorage.getItem("panierCle"));
                if (contenuPanier == null) {
                    //initialisation du localStorage dans le cas ou il est vide création d'un tableau
					return [];	
                    //si le panier est vide on retourn au contenu du panier			
				} else {
					return contenuPanier;
				}
			}
            

            function ajoutProduit(produit) {
                //appel de la fonction de lecture getItem
				let contenuPanier = lecturePanier();
				//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find =>lien utilisé
				let resultat = contenuPanier.find(
                    //Test les l'id et la couleur du produit sélectionné, on test les valeurs et les types des produits dans LocalStorage
					(element) =>
						element.idProduit === produit.idProduit &&
						element.couleurProduit === produit.couleurProduit	
				); 
                //Point de vigilance du projet !!
                //si les produits sont différents (pas le meme ID et pas,
                //la meme couleur) => la valeur undefined est renvoyée.
				if (resultat == undefined && couleurSelect.value != "") {
					produit.quantiteProduit = quantiteSelect.value;  
                    contenuPanier[contenuPanier.length] = produit;
					
                    //console.log(produit.quantiteProduit);
                    //console.log('Iciiiiiiiiii1');					 
				} else {
                    //le cas ou les produits sont similaires on incrémente la valeur quantité produit
					let  incrementeQuantite = parseInt(resultat.quantiteProduit) + parseInt(quantiteSelect.value); 
					resultat.quantiteProduit = incrementeQuantite;
                    //console.log(parseInt(resultat.quantiteProduit));
                    //console.log(quantiteSelect.value);
                    //console.log('Iciiiiiiiiii2');
				}
                //Function enregistrement panier localstorage
				localStorage.setItem("panierCle", JSON.stringify(contenuPanier));

                console.log(contenuPanier);
				
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
                if (confirm("Commande validée") == true) {
                    //passage à la page panier
                    window.location.href = "cart.html";
                }

			}

        });

    });




