import icons from 'url:../../img/icons.svg'; //parcel 2 uses this syntac to import imgs
export default class View{
    _data;
    render(data){
        if(!data || Array.isArray(data) && data.length === 0 ) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this.clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner(){
        const markup = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div> 
        `;
        this.clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    };
    //this function is to implement SUBSCRIBER - PUBLISHER design pattern
    
    renderError(message=this._errorMessage){
      const markup =`
      <div class="error">
      <div>
      <svg>
      <use href="src/img/icons.svg#icon-alert-triangle"></use>
      </svg>
      </div>
      <p>${message}</p>
      </div>
      `;
      this.clear();
      this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    
    renderMessage(message=this._message){
      const markup =`
      <div class="message">
      <div>
      <svg>
      <use href="src/img/icons.svg#icon-smile"></use>
      </svg>
      </div>
      <p>${message}</p>
      </div>
      `;
      this.clear();
      this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    

}