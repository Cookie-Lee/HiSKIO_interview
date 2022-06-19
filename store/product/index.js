/* 商品清單處理(募資課程) */

import axios from "axios";

export const state = () => ({
  // 商品清單
  products: null,
});
export const mutations = {
  PRODUCTS(state, payload) {
    state.products = payload;
  },
};
export const actions = {
  /**
   * 從API取得商品清單
   * @returns
   */
  GetProducts(context) {
    return new Promise((resolve, reject) => {
      const api = `${process.env.KISKIO_API}/courses/fundraising`;
      axios({
        method: "GET",
        url: api,
      })
        .then((response) => {
          context.commit("PRODUCTS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
