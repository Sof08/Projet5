
   
    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((products) => {
   //console.log(products); 
    function genererProduits(products) {
        for (let i = 0; i < products.length; i++) {
            // Création d’une balise dédiée par produit
            const productElement = document.createElement("a");
            // On crée l’élément article.
             const articleElement = document.createElement("article");
            // On crée le contenu de l'article
            const imageElement = document.createElement("img");
            const h3Element = document.createElement("h3");
            const descriptionElement = document.createElement("p");
            // creation de lien entre js et les donnees de L'api
            //Ajoutez la balise href dans  la balise a,
            productElement.setAttribute("href", `./product.html?id=${products[i]._id}`);
            // On accède à l’indice i de la liste produits pour configurer le contenu de la balise h3 le nom.
            h3Element.textContent = products[i].name;
            // On accède à l’indice i de la liste produits pour configurer le contenu de la balise p.
            descriptionElement.textContent = products[i].description;
            // On accède à l’indice i de la liste produits pour configurer la source de l’image.
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
      }    
    //Affiche de la liste des produits  
    genererProduits(products);
});