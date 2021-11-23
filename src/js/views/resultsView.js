import View from "./view";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg'; //parcel 2 uses this syntac to import imgs
class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No Recipes found for your query Please Try Again! ';
    _message = '';

    _generateMarkup(){
        return this._data.map(result => previewView.render(result,false));
    }
}

export default new ResultsView();//new Instance of a view so that there can be only one.