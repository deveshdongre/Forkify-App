import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import pagination from './views/paginationView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);
    // console.log(id);
    
    if(!id) return;
    recipeView.renderSpinner();
    //loading recipe
    await model.loadRecipe(id);
    

    //rendering recipe
    // const markup = ``; ///shifted to recipeView
    recipeView.render(model.state.recipe);
    
    
  }catch(err){
    // console.log('Error from controller.js')
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();
    
    //get search query 
    const query = searchView.getQuery();
    if(!query){
      console.log('No query, returing');
      return

    }
    // load search results
    await model.loadSearchResults(query);
    // console.log('from controller');
    // printing search result/ rendering
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //Render the Inital paginatio buttons
    paginationView.render(model.state.search);

  }catch(err){
    console.log(err)
  }
};

const controlPagination = function(goToPage){
  // Render search New result
    resultsView.render(model.getSearchResultsPage(goToPage));
    //Render the Inital paginatio buttons
    paginationView.render(model.state.search);
}
const init = function(){
  recipeView.addhandlerRender(controlRecipes);
  searchView.addhandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init()