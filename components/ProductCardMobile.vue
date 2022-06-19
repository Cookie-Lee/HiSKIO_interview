<template lang="pug">
  .relative.bg-white.shadow-sm.rounded-md.overflow-hidden.pt-3.px-2s.pb-1(@click="ToggleProduct(id)")
    .flex.mb-3
      img.w-40p.mr-2(:src="image")
      div
        .font-sanstc.text-gray-600.text-sm.mb-4 已募資{{ alreadyP }}%
        .relative.w-full.h-1s.bg-decorate3.rounded-md.mb-4
          .absolute.h-1s.rounded-7px.bg-gradient-to-r.from-decorate4.to-decorate5(:class="pclasses")
        span.font-sanstc.font-medium.text-sm.leading-none.text-gray-700.mr-1 ${{ new Intl.NumberFormat().format(price) }}
        span.font-sanstc.text-sm.text-gray-400.line-through ${{ new Intl.NumberFormat().format(fixed_price) }}
    .font-sanstc.font-medium.text-gray-font2 {{ title }}
    .absolute.top-3.right-3
      Avatar(:src="`${avatar}`" width="23")
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ProductCardMobile",

  props: {
    id: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "/default-avatar.png",
    },
    title: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "/default-avatar.png",
    },
    author: {
      type: String,
      default: "",
    },
    dayLeft: {
      type: String,
      default: "1",
    },
    alreadyP: {
      type: String,
      default: "50",
    },
    price: {
      type: String,
      default: "",
    },
    fixed_price: {
      type: String,
      default: "",
    },
  },

  methods: {
    ...mapActions("shoppingcart", ["SetShoppingCart"]),
    ToggleProduct(id) {
      let token = this.token;
      this.SetShoppingCart({ id, token });
    },
  },

  computed: {
    ...mapState("shoppingcart", ["shoppingcart"]),
    ...mapState("jwt", ["token"]),
    pclasses() {
      let alreadyP = this.alreadyP;
      return [`w-${(alreadyP / 10) * 8}`];
    },
  },
};
</script>
