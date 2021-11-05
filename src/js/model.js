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
    }
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
        
    }catch(err){
        console.error(`${err} custom error from Model.js`);
        throw err;
    }
};

export const getSearchResultsPage = function(page = state.search.page){
    console.log(`this is the page value ${page}`);
    console.log(`this is the state page value before  ${state.search.page}`);

    state.search.page = page;
    console.log(`this is the state page value after  ${state.search.page}`);

    const start = (page - 1) * RES_PER_PAGE;
    const end = page * RES_PER_PAGE;

    return state.search.results.slice(start,end);
}