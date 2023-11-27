import { $Q } from "graditify-utils";
import { addProducts } from "./cart-events";

/**
 * 
 * @param {HTMLElement} form - Element HTML with diverse action from themes
 * @returns {Void} - Remove all event
 */
const removeEvents = (form, scope) => {
  const formClone = form.cloneNode(true);
  scope.replaceChild(formClone, form);

  return formClone;
}

class ProductForm extends HTMLElement {
  constructor () {
    super();
    this.clearEvents = this.getAttribute('clearEvents') === 'true';
  }

  /**
   * On mount HTML element
   */
  connectedCallback () {
    const form = this.clearEvents
      ? removeEvents($Q("form", this), this)
      : $Q("form", this)
  
    
    form.onsubmit = function (event) {
      event.preventDefault();
      addProducts(event);
    }
  }
}

export default ProductForm;