import View from "./view";
import icons from 'url:../../img/icons.svg'; //parcel 2 uses this syntac to import imgs
class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No Recipes found for your query Please Try Again! ';
    _message = '';

    _generateMarkup(){
        console.log(this._data);
        return this._data.map(this._generateMarkupPreview);
    }
    _generateMarkupPreview(result){
        return `
        <li class="preview">
            <a class="preview__link" href="#${result.id}">
                <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                </div>
            </a>
        </li>
        `;
    }
}

export default new ResultsView();//new Instance of a view so that there can be only one.