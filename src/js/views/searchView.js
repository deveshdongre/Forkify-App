class searchView {
    _parentElement = document.querySelector('.search');
     
    getQuery(){
        const query = this._parentElement.querySelector('.search__field').value;
        this.clearInput();
        return query;
    }
    clearInput(){
        this._parentElement.querySelector('.search__field').value = '';   
    }
    addhandlerSearch(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault(); // this won't let page to reload
            handler();
        });
    }
}

export default new searchView();