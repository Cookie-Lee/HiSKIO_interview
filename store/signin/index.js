import axios from "axios";

export const state = () => ({
  // account: null,
  // password: null,
  account: "hboy8043",
  password: "s24510586",
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
          context.dispatch("jwt/SetToken", response.data, {
            root: true,
          });
          // context.dispatch("user/GetUserInfo", response.data, {
          //   root: true,
          // });
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export const getters = {};
