export default class HeaderController {

  constructor (containerId='headers') {
    this._containerId = containerId;
    this._selection = 'shop';
    this._count = 0;
  }

  get selection () {
    return this._selection;
  }

  set selection(newValue) {
    if (newValue != 'shop' && newValue != 'cart') return;
    if (newValue == this._selection) return;
    this._selection = newValue;

    // Now update the UI
    let container = document.getElementById(this._containerId);
    // Only two kinds of links, so flip active
    let links = container.querySelectorAll('a.mdl-navigation__link');
    for (let i=0; i < links.length; i++) {
      links[i].classList.toggle('is-active');
    }
  }

  get count() {
    return this._count;
  }

  set count(newCount) {
    if (this._count == newCount) return;
    // TODO use a badge instead
    var label = newCount === 0 ? '' : ` (${newCount} items)`;
    this._count = newCount;
    let spans = document.querySelectorAll(`#${this._containerId} a[href="#cart"]`);
    for (let i=0; i < spans.length; i++) {
      spans[i].innerText = `Cart${label}`;
    }
  }

}
