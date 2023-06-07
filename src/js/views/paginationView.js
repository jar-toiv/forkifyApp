import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const { page, results, resultsPerPage } = this._data;
    const numPages = Math.ceil(results.length / resultsPerPage);

    // Page 1 + more exists
    if (page === 1 && numPages > 1) {
      return this._renderButton(page, 'next');
    }
    // Last page
    if (page === numPages && numPages > 1) {
      return this._renderButton(page, 'prev');
    }
    // Other page prev or next
    if (page < numPages) {
      return `
      ${this._renderButton(page, 'prev')}
      ${this._renderButton(page, 'next')}
    `;
    }
    // No other pages
    return '';
  }

  _renderButton(page, type) {
    const markup = `
    <button class="btn--inline pagination__btn--${type}" data-goto="${
      type === 'prev' ? page - 1 : page + 1
    }">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${
      type === 'prev' ? 'left' : 'right'
    }"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
  `;
    return markup;
  }
}

export default new PaginationView();
