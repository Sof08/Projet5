
    //lancer API 
    //cd C:\Users\S\p5\Projet5\back\
    //node server.js
    fetch("http://localhost:3000/api/products")
    //on attend la réponse de l'api à travers le res.json
    .then((res) => res.json())
    //alors l
    .then((products) => {
   //console.log(products); 
      // creation de la boucle for qui est plus adapté à la situation .length api sous forme de tableau[]
        for (let i = 0; i < products.length; i++) {
          //parcour
            // Création d’une balise dédiée par produit correspondant avec le HTML
            const productElement = document.createElement("a");
            // On crée l’élément article. que nous allons rattaché à son parent
             const articleElement = document.createElement("article");
            // On crée le contenu de l'article
            const imageElement = document.createElement("img");
            const h3Element = document.createElement("h3");
            const descriptionElement = document.createElement("p");
            // creation de lien entre js et les donnees de L'api
            //Ajoutez la balise href dans pour acceder à la page produit
            productElement.setAttribute("href", "./product.html?id="+products[i]._id);
            // remplir les element crees avec le contenu de l'api
            //balise h3 le nom .
            h3Element.textContent = products[i].name;
            //  remplir les element creer avec le contenu de l'api
            descriptionElement.textContent = products[i].description;
            //  remplir les element creer avec la source de l’image contenu dans l'api.
            imageElement.src = products[i].imageUrl;

            //on rattache l'article à productElement (le parent) qui est la balise a
            productElement.appendChild(articleElement);
            //on rattache l'image à articleElement (le parent) qui est la balise article
            articleElement.appendChild(imageElement);
            //on rattache le H3 à articleElement (le parent) qui est la balise article
            articleElement.appendChild(h3Element);
            //on rattache le P articleElement (le parent) qui est la balise article
            articleElement.appendChild(descriptionElement);
             // On rattache la balise a href a la section id="item"
            document.querySelector('#items').appendChild(productElement);
      }    
   
});