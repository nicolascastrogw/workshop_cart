import { $Q, $Qll } from "graditify-utils"

/**
 * Creates a slider using the Swiper library.
 * @param {Object} parent - An object containing the data necessary to build the slider.
 */
const createSlider = (container) => {
  let swiperParams = {
    slidesPerView: "auto",
    spaceBetween: 25,
  };

  swiperParams = loadNavigation(container, swiperParams);

  Object.assign(container, swiperParams);
  return container.initialize();
};

/**
 * Navigation config of slider library
 * @param {HTMLElement} slider - Node reference to initial slider library
 * @param {Object} params - Slider params configuration
 * @returns {Object} - New slider params with navigation config
 */
const loadNavigation = (slider, params) => {
  const parent = slider.parentNode;

  if ($Qll('.swiper-button', parent).length < 2 || !params) return;
  const mutationParams = Object.assign({}, params);

  const buttonNext = $Q('.swiper-button-next', parent);
  const buttonPrev = $Q('.swiper-button-prev', parent);

  mutationParams['navigation'] = {
    nextEl: buttonNext,
    prevEl: buttonPrev,
  };

  return mutationParams;
};

export { createSlider };