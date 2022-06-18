export const state = () => ({
  token: null,
  ls_name: "hiskio_interview_jwt",
});
export const mutations = {
  TOKEN(state, payload) {
    state.token = payload;
  },
};
export const actions = {
  SetToken(context, payload) {
    let { access_token, token_type } = payload;
    token_type = token_type[0].toUpperCase() + token_type.slice(1);
    let token = `${token_type} ${access_token}`;

    if (payload) {
      localStorage.setItem(context.state.ls_name, token);
    } else {
      localStorage.removeItem(context.state.ls_name);
    }
    context.commit("TOKEN", token);
  },
  CheckHiSKIOJwt(context) {
    let token = localStorage.getItem(context.state.ls_name);
    context.commit("TOKEN", token);
  },
};
