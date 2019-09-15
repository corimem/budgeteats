
var urls = [];
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
var input = ('Eggs,%20Milk,%20Red%20Wine');
const url = ('http://www.recipepuppy.com/api/?i=');
var promisedata = fetch(proxyUrl +url + input)
var jsondata = promisedata.then(data => data.json());
var testurl = jsondata.[0];
/*.then(function(data){
    for(var i = 0; i < 5; i ++){
        urls[i] = response[i].href;
    }
})
.catch(function(error){

});*/