import View from 'view';
import {pushLocationHash} from 'url-tools';
import {findProduct} from 'products';

export default class CartView extends View {

  constructor(cart, containerId = 'cart') {
    super(containerId);
    this._cart = cart;
    this._element = 'tr';
    this._elementClass = 'product';
    this._clickHandler = null;
    this._tbody = this._container.querySelector('tbody');
    this._checkoutBtn = document.getElementById('checkoutBtn');
  }

  install() {
    this._clickHandler = this._handleClick.bind(this);
    this._container.addEventListener('click', this._clickHandler, true);
    // Checkout button switches hash to "pay", will cause the form to open
    this._checkoutBtn.addEventListener('click', this._goToPayment.bind(this));
  }

  render() {
    // Remove existing products
    let itemRows = this._tbody.querySelectorAll(this.itemSelector);
    for (let i = 0; i < itemRows.length; i++) {
      this._tbody.removeChild(itemRows[i]);
    }
    for (let item of this._cart.cart) {
      let product = findProduct(item.sku);
      let placeholder = document.createElement('tbody');
      placeholder.innerHTML = `<tr class="product" data-sku="${product.sku}">
        <td class="mdl-data-table__cell-non-numeric">${product.title}</td>
        <td>${item.quantity}</td>
        <td>$${product.price}</td>
        <td><button class="mdl-button mdl-button--colored mdl-js-button
              mdl-js-ripple-effect mdl-button--accent delete"
              data-sku="${product.sku}" data-action="remove">
              <i class="material-icons">delete</i>remove</button>
        </td>
      </tr>`;
      this._tbody.appendChild(placeholder.firstElementChild); // WARN: no ie8
    }
    // Add the total price
    this.updateTotal();
  }

  updateTotal() {
    document.getElementById('cart-total').innerText = `$${this._cart.total}`;
  }

  removeFromView(sku) {
    let row = this._tbody.querySelector(`tr[data-sku=${sku}]`);
    if (row) {
      row.parentNode.removeChild(row);
    }
    this.updateTotal();
  }

  _goToPayment() {
    pushLocationHash('pay');
  }

  _handleClick(event) {
    if (event.target.dataset) {
      var sku = event.target.dataset.sku;
      var action = event.target.dataset.action;
      if (sku && action == 'remove') {
        var product = this._cart.findItem(sku);
        this._cart.remove(product);
        this.removeFromView(sku);
      }
    }
  }

  // utility for unit testing (used in counting the number of elements)
  get itemSelector() {
    return `${this._element}.${this._elementClass}[data-sku]`;
  }

  set cart(cart) {
    this._cart = cart;
  }

}
