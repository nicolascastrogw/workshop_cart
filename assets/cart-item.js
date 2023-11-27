import { changeItem, deleteItem, setQuantity } from "./cart-events";

/**
 * web component for item cart.
 * manage the variant change and add to cart events from here.
 * event delegation is used, this way we avoid having to reload the events
 * once a reload is done by section rendering.
 */
class ItemCart extends HTMLElement {
  /**
   * detect child elements within the web component.
   */
  connectedCallback() {
    deleteItem(this);
    changeItem(this);
    setQuantity(this);
  }

  disconnectedCallback() {}
}

export default ItemCart;
