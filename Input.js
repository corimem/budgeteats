//vars
var prices = []
var budgetPrice;
var time;
var foods = [];
var foodsLength = 101;
var ingredients;
var allergies = [];
var allergiesLength = 101;
var diets = [];
var dietsLength = 2;
var urls = [];

//input function
function input(){
    ingredients = "";
    budgetPrice = document.getElementById("budget").value;
    time = document.getElementById("time").value;

    //set values in array of foods
    for(var i = 0; i < foodsLength; i ++){
        foods[i] = document.getElementById(i + "F").checked;
    }

    //build the ingredients string
    for(var i = 0; i < foodsLength; i ++){
        if(foods[i])
            ingredients += document.getElementById(i + "F").name + ",%20";
    }
    API(ingredients);

    //set values in array of allergies
    for(var i = 0; i < allergiesLength; i ++){
        allergies[i] = document.getElementById(i + "A").checked;
    }

    //set values for the diets
    for(var i = 0; i < dietsLength; i ++){
        diets[i] = document.getElementById(i + "D").checked;
    }
    window.location = "output.html";
    for(var i = 0; i < urls.length; i ++) {
        document.getElementById("table").appendChild(urls[i]);
    }
}

//API
function API(input){
    const url = ('http://www.recipepuppy.com/api/?i=');
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var finalUrl= (proxyUrl + url + input);
    const ul = document.getElementById('recipeUrls');
    fetch(finalUrl)
        .then((resp) => resp.json()).then(function(data){
        let Recipes = data.results;
        var i = 0;
        Recipes.forEach(function(recipes){
            console.log(recipes.href);
            urls[i] = recipes.href;
            i ++;
        })
    })
        .catch(function(error){

    });
}

function dropdown(id) {
    for(var i = 0; i <  document.getElementsByClassName("dropdown-check-list").length; i ++) {
        if(!(document.getElementsByClassName("dropdown-check-list").item(i) == document.getElementById(id)))
            document.getElementsByClassName("dropdown-check-list").item(i).classList.remove("visible");
    }

    if (document.getElementById(id).classList.contains("visible"))
        document.getElementById(id).classList.remove("visible");
    else
        document.getElementById(id).classList.add("visible");
}
