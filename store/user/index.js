/* 已登入的使用者資訊 */

import axios from "axios";

export const state = () => ({
  // 使用者資訊
  userInfo: null,
});
export const mutations = {
  USERINFO(state, payload) {
    state.userInfo = payload;
  },
};
export const actions = {
  /**
   * 取得使用者資訊事件
   * @param {*} payload 傳入token
   * @returns
   */
  GetUserInfo(context, payload) {
    return new Promise((resolve, reject) => {
      // token組合header
      let headers = { Authorization: payload };

      const api = `${process.env.KISKIO_API}/me`;
      axios({
        method: "GET",
        url: api,
        headers,
      })
        .then((response) => {
          context.commit("USERINFO", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
