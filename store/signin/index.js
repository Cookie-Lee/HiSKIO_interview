/* 登入 */

import axios from "axios";

export const state = () => ({
  // 帳號
  account: null,
  // 密碼
  password: null,
});
export const mutations = {
  ACCOUNT(state, payload) {
    state.account = payload;
  },
  PASSWORD(state, payload) {
    state.password = payload;
  },
};
export const actions = {
  /**
   * 登入事件
   * @param {*} payload
   * @returns
   */
  Signin(context, payload) {
    return new Promise((resolve, reject) => {
      let { account, password } = context.state;
      let data = {
        account,
        password,
        confirm: true,
      };

      const api = `${process.env.KISKIO_API}/auth/login`;
      axios({
        method: "POST",
        url: api,
        data,
      })
        .then((response) => {
          // 取得token後更新
          context.dispatch("jwt/SetToken", response.data, {
            root: true,
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export const getters = {};
