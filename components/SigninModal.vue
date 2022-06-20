<template lang="pug">
  .relative.z-30(aria-labelledby="modal-title" role="dialog" aria-modal="true")
    .fixed.inset-0.bg-gray-500.bg-opacity-75.transition-opacity

    transition(enter-active-class="duration-500 ease-in opacity-0 -translate-y-6" enter-to-class="opacity-100 translate-y-0")
      .fixed.z-30.inset-0(v-if="signinModal")
        .flex.items-center.justify-center.h-full
          .relative.bg-white.md_rounded-10px.overflow-hidden.transform.transition-all.w-full.h-full.max-w-md.md_max-h-95p.overflow-y-scroll
            .relative.bg-white.px-16.pt-10.pb-7
              .absolute.w-48.h-48.bg-decorate1.rounded-4xl.-rotate-120.-top-20.-left-40
              .absolute.w-64.h-64.border-3.border-decorate2.opacity-20.rounded-4xl.-rotate-60.-top-4.-left-65
              .absolute.w-48.h-48.bg-decorate2.opacity-20.rounded-4xl.-rotate-120.top-90.-right-44
              .absolute.w-48.h-48.border-3.border-primary.opacity-20.rounded-4xl.-rotate-60.top-72.-right-47
              button.absolute.top-8.right-8.inline-flex.items-center.justify-center(@click="Close")
                svg.h-6.w-6.block(fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#595959" aria-hidden="true")
                  path(stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12")
              .flex.flex-col.items-center
                img.mb-7.w-30(src="https://frontend.f5ezcode.in/images/logo-hiskio.svg")
                .flex.w-full.mb-9
                  .relative.grow.font-sanstc.font-medium.text-3xls.text-primary.text-center.before_absolute.before_w-20.before_h-1.before_bg-primary.before_left-50p.before_-bottom-2.before_-translate-x-50p 登入
                  .grow.font-sanstc.font-medium.text-3xls.text-gray-300.text-center 註冊
                OtherSigninButton.mb-3(v-for="otherSigninButton in otherSigninButtons" :key="otherSigninButton.src" :src="otherSigninButton.src" :text="otherSigninButton.text")
                span.font-sanstc.text-gray-600.font-medium.mt-3.mb-5 使用 HiSKIO ID 登入
                .flex.bg-gray-50.rounded-md.items-center.w-full.h-10.pl-3.mb-2
                  img.w-5.mr-2(src="/account.png")
                  input.w-full.focus_outline-none.bg-transparent(required placeholder="請輸入 HiSKIO ID" v-model="v_account")
                .flex.bg-gray-50.rounded-md.items-center.w-full.h-10.pl-3.mb-5
                  img.w-5.mr-2(src="/lock.png")
                  input.w-full.focus_outline-none.bg-transparent(type="password" required placeholder="請輸入登入密碼" v-model="v_password")
                .flex.w-full.items-center.pl-1.mb-6
                  input.scale-135.mr-2.accent-secondary(type="checkbox" id="form_check")
                  label.font-sanstc.text-gray-500.text-sm(for="form_check") 登入註冊即代表您同意#[span.underline.underline-offset-1 使用者及隱私權政策]
                button.w-full.bg-primary.rounded.py-2.mb-5(@click="ConfirmSignin")
                  span.text-white 登入
                button 
                  span.font-sanstc.text-gray-500.font-normal 忘記密碼
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "SigninModal",

  props: {
    signinModal: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      otherSigninButtons: [
        {
          src: "facebook.png",
          text: "使用 Facebook 登入",
        },
        {
          src: "google.png",
          text: "使用 Google 登入",
        },
        {
          src: "github.png",
          text: "使用 Github 登入",
        },
        {
          src: "linkedin.png",
          text: "使用 Linkedin 登入",
        },
      ],
    };
  },

  methods: {
    ...mapMutations("signin", ["ACCOUNT", "PASSWORD"]),
    ...mapActions("signin", ["Signin"]),
    // 登入表單重置
    Reset() {
      this.ACCOUNT(null);
      this.PASSWORD(null);
    },
    // 關閉登入表單modal
    Close() {
      this.$emit("close-modal");
    },
    // 確認登入
    ConfirmSignin() {
      this.Signin()
        .then((res) => {
          this.Reset();
          this.Close();
        })
        .catch((err) => {
          console.log("登入失敗");
        });
    },
  },

  computed: {
    ...mapState("signin", ["account", "password"]),
    v_account: {
      get() {
        return this.account;
      },
      set(v) {
        this.ACCOUNT(v);
      },
    },
    v_password: {
      get() {
        return this.password;
      },
      set(v) {
        this.PASSWORD(v);
      },
    },
  },
};
</script>
