'use strict';

$(document).ready(function(){
  console.log("Waiting for user input!");
  $("body").hide(0).delay(400).fadeIn(3000)
  processEnInput()
  buttons()
  contactUs()
})

/* Welcome screen - guides and informs user to search by dish or ingredients */
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
    displayRecipes(responseJson)
  }).catch(error => alert("Sorry, something went wrong."))
}


function displayRecipes(responseJson, q){
  if (responseJson.more == false) {
    $('#results').removeClass('hidden')
    $('#results').empty()
    $('#results').append(`<p>Sorry, no results found. Try again!</p>`)
  } else {
    responseJson.hits.forEach(hit => console.log(hit.recipe))
  $('#results').removeClass('hidden')  
  $('#results').empty()
    for (let i = 0; i < responseJson.hits.length; i++){
      $('#results').append(
        `<p><a href="${responseJson.hits[i].recipe.url}" target="_blank">${responseJson.hits[i].recipe.label}</a><br><img src="${responseJson.hits[i].recipe.image}" alt="recipe image" width="100px" height="100px"></p>`)  
    }
  }
}

/* Replaces welcome screen with contact form */
function contactUs() {
  $('#contact-btn').click(event => {
    event.preventDefault()
    $('#welcome').addClass('hidden')
    $('#contact').removeClass('hidden')
    $('#contact-btn').addClass('hidden')
  })
}

/* English recipes - set up to be accompanied by a Spanish search when that API is no longer in Beta */
function processEnInput(){
  $('#en-search').click(event=> {
    event.preventDefault()
    const q = $('#en-search-term').val()
    findRecipes(q)
    $('#back').removeClass('hidden')
  })
}
