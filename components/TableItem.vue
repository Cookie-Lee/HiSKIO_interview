<template lang="pug">
  .flex.items-center.grid.grid-cols-12.gap-x-3.py-5.px-3.border-b.border-gray-300.last_border-b-0
    .col-span-12.md_col-span-6.flex.items-start.self-start.mb-3.md_mb-0
      img.w-15.md_w-30.h-fit.rounded-md.mr-3(:src="item.image")
      span.font-sanstc.text-gray-600.text-sm.md_text-base.font-medium.mr-7.md_mr-0 {{ item.title }}
      button.min-w-fit.md_hidden(v-if="trash" @click="ToggleProduct(item.id)")
        img.w-6(src="/icon-trash.png")
    .col-span-12.md_col-span-2.md_justify-self-center.flex.items-center.justify-between.md_block
      .font-sanstc.text-gray-400.text-sm.line-through.text-center.mb-1s.leading-none.hidden.md_block(v-if="item.fixed_price") {{ new Intl.NumberFormat().format(item.fixed_price) }}
      .flex.items-center.md_block
        .font-sanstc.text-gray-500.text-xs.md_text-lg.text-center.mb-0.md_mb-1s.mr-1.md_mr-0.leading-none {{ new Intl.NumberFormat().format(item.price) }}
        .font-sanstc.text-gray-700.text-xs.md_text-sm.px-1.py-1.border.border-gray-700.rounded.leading-none(v-if="item.fixed_price") 募資優惠
      span.font-sanstc.text-gray-600.text-base.md_text-xls.md_hidden.block.leading-none {{ new Intl.NumberFormat().format(item.price?item.price:item.fixed_price) }}
    .col-span-1.hidden.md_block
    .col-span-2.justify-self-center
      span.font-sanstc.text-gray-600.text-xls.hidden.md_block {{ new Intl.NumberFormat().format(item.price?item.price:item.fixed_price) }}
    .col-span-1.justify-self-center
      button.hidden.md_block(v-if="trash" @click="ToggleProduct(item.id)")
        img.w-6(src="/icon-trash.png")
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
    // 購物車移除商品
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
