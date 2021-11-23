// import { cosh } from 'core-js/core/number';
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe :{},
    search :{
        query : '',
        results : [],
        resultsPerPage : RES_PER_PAGE,
        page : 1 
    },
    bookmarks : []
};


export const loadRecipe = async function(id){

    try{
        // console.log('Model.js before fetching data');
        const data = await getJSON(`${API_URL}${id}`);
        // console.log('Model.js after fetching data');
        // console.log(data);
        const {recipe} = data.data;

        state.recipe = {
        id: recipe.id,
        title : recipe.title,
        publisher : recipe.publisher,
        sourceUrl : recipe.source_url,
        image : recipe.image_url,
        servings : recipe.servings,
        cookingTime : recipe.cooking_time,
        ingredients : recipe.ingredients
        };
        // console.log(state.recipe);

        if (state.bookmarks.some(bookmark => bookmark.id === id )){
            state.recipe.bookmarked = true;

        }
        else
            state.recipe.bookmarked = false;
            
    }catch(err){
        console.error(`${err} custom error from Model.js`);
        throw err;
    }
}

export const loadSearchResults = async function(query){
    // console.log('Model.js - loadSearchResults');
    try{
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        
        
        state.search.results = data.data.recipes.map(rec => {
            return{
                id: rec.id,
                title : rec.title,
                publisher : rec.publisher,
                image : rec.image_url
            };
        });
        
        state.search.page = 1;
    }catch(err){
        throw err;
    }
};

export const getSearchResultsPage = function(page = state.search.page){
    // console.log(`this is the page value ${page}`);
    // console.log(`this is the state page value before  ${state.search.page}`);

    state.search.page = page;
    // console.log(`this is the state page value after  ${state.search.page}`);

    const start = (page - 1) * RES_PER_PAGE;
    const end = page * RES_PER_PAGE;

    return state.search.results.slice(start,end);
}

export const updateServings = function(newServings){

    // console.log('updating serving');
    state.recipe.ingredients.forEach(ing => {
        ing.quantity =  (ing.quantity * newServings ) / state.recipe.servings;        
    });
    state.recipe.servings = newServings;
    // console.log(state.recipe);
};

const persistBookmarks = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}


export const addBookmark = function(recipe){
    //add to bookmark array
    state.bookmarks.push(recipe);

    //mark current Recipe as bookmark
    if ( recipe.id == state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();

};


export const deleteBookmark = function(id){
    // delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index,1);
    //Mark the current recipe as NOt bookmarked
    if( id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
};

const init = function(){
    const storage = localStorage.getItem("bookmarks");
    if (storage) state.bookmarks = JSON.parse(storage);
};
init();
// console.log(state.bookmarks);


//to clear bookmarks when reload
const clearBookmarks = function(){
    localStorage.clear('bookmarks');
}

//calling clear bookmark only if needed
// clearBookmarks();