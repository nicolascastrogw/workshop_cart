import './cart-style.scss';
import { $Q } from "graditify-utils"
import { barProgress } from "./cart-bar-progress";
import { openButtonCart } from "./cart-events";
import { createInterception } from "./cart-utils"
import ItemCart from "./cart-item";
import { createSlider } from "./cart-slider";
import ProductForm from './product-form';

/**
 * Cart initialization:
 * We work with interceptor to validate cart on viewport
 */
const initCart = () => {
  const cart = $Q('#cart-items');

  openButtonCart();
  if (cart) createInterception(cart, () => loadCartEvents());
}

/**
 * load cart events:
 * - Item cart
 * - Progress bar
 * - Upsell
 */
const loadCartEvents = () => {
  if ($Q(".swiperElupsellcart")) createSlider($Q(".swiperElupsellcart"));
  window.customElements.define('item-cart', ItemCart);
  barProgress($Q('#progress-bar-data'));
}

window.customElements.define('product-form', ProductForm);
initCart();
