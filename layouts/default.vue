<template lang="pug">
  .main
    nav.fixed.w-full.z-20.bg-white.shadow-sm.md_shadow-md
      .flex.justify-center.px-3.md_px-0
        .container
          .flex.items-center.justify-between.h-50px
            .flex.items-center
              img.mr-2.w-66px.md_w-100px(src="https://frontend.f5ezcode.in/images/logo-hiskio.svg")
              img.sm_inline.hidden.mr-5(v-if="!isLogin" src="/nav-img-recruiting.png" width="80px")
              .flex.items-center.sm_flex.hidden.mr-4(v-if="!isLogin")
                img.mr-1.w-4(src="/nav-img-course.png")
                span.font-pingfang.text-base.not-italic.font-normal.text-gray-600 課程
              .flex.items-center.ml-2.sm_ml-0(:class="{ 'md_ml-8': isLogin, 'ml-4': mobileMenu }")
                img.mr-1.w-4(src="/icon-search.png" :class="{ 'md_w-3': isLogin }")
                span.font-pingfang.text-base.not-italic.font-normal.text-gray-400.hidden.md_inline 搜尋
            .items-center.hidden.md_flex
              span.font-sanstc.text-base.not-italic.font-normal.text-gray-font1.mr-4 我想開課
              span.font-sanstc.text-base.not-italic.font-normal.text-gray-font1.mr-4(v-if="isLogin") 我的學習
              img.mr-4(src="/icon-shoppingcard.png" :class="{ 'w-5': !isLogin, 'w-4': isLogin }")
              button.rounded.border.border-primary.w-16.h-8.flex.justify-center.items-center.ml-6.mr-3(v-if="!isLogin" @click="signinModal=true")
                span.text-primary 登入
              button.rounded.bg-primary.w-16.h-8.flex.justify-center.items-center(v-if="!isLogin")
                span.text-white 註冊
              button.w-8.h-8(v-if="isLogin")
                Avatar(:src="userInfo.avatar")
            .flex.items-center.md_hidden
              img.mr-4.w-5(src="/icon-shoppingcard.png" :class="{ 'mr-6': mobileMenu }")
              button.inline-flex.items-center.justify-center.text-gray-400(@click="mobileMenu=!mobileMenu")
                svg.h-6.w-6(:class="{ 'hidden': mobileMenu, 'block': !mobileMenu }" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#8c8c8c" aria-hidden="true")
                  path(stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16")
                svg.h-6.w-6(:class="{ 'hidden': !mobileMenu, 'block': mobileMenu }" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#595959" aria-hidden="true")
                  path(stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12")
    .fixed.w-full.z-10.sm_hidden.pt-50px.h-screen.bg-gray-menu(:class="{ 'hidden': !mobileMenu, 'block': mobileMenu }")
      .pt-10.pb-4.bg-blue-menu(v-if="isLogin")
        .flex.items-center.px-3
          Avatar.mr-5(:src="userInfo.avatar" width="40")
          span.font-pingfang.font-medium.text-gray-700 {{ userInfo.username }}
        MenuDivide
        MenuListItem(v-for="menuListItem in menuListItems" :key="menuListItem" :text="menuListItem" :hover="false")
      div(:class="{ 'pt-4': isLogin, 'pt-6': !isLogin }")
        MenuListItem(text="探索課程")
        template(v-if="!isLogin")
          MenuListItem(text="企業方案")
        MenuDivide
        template(v-if="!isLogin")
          MenuListItem(text="登入" :click="()=>{ this.signinModal = true; }")
          MenuListItem(text="註冊" color="text-primary")
        template(v-if="isLogin")
          MenuListItem(text="登出")
    SigninModal(v-show="signinModal" @close-modal="closeModal")
    Nuxt
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DefaultLayout",

  mounted() {
    this.CheckHiSKIOJwt();
    this.GetShoppingCart({ token: null });
  },

  data() {
    return {
      mobileMenu: false,
      signinModal: false,
      menuListItems: [
        "我的抵用券",
        "任務板",
        "我的課程",
        "訂單記錄",
        "帳戶設定",
        "我開設的課",
      ],
    };
  },

  methods: {
    ...mapActions("jwt", ["CheckHiSKIOJwt"]),
    ...mapActions("user", ["GetUserInfo"]),
    ...mapActions("shoppingcart", ["GetShoppingCart"]),
    closeModal() {
      this.signinModal = false;
    },
  },

  computed: {
    ...mapState("jwt", ["token"]),
    ...mapState("user", ["userInfo"]),
    isLogin() {
      return this.userInfo ? true : false;
    },
  },

  watch: {
    token: {
      handler: function (newValue) {
        if (newValue) {
          this.GetUserInfo(newValue);
          this.GetShoppingCart({ token: newValue });
        }
      },
    },
  },
};
</script>
