import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  // JS DOCS - jsdoc.app
  /**
   * Render the recieved objecto to the DOM
   * @param {Object | Object []} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @return {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //convert markup to new DOM
    const newDom = document.createRange().createContextualFragment(newMarkup);
    //select all elements from NEW dom and convert it to an Array
    const newElements = Array.from(newDom.querySelectorAll('*'));
    //select all elements from OLD DOM . . .
    const curELements = Array.from(this._parentElement.querySelectorAll('*'));
    // comparing nodes
    newElements.forEach((newEl, i) => {
      const curEl = curELements[i];
      //! UPDATE executed on elements that contains text. Check MDN
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //! UPDATE executed on attributes that contains text. Check MDN
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = ` 
     <div class="error">
        <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
     </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = ` 
     <div class="message">
        <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
     </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
