//vars
var prices = []
var budgetPrice;
var time;
var foods = [];
const foodsLength = 101;
var ingredients;
var allergies = [];
const allergiesLength = 101;
var diets = [];
const dietsLength = 2;

// Checkout jQuery for this kind of stuff, you can just 
//      $("id-here").name
// But where you _can't_ do that, then sometimes it's a good idea to wrap even
// simple stuff in a function like this, that way it's easy to change later.
//
// https://jquery.com/
function getElem(id) {
    return document.getElementById(id);
}

async function input() {
    page = {};

    page.budgetPrice = getElem('budget').value;
    page.time = getElem('time').value;
    page.foods = {};
    page.allergies = {};
    page.diets = {};

    // Let and const and considered "better practice" than just var. Here's why:
    // https://github.com/airbnb/javascript#references
    for (let i = 0; i < foodsLength; i++) {
        // This is a new way of inserting variables into strings, it's safer.
        // https://github.com/airbnb/javascript#es6-template-literals
        const item = getElem(`${i}F`);

        // A super cool feature of JS is that objects are just hashmaps, there
        // are many performance perks in the sense of execution, _but also_ in
        // how you access it via code.
        // Here we're saying setting a key value pair, like:
        //      page.foods.Bacon.enabled = true
        //  for example.
        page.foods[item.name] = {};
        page.foods[item.name].enabled = item.checked;
    }

    for (let i = 0; i < allergiesLength; i++) {
        const item = getElem(`${i}A`);
        page.allergies[item.name] = {};
        page.allergies[item.name].enabled = item.checked;
    }
    
    for (let i = 0; i < dietsLength; i++) {
        const item = getElem(`${i}D`);
        page.diets[item.name] = {};
        page.diets[item.name].enabled = item.checked;
    }

    const enabledFoods = [];
    // This is an arrow function:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    Object.keys(page.foods).forEach((name) => {
        if (page.foods[name].enabled) {
            enabledFoods.push(name);
        }
    });

    page.ingredientsQuery = enabledFoods.join(',%20');

    page.urlResults = await API(page.ingredientsQuery);

    const output = getElem("output");
    // The map() function is very convenient:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const anchors = page.urlResults.map((url) => {
        // Turn 'em into hyperlinks.
        return `<a href="${url}">${url}</a>`;
    });
    // Add all those bars between entries in one slick call.
    output.innerHTML = anchors.join("<p></p>");

    // Now anyone who wants to see the data from the page in a structured format
    // can retrieve it from this function call. This makes the code that just
    // ran reusable in other sections of your application.
    console.log(page);
    return page;

    // Anyway, this is more complicated than it needs to be for this project,
    // but these little features can be helpful when designing bigger projects
    // e.g. you want to go back and figure out what foods are disabled (now you
    // just return foods where enabled === false).
    // Hope you enjoy these few tricks to keep in your JS cookbook.

    // Just wait 'till you've got an Express app running VueJS backed by MongoDB
    // and a RESTful API inside a Docker container... You'll be there soon ;)
}

//API
async function API(input){
    let urls = [];
    const url = ('http://www.recipepuppy.com/api/?i=');
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var finalUrl= (proxyUrl + url + input);
    const ul = document.getElementById('recipeUrls');
    let resp = await fetch(finalUrl);
    let data = await resp.json();
        let Recipes = data.results;
        var i = 0;
        Recipes.forEach(function(recipes) {
            console.log(recipes.href);
            urls[i] = recipes.href;
            i++;
        })
        return urls;
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
