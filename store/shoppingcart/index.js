import axios from "axios";

export const state = () => ({
  shoppingcart: [],
  ls_name: "hiskio_interview_products",
});
export const mutations = {
  SHOPPINGCART(state, payload) {
    state.shoppingcart = payload;
  },
};
export const actions = {
  SetShoppingCart(context, payload) {
    let { id, token } = payload;

    const shoppingcart = [...context.state.shoppingcart];
    let idx = shoppingcart.findIndex((d) => d.id === id);
    if (idx > -1) {
      context.dispatch("RemoveProduct", { idx, id, token });
    } else {
      context.dispatch("AddProduct", { id, token });
    }
  },
  AddProduct(context, payload) {
    return new Promise((resolve, reject) => {
      let { id, token } = payload;
      const api = `${process.env.KISKIO_API}/carts`;
      let options = {
        method: "POST",
        url: api,
      };
      if (token) {
        let headers = { Authorization: token };
        options = Object.assign(options, { headers });
      }
      let data = { items: [{ id, coupon: "" }], coupons: [] };
      options = Object.assign(options, { data });

      axios(options)
        .then((response) => {
          let { data } = response.data;
          if (token) {
            // 有登入 直接覆蓋
            context.commit("SHOPPINGCART", data);
          } else {
            // 沒登入 先加入陣列後 再加入localStorage 最後再改state
            let shoppingcart = [...context.state.shoppingcart, ...data];
            localStorage.setItem(
              context.state.ls_name,
              JSON.stringify(shoppingcart)
            );
            context.commit("SHOPPINGCART", shoppingcart);
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  RemoveProduct(context, payload) {
    return new Promise((resolve, reject) => {
      let { idx, id, token } = payload;
      if (token) {
        const api = `${process.env.KISKIO_API}/carts`;
        let options = {
          method: "DELETE",
          url: api,
          headers: { Authorization: token },
          data: { items: [{ id, coupon: "" }], coupons: [] },
        };
        axios(options)
          .then((response) => {
            // 有登入
            context.dispatch("GetShoppingCart", { token });
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        // 沒登入 直接從陣列移除 再加入localStorage 最後再改state
        let shoppingcart = [...context.state.shoppingcart];
        shoppingcart.splice(idx, 1);
        localStorage.setItem(
          context.state.ls_name,
          JSON.stringify(shoppingcart)
        );
        context.commit("SHOPPINGCART", shoppingcart);
        resolve();
      }
    });
  },
  GetShoppingCart(context, payload) {
    return new Promise((resolve, reject) => {
      let { token } = payload;
      if (token) {
        const api = `${process.env.KISKIO_API}/carts`;
        let options = {
          method: "POST",
          url: api,
          headers: { Authorization: token },
          data: { items: [], coupons: [] },
        };
        axios(options)
          .then((response) => {
            let { data } = response.data;
            context.commit("SHOPPINGCART", data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        let shoppingcart = localStorage.getItem(context.state.ls_name);
        context.commit("SHOPPINGCART", JSON.parse(shoppingcart));
      }
    });
  },
};
