import { $Q, $Qll, stringToHTML } from 'graditify-utils';
import { barProgress } from './cart-bar-progress';
import { createSlider } from './cart-slider';

/**
 * Update cart items section in sidecart
 * @param {string} str - String HTML of section rendeirng
 */
export const updateCartItems = (str) => {
  $Qll('.cartitems-js')
    .forEach(
      (element) => {
        const elementRef = element;
        elementRef.innerHTML = $Q(
          '#cart-items',
          stringToHTML(str),
        ).outerHTML;
      },
    )
}

/**
 * Update checkout button section in sidecart
 * @param {string} str - String HTML of section rendeirng
 */
export const updateCartButton = (str) => {
  const inputBarProgress = $Q('#progress-bar-data', stringToHTML(str));
  const cartButton = $Q('#cart-checkout-js', stringToHTML(str));
  const container = $Q('#container-footer-js');

  barProgress(inputBarProgress);
  updateHeaderCart(str);

  if (cartButton) {
    container.innerHTML = cartButton.outerHTML;
    return;
  }

  container.innerHTML = '';
}

/**
 * Update side-cart header (CTA, Cart count)
 * @param {string} str - String HTML of section rendeirng
 */
const updateHeaderCart = (str) => {
  const container = $Q('#count-header-js');
  if (!container) return;

  const count = $Q('.count-cart-js', stringToHTML(str));

  container.innerHTML = count.innerHTML;
};

/**
 * Chance all input value only cart page
 *
 * @param {String} id - Variant id item cart
 * @param {String} quantity - Quantity variant by item cart
 */
export const updateQuantity = (id, quantity) => {
  $Qll(`.item-cart-js[id="${id}"]`).forEach(
    (element) => {
      const elementRef = element;
      elementRef.value = quantity
    },
  )
}

/**
 * Update price item for each item in cart items section
 * @param {string} str - String HTML of section rendeirng
 * @param {number} id - Product ID
 */
export const updatePriceItem = (str, id) => {
  const {
    dataset,
    outerText,
  } = $Q(`#price-${id}`, stringToHTML(str));

  $Qll(`.price-${id}`).forEach(
    (element) => {
      const elementRef = element;
      elementRef.innerHTML = outerText
    },
  )

  updateQuantity(id, dataset.quantity);
}

/**
 * Update upsell section in sidecart
 * @param {string} str - String HTML of section rendeirng
 */
export const updateUpsell = (str) => {
  const container = $Q('#upsell-js')
  if (!container) return;
  
  const slider = $Q('#upsell-js swiper-container', stringToHTML(str));
  const oldContent = $Q('swiper-container', container)

  container.replaceChild(slider, oldContent);

  createSlider($Q(".swiperElupsellcart"));
}
