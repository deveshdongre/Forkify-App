import View from "./view";
import icons from 'url:../../img/icons.svg'; //parcel 2 uses this syntac to import imgs
class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const goToPage = Number(btn.dataset.goto);
            console.log(goToPage);
            handler(goToPage);
        });
    }

    _generateMarkup(){
        console.log(this._data);
        const curPage = this._data.page;
        const numPages = Math.ceil( this._data.results.length / this._data.resultsPerPage);
        console.log(`numPages var value ${numPages}`);
        //page 1 and there are other pages
        if( curPage === 1 && numPages > 1){
            return `
            <button data-goto ="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button> -->
            `;

        }       
        //last page
        if(curPage === numPages && numPages > 1){
            return `
            <button data-goto ="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1 }</span>
            </button> `;
        }
        //other page in middle
        if(curPage < numPages){
            return `
            <button data-goto ="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            <button data-goto ="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1 }</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
            
        // page 1 and no other paggegs
        return '';

        }
    }
}

export default new PaginationView();