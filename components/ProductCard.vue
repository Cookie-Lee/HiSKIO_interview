<template lang="pug">
  .w-full.bg-white.shadow-sm.rounded-md.overflow-hidden
    .relative
      img.w-full(:src="image")
      .absolute.bottom-0.w-full.flex.justify-end.items-end.pr-2.pb-2.h-50p.bg-gradient-to-b.from-gradient2.to-gradient1
        img.h-6.mr-3(src="/Icon material-bookmark-border.png")
        button(@click="ToggleProduct(id)")
          img.h-6(src="/Icon awesome-shopping-cart.png")
    .pt-3.px-3.pb-2
      .font-sanstc.font-medium.text-gray-font2.text-xl.mb-2 {{ title }}
      .flex.items-center.mb-1
        Avatar.mr-3(:src="`${avatar}`" width="37.25")
        span.font-sanstc.text-gray-500 {{ author }}
      .flex.justify-between.mb-1s
        span.font-sanstc.text-gray-600.text-sm 剩 {{ dayLeft }} 天
        span.font-sanstc.text-gray-600.text-sm 已募資{{ alreadyP }}%
      .relative.w-full.h-2s.bg-decorate3.rounded-md.mb-2s
        .absolute.h-2s.rounded-7px.bg-gradient-to-r.from-decorate4.to-decorate5(:class="pclasses")
      .flex.items-center
        span.font-sanstc.font-medium.text-xls.leading-none.text-gray-700.mr-1 ${{ new Intl.NumberFormat().format(price) }}
        span.font-sanstc.text-sm.text-gray-400.line-through ${{ new Intl.NumberFormat().format(fixed_price) }}
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ProductCard",

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
    // 新增或移除商品(課程)
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
