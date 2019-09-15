//vars
var budgetPrice;
var time;
var foods = [];
var foodsLength = 101;
var ingredients;
var allergies = [];
var allergiesLength = 101;
var diets = [];
var dietsLength = 2;

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
}

//API jank
function API(input){
    var stringy;
    var urls = [];
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var url = ('http://www.recipepuppy.com/api/?i=');

    fetch(proxyUrl + url + input)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            stringy = JSON.stringify(myJson);
            for(var i = 0; i < 10; i ++){
                urls[i] = stringy.substring(nthIndexOf(stringy,"http",i),stringy.length);
                urls[i] = urls[i].substring(0,urls[i].indexOf("\""));
            }
            for(var i = 0; i < 10; i ++){
                console.log(urls[i]);
            }
        });
    var stuff = urls[0];

    function nthIndexOf(str, input, n){
        var index = -input.length;
        for(var i = 0; i < n+1; i ++) {
            index += str.indexOf(input) + input.length;
            str = str.substring((str.indexOf(input)) + input.length , str.length);
        }
        return index;
    }
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
