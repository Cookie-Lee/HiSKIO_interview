/* 購物車資料存放及處理 */

import axios from "axios";

export const state = () => ({
  // 購物車清單
  shoppingcart: [],
  // 儲存在 localStorage 的key
  ls_name: "hiskio_interview_products",
});
export const mutations = {
  SHOPPINGCART(state, payload) {
    state.shoppingcart = payload;
  },
};
export const actions = {
  /**
   * 購物車新增或移除
   * @param {*} payload 傳入商品id及登入token，若無token代表未登入
   */
  SetShoppingCart(context, payload) {
    // 取得商品id及登入token
    let { id, token } = payload;

    const shoppingcart = [...context.state.shoppingcart];
    // 取得商品id對應的索引值
    let idx = shoppingcart.findIndex((d) => d.id === id);
    if (idx > -1) {
      /// 商品在陣列中的情況
      // 走移除商品事件
      context.dispatch("RemoveProduct", { idx, id, token });
    } else {
      /// 商品不在陣列中的情況
      // 走新增商品事件
      context.dispatch("AddProduct", { id, token });
    }
  },
  /**
   * 新增商品事件
   * @param {*} payload
   * @returns
   */
  AddProduct(context, payload) {
    return new Promise((resolve, reject) => {
      let { id, token } = payload;
      const api = `${process.env.KISKIO_API}/carts`;
      let options = {
        method: "POST",
        url: api,
      };
      // 有token時要帶進header
      if (token) {
        let headers = { Authorization: token };
        options = Object.assign(options, { headers });
      }
      // body要帶商品id
      let data = { items: [{ id, coupon: "" }], coupons: [] };
      options = Object.assign(options, { data });

      axios(options)
        .then((response) => {
          let { data } = response.data;
          if (token) {
            // 有登入 直接更新store
            context.commit("SHOPPINGCART", data);
          } else {
            // 沒登入 先加入陣列後
            let shoppingcart = [...context.state.shoppingcart, ...data];
            // 再加入localStorage
            localStorage.setItem(
              context.state.ls_name,
              JSON.stringify(shoppingcart)
            );
            // 最後再更新至store
            context.commit("SHOPPINGCART", shoppingcart);
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /**
   * 移除商品事件
   * @param {*} payload
   * @returns
   */
  RemoveProduct(context, payload) {
    return new Promise((resolve, reject) => {
      let { idx, id, token } = payload;

      if (token) {
        /// 有登入的情況
        // 先call移除API，完成後從API重新取得當前購物車資料
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
        /// 沒登入的情況
        // 直接從陣列移除
        let shoppingcart = [...context.state.shoppingcart];
        shoppingcart.splice(idx, 1);
        // 再加入localStorage
        localStorage.setItem(
          context.state.ls_name,
          JSON.stringify(shoppingcart)
        );
        // 最後再更新store
        context.commit("SHOPPINGCART", shoppingcart);
        resolve();
      }
    });
  },
  /**
   * 取得購物車清單
   * @param {*} payload
   * @returns
   */
  GetShoppingCart(context, payload) {
    return new Promise((resolve, reject) => {
      let { token } = payload;
      if (token) {
        /// 已登入的情況
        // 從API取得購物車清單完成後更新
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
        /// 未登入的情況
        // 從localStorage取得購物車清單
        let shoppingcart = localStorage.getItem(context.state.ls_name);
        if (shoppingcart) {
          // 如果有值才放進store
          context.commit("SHOPPINGCART", JSON.parse(shoppingcart));
        }
      }
    });
  },
};
