/* 登入 JWT 存放及處理 */

export const state = () => ({
  // JWT
  token: null,
  // 儲存在 localStorage 的key
  ls_name: "hiskio_interview_jwt",
});
export const mutations = {
  TOKEN(state, payload) {
    state.token = payload;
  },
};
export const actions = {
  /**
   * JWT處理
   * @param {*} payload 登入後回傳的所有資料，包含 Bearer、JWToken及過期時間。若沒有傳入表示登出。
   */
  SetToken(context, payload) {
    // 取得 Bearer及Token
    let { access_token, token_type } = payload;
    // token_type首字改大寫
    token_type = token_type[0].toUpperCase() + token_type.slice(1);
    // 組合header需要的token字串
    let token = `${token_type} ${access_token}`;

    if (payload) {
      /// 登入的情況
      // 將token存入localStorage
      localStorage.setItem(context.state.ls_name, token);
    } else {
      /// 登出的情況
      // 從localStorage刪除token
      localStorage.removeItem(context.state.ls_name);
    }
    // 將store的token更新
    context.commit("TOKEN", token);
  },
  /**
   * 重新整理後確認登入token
   */
  CheckHiSKIOJwt(context) {
    // 從localStorage取出toekn
    let token = localStorage.getItem(context.state.ls_name);
    // 將store的token更新
    context.commit("TOKEN", token);
  },
};
