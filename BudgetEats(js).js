function createTool(element){
    return document.createElement(element);
}

function append (parent,el) {
    return parent.appendChild(el);
}

const url = ('http://www.recipepuppy.com/api/?i=');
var input = ("Eggs,%20Milke,%20Red%20Wine");
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
var finalUrl= (proxyUrl + url + input);
const ul = document.getElementById('recipeUrls')
fetch(finalUrl)
    .then((resp) => resp.json())
    .then(function(data){
        let Recipes = data.results;
        Recipes.forEach(function(recipes){
            console.log(recipes.href);
        })



    })

    .catch(function(error){

    });




