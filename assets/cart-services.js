import axios from 'axios';

/**
* Client for the Shopify API
*/
class API {
  /**
   * Add to cart action
   * @param {Object} req - Body of request data 
   * @param {Object} req.items - Items cart 
   * @param {String} req.sections - Sections reference implement section rendering API 
   * @returns {object} Line items associated with the added items and sections
   */
  async addToCart({ items, sections = undefined }) {

    const formData = {
      items: items,
    };

    //Support bundled section rendering
    if (sections) {
      formData.sections = sections;
    }

    try {
      const response = await axios({
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        url: `${routes.cart_add_url}.js`,
        data: JSON.stringify(formData),
      });

      response.data.status = response.status;
      return response.data;
    } catch (error) {
      return {
        ...error.response,
        sections: '',
      };
    }
  }

  /**
   * Update cart action
   * @param {Object} req - Body of request data 
   * @param {Number} req.id - Product id of item cart 
   * @param {Number} req.quantity - New quantity to update in line item
   * @param {String} req.sections - Sections reference implement section rendering API
   * @returns {object} Line items associated with the added items and sections
   */
  async updateCart({
    id,
    quantity,
    sections = undefined,
  }) {

    const formData = {
      updates: {
        [id]: quantity,
      },
    };

    //Support bundled section rendering
    if (sections) {
      formData.sections = sections;
    }

    try {
      const response = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: `${routes.cart_update_url}.js`,
        data: JSON.stringify(formData),
      });
      response.data.status = response.status;
      return response.data;
    } catch (error) {
      return {
        ...error.response,
        sections: '',
      };
    }
  }

  /**
   * Update cart action
   * @param {Object} req - Body of request data 
   * @param {Number} req.line - Line item reference position
   * @param {Number} req.quantity - New quantity to update in line item
   * @param {String} req.sections - Sections reference implement section rendering API
   * @returns {object} The JSON of the cart and HTML of the sections
   */
  async changeCart({
    line,
    quantity,
    sections = undefined,
  }) {

    const formData = {
    'line': line,
    'quantity': quantity,
    };

    //Support bundled section rendering
    if (sections) {
      formData.sections = sections;
    }

    try {
      const response = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: `${routes.cart_change_url}.js`,
        data: JSON.stringify(formData),
      });

      response.data.status = response.status;
      return response.data;
    } catch (error) {
      return {
        ...error.response,
        sections: '',
      };
    }
  }
}

export default new API();