import axios from "axios";

export const state = () => ({
  products: null,
});
export const mutations = {
  PRODUCTS(state, payload) {
    state.products = payload;
  },
};
export const actions = {
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
