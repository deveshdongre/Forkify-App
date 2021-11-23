import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import pagination from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';


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
    // result view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    
    //udpating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    
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
    console.error(err)
  }
};

const controlPagination = function(goToPage){
  // Render search New result
    resultsView.render(model.getSearchResultsPage(goToPage));
    //Render the Inital paginatio buttons
    paginationView.render(model.state.search);
};

const controlServing = function(newServings){

  //update the recipe serving
  model.updateServings(newServings);
  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function(){
// Add and remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update Recipe View
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
};

const init = function(){
  bookmarksView.addhandlerRender(controlBookmarks);
  recipeView.addhandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServing);
  recipeView.addhandlerAddBookmark(controlAddBookmark);
  searchView.addhandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  // console.log('callling control servings');
};

init()