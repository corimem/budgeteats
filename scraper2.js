const axios = require('axios');
const cheerio = require('cheerio');

var url_array = ['http://www.kraftfoods.com/kf/recipes/parmesan-herb-potatoes-51143.aspx',
                  'http://www.recipezaar.com/Eggs-A-Boy-A-114435',
                  'http://cookeatshare.com/recipes/herb-butter-30543',
                  'http://www.kraftfoods.com/kf/recipes/philadelphia-garlic-herb-dip-52542.aspx',
                  'http://www.kraftfoods.com/kf/recipes/herbed-cheese-snacks-76228.aspx',
                  'http://www.recipezaar.com/Basil-Chive-Red-Potato-Mash-221286',
                  'http://www.recipezaar.com/Fresh-Herb-Butter-54958',
                  'http://www.recipezaar.com/Basil-and-Feta-Spread-171939',
                  'http://www.recipezaar.com/Noodles-Herbs-46286',
                  'http://www.recipezaar.com/Coco-Bananas-Creamless-Cream-of-Butter-Bean-and-Herb-Soup-104869'];

for(var index = 0; index < url_array.length; index++){
    if(url_array[index].includes('www.kraftfoods.com') == true){
        url_array.splice(index, 1);
    }
}



//console.log("hello");


var originalIngredients = ["chives", "bacon", "apple"];

    const url = 'https://www.food.com/recipe/easiest-ever-generic-chicken-in-the-microwave-184541';
    if(url.includes('cookeatshare') == true){
       console.log("Correct!")
       var urlType = 1;
    } else if (url.includes('bigoven.com')) {
       var urlType = 2;
    } else if (url.includes('food.com')){
       console.log("Incorrect!");
       var urlType = 3;
    }

// cookeatshare = ul#ingredients, li.ingredient
// bigoven = ul.ingredients-list, span.ingredient

//

function ingredientsDeterminer(ingredientsTableInput, titleInput, recipeInput, ingredientInput, originalIngredientsList, response){
    var returnArray = [];
    var recipe_title;
    const html2 = response.data;
    const $ = cheerio.load(html2)
                            //console.log(html);
                        //identify ingredients


    const ingredientsTable = $(ingredientsTableInput);
    const titleArea = $(titleInput).text();
    const recipeArea = $(recipeInput).text();

                //console.log(ingredientsTable2);
    const ingredientsList = []
    console.log(ingredientsTable.length);
    //console.log(ingredientsTable);
    var spacer = "AAAAAA";
    ingredientsTable.each(function() {
        const ingredient = $(this).find(ingredientInput).text();
         ingredientsList.push({
            ingredient,
            spacer,
         });
    });
    var ingredientsString = ingredientsList[0]['ingredient']
                 //var ingredientsSplit = ingredientsString.split(" ")
                 //console.log(ingredientsSplit);
    console.log(ingredientsString);
    var originalIngredients = originalIngredientsList;
    var ingredientsPossessed = []
    var ingredientsLacking = []
    for (var index = 0; index < originalIngredients.length; index++){
        if(ingredientsString.includes((originalIngredients[index])) == true){
            ingredientsPossessed.push(originalIngredients[index]);
        }
    }
        //console.log(ingredientsPossessed);
        returnArray.push(ingredientsPossessed);
        returnArray.push(titleArea);
        returnArray.push(recipeArea);
        return returnArray;
    }

for(var index = 0; index < url_array.length; index++){
    var targetURL = url_array[index];
    var ingredientsTableInput;
    var ingredientInput;
    var titleInput;
    if (targetURL.includes('bigoven') == true){
        ingredientsTableInput = "ul.ingredients-list";
        ingredientInput = "span.ingredient";
        titleInput = "h1";
        recipeInput = "div#instr.instructions"
    } else if (targetURL.includes('cookeatshare') == true){
        ingredientsTableInput = "ul#ingredients";
        ingredientInput = "a";
        titleInput = "h1";
        recipeInput = "ol#directions";
    } else if (targetURL.includes('recipezaar.com') == true){
        ingredientsTableInput = "ul.recipe-ingredients__list";
        console.log("bruh");
        ingredientInput = "a.theme-color"
        titleInput = "h1";
        recipeInput = "div.recipe-ingredients__ingredient-parts";
    } else if (targetURL.includes('grouprecipes.com') == true){
        ingredientsTableInput = "div.ingredients";
        ingredientInput = "a.ingredient";
        titleInput = "h1";
        recipeInput = "ul.instructions";
    } else if (targetURL.includes('allrecipes.com') == true){
        ingredientsTableInput = "div#polaris-app";
        ingredientInput = "span.recipe-ingred_txt.added";
        titleInput = "h1";
        recipeInput = "li.step";
    }
    axios(targetURL)
      .then(response => {
            var array = ingredientsDeterminer(ingredientsTableInput, titleInput, recipeInput, ingredientInput, originalIngredients, response);
            for (var index = 0; index < array.length; index++){
                console.log(array[index]);
            }
      })
      .catch(console.error);
}
