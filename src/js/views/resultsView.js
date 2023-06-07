import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Sorry, no recipes found.';
  _message = '';

  _generateMarkup() {
    if (!Array.isArray(this._data || this._data.length === 0))
      return this._message;
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
