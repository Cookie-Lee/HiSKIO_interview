import axios from "axios";

export const state = () => ({
  userInfo: null,
});
export const mutations = {
  USERINFO(state, payload) {
    state.userInfo = payload;
  },
};
export const actions = {
  GetUserInfo(context, payload) {
    return new Promise((resolve, reject) => {
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
