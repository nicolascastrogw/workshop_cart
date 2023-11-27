import api from "./cart-services";
import { $Q, $Qll, toggleDataActive, dataToggle } from "graditify-utils";
import {
  addSpinner,
  cartAlert,
  debounce
} from "./cart-utils";
import {
  updateCartItems,
  updateUpsell,
  updateCartButton,
  updatePriceItem,
  updateQuantity,
} from "./cart-update";

const SECTIONS = {
  sidecart: 'graditify_side-cart',
  cartpage: 'graditify_cart-page'
}

const CART_SECTION = Object.values(SECTIONS).join(',');

/**
 * Add products in cart
 * @param {event} event -Event submit from add to cart form
 * @param {event} event -Event submit from add to cart form
 */
const addProducts = async (event) => {
  const submitter = $Q(".btn-cart-js", event.target);
  const variantId = $Q("input[name='id']", event.target).value;
  if (!submitter || !variantId) return;

  const textButton = submitter.innerHTML;
  const quantity = $Q("input[name='quantity']")
    ? $Q("input[name='quantity']").value
    : 1;

  addSpinner(submitter);
  
  const cartParams = {
    items: [
      {
        id: variantId,
        quantity: quantity,
      },
    ],
    sections: CART_SECTION,
  };

  const { sections, ...response } = await api.addToCart(cartParams);

  if (response.status === 422) {
    cartAlert(response);
    submitter.innerHTML = textButton;
    return;
  }

  submitter.innerHTML = textButton;
  if (!sections) return;

  if (event.target.dataset.form !== "upsell") {
    openCart();
  }

  updateCartItems(sections[SECTIONS.sidecart]);
  updateCartButton(sections[SECTIONS.sidecart]);
  updateUpsell(sections[SECTIONS.sidecart]);
}

/**
 * Update quantity for each item in cart
 * @param {number} id Product ID
 * @param {number} quantity new quantity
 */
const updateCart = async (line, quantity, id) => {
  const priceNode = $Q(`#price-${id}`);
  const priceBefore = priceNode.textContent;
  const quantityBefore = $Q(`.item-cart-js[data-index="${line}"]`).dataset.quantity;

  const cartParams = {
    line,
    quantity,
    sections: CART_SECTION,
  }

  addSpinner(priceNode);
  const { sections, ...response } = await api.changeCart(cartParams);

  if (response.status === 422) {
    priceNode.textContent = priceBefore;
    updateQuantity(id, quantityBefore);
    cartAlert(response);

    return false;
  }

  if (!sections) return false;

  if (Number(quantity) === 0) {
    updateCartItems(sections[SECTIONS.sidecart]);
    updateCartButton(sections[SECTIONS.sidecart]);
    updateUpsell(sections[SECTIONS.sidecart]);
  } else {
    updatePriceItem(sections[SECTIONS.sidecart], id);
    updateCartButton(sections[SECTIONS.sidecart]);
  }

  return true;
}

/**
 * Event onChange in the cart item
 */
const changeItem = (scope = null) => {
  const input = $Q('.item-cart-js', scope);

  input.addEventListener(
    'change',
    debounce(async () => {
      const udpate = await updateCart(
        input.dataset.index, input.value, input.id,
      );

      if (udpate) {
        input.setAttribute('data-quantity', input.value)
      }
    }, 500).bind(this),
  )
}

/**
 * Delete item in cart
 * listen if delete button is clicked
 * if is clicked, update cart with quantity 0
 */
const deleteItem = (scope = null) => {
  const element = $Q(".item-delete", scope);
  if (!element) return;

  const { dataset: { id, index } } = element;
  element.addEventListener(
    "click",
    () => updateCart(index, 0, `${id}-${index}`),
  )
}

/**
  * Set quantity
  * Set item quantity with custom input,
  * Execute updateCart function
* @author Cristian Velasco
*/
const setQuantity = (scope = null) => {
  $Qll(".quantity-label", scope).forEach(
    (labelParent) => $Qll('.button', labelParent)
      .forEach((btn) => {
        btn.addEventListener(
          'click',
          function () {
            const input = $Q('input', this.parentElement)

            if (this.dataset.action === "subtr") {
              if (input.value > 0) input.value--
            } else {
              input.value++
            }

            return input.dispatchEvent(new Event("change"));
          },
        )
      }),
  )
}

/**
* Open and close side cart with various buttons
*/
const openButtonCart = () => {
  const cartContainer = $Q(".side-cart-js");
  const btnCart = $Q(".button-cart-js");
  if (!cartContainer || !btnCart) return;

  cartContainer.setAttribute("data-active", "false");

  toggleDataActive(
    ".button-cart-js",
    ".side-cart-js",
    {
      overlay: true,
      closeSelector: ".cart-close-js",
    },
  )
}

const openCart = () => {
  dataToggle($Q(".side-cart-js"), true);
}

export {
  addProducts,
  updateCart,
  changeItem,
  deleteItem,
  setQuantity,
  openButtonCart,
  openCart
}
