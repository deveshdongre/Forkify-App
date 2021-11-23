import View from "./view";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg'; //parcel 2 uses this syntac to import imgs
class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No Bookmarks yet! ';
    _message = '';

    addhandlerRender(handler){
        window.addEventListener('load',handler);
        handler();
    }

    _generateMarkup(){
        return this._data.map(bookmark => previewView.render(bookmark,false));
    }
    
}

export default new BookmarksView();//new Instance of a view so that there can be only one.