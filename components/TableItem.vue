<template lang="pug">
  .flex.items-center.grid.grid-cols-12.gap-x-3.py-5.px-3.border-t.border-gray-300
    .col-span-6.flex
      img.w-30.h-fit.rounded-md.mr-3(:src="item.image")
      span.font-sanstc.text-gray-600.font-medium {{ item.title }}
    .col-span-2.justify-self-center
      .font-sanstc.text-gray-400.text-sm.line-through.text-center.mb-1s.leading-none(v-if="item.fixed_price") {{ new Intl.NumberFormat().format(item.fixed_price) }}
      .font-sanstc.text-gray-500.text-lg.text-center.mb-1s.leading-none {{ new Intl.NumberFormat().format(item.price) }}
      .font-sanstc.text-gray-700.text-sm.px-1.py-1.border.border-gray-700.rounded.leading-none(v-if="item.fixed_price") 募資優惠
    .col-span-1
    .col-span-2.justify-self-center
      span.font-sanstc.text-gray-600.text-xls {{ new Intl.NumberFormat().format(item.price?item.price:item.fixed_price) }}
    .col-span-1.justify-self-center
      button(v-if="trash" @click="ToggleProduct(item.id)")
        img.h-4s(src="/icon-trash.png")
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TableHeader",

  props: {
    item: {
      type: Object,
    },
    trash: {
      type: Boolean,
      default: true,
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
    ...mapState("jwt", ["token"]),
  },
};
</script>
