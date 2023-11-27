import { $Q } from "graditify-utils";
let wait = false;

/**
 * Replace en element with a spinner
 * @param {String} element
 */
const addSpinner = (element) => {
  if (!element) return;

  element.innerHTML = '<div class="loading"></div>';
}

/**
 * Display alert of cart API
 * @param {String} response - Dynamic response API
 */
const cartAlert = (request = null) => {
  if (wait) return;

  wait = true;
  const message = $Q('#error-out-stock');
  const info = $Q('span', message);

  if (request && request.data) {
    info.textContent = request.data.description || request.data.message;
  } else {
    info.textContent = message.dataset.message;
  }

  message.classList.remove('hidden');

  setTimeout(() => {
    message.classList.add('hidden');
    wait = false;
  }, 5000);
}

/**
 * Delay function
 *
 * @param {Function} fn - Function that you want a delay execution
 * @param {Number} wait - This time delay (ms)
 * @returns Function delay
 */
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

/**
 * This function detects, by means of the observer,
 * the interception with the slider,
 * to load it, and then disconnects the observer for the corresponding element.
 * @param {Node} entries - element node html, container slider
 * @param {Event} observer - observer event
 * @param {Function} callback - function callback start slider
 */
const executeInterception = (
  entries,
  observer,
  params,
) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      params.callback();

      if (params.unobserve) {
        observer.unobserve(entry.target);
      }
    }
})

/**
 * Creates the interceptor for the node
 * indicated in the parameter indicated as slide
 * @param {Node} element - element container slider
 * @param {Function} callback - callback init slider
 */
const createInterception = (
  element,
  callback,
  options = { root: null, rootMargin: "120px", unobserve: true },
) => {
  const optionsRoot = options;
  const unobserve = options.unobserve || false;

  delete optionsRoot.unobserve;

  const intersectionObserver = new
    IntersectionObserver(
      (entries, observer) => executeInterception(
        entries, observer, { callback, unobserve }), optionsRoot);

  intersectionObserver.observe(element);
}

export { addSpinner, cartAlert, debounce, createInterception }
