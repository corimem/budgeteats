//vars
var budgetPrice;
var time;
var foods = [];
var foodsLength = 12;
var allergies = [];
var allergiesLength = 2;

//input function
function input(){
    budgetPrice = document.getElementById("budget").value;
    time = document.getElementById("time").value;

    //set values in array of foods
    for(var i = 0; i < foodsLength; i ++){
        foods[i] = document.getElementById(i + "F").checked;
    }

    //set values in array of allergies
    /*for(var i = 0; i < allergiesLength; i ++){
        allergies[i] = document.getElementById(i + "A").checked;
    }*/
}

function dropdown(id) {
    if (document.getElementById(id).classList.contains("visible"))
        document.getElementById(id).classList.remove("visible");
    else
        document.getElementById(id).classList.add("visible");
}
