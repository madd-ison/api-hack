'use strict';

/*const searchUrl = 'https://api.edamam.com/search'
const searchEsp = 'https://test-es.edamam.com/search'
const appKey = 
'fd967e623643b511adeedd8cb6db33ec'	
const appId = '8b12ba8f'

/* https://api.edamam.com/search?q=gochujang&q=rice&app_id=8b12ba8f&app_key=
fd967e623643b511adeedd8cb6db33ec */

$(document).ready(function(){
  console.log("Waiting for user input!");
  processEnInput()
  buttons()
})

function buttons(){
  $('#ingredients').click(event => {
    $('#welcome').addClass('hidden')
    $('#english-search').removeClass('hidden')
    $('#label').text(`What ingredients would you like to use?`)
  })
  $('#dishes').click(event => {
    $('#welcome').addClass('hidden')
    $('#english-search').removeClass('hidden')
    $('#label').text(`What are we cooking?`)
  })
}

function findRecipes(q){
  fetch('https://api.edamam.com/search?q=' + q + '&app_id=8b12ba8f&app_key=fd967e623643b511adeedd8cb6db33ec')
   .then(response => response.json())
   .then(responseJson => {
    displayRecipes(responseJson);
  }).catch(error => alert("Sorry, something went wrong."))
}


function displayRecipes(responseJson, q){
  responseJson.hits.forEach(hit => console.log(hit.recipe))
  $('#results').empty();
    for (let i = 0; i < responseJson.hits.length; i++){
      $('#results').append(
        `<p><a href="${responseJson.hits[i].recipe.url}">${responseJson.hits[i].recipe.label}</a></p>`
      )
    }
}


function processEnInput(){
  $('#en-search').click(event=> {
    event.preventDefault()
    const q = $('#en-search-term').val()
    findRecipes(q)
  })
}
