<template lang="pug">
  .flex.justify-center.bg-gray-50
    .container.py-20
      .grid.grid-cols-3.gap-x-4
        .col-span-2
          CardWithTitle(title="購物車")
            TableHeader
            TableItem(v-for="fakeItem in fakeItems" :key="fakeItem.id" :item="fakeItem" :trash="false")
            TableItem(v-for="item in fixShoppingCart" :key="item.id" :item="item")
        .col-span-1
          CardWithTitle(title="小計")
            .pt-3.px-4.pb-5
              .font-sanstc.text-gray-500.mb-3 輸入折扣代碼
              .flex.mb-5
                input.border.border-gray-400.rounded.py-2.px-2.mr-3.grow
                button.bg-decorate6.w-20.rounded
                  span.text-decorate7 確定
              .flex.mb-5
                span.font-sanstc.font-medium.text-gray-600.text-lg.leading-none.underline.underline-offset-1 選擇抵用券
                img.w-5(src="/icon-arrow-down.png")
              .border-t.border-gray-300.mb-5
              .flex.justify-between.items-center.mb-3
                span.font-sanstc.text-gray-500 金額
                span.font-sanstc.text-gray-600.text-sm ${{ new Intl.NumberFormat().format(fixPrice) }}
              .flex.justify-end.mb-5
                span.font-sanstc.text-gray-700.text-sm.text-3xl.leading-none ${{ new Intl.NumberFormat().format(fixPrice) }}
              button.w-full.bg-decorate7.rounded.py-2.mb-3
                span.font-sanstc.text-white 前往結帳
              span.font-sanstc.text-gray-500.text-xs 點擊上方按鈕即表示您已閱讀並同意#[span.underline.underline-offset-1 「 HiSKIO購買與退費政策」]
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ShoppingCart",

  data() {
    return {
      fakeItems: [
        {
          id: 1,
          image: "/fakeshoppingcartimg-1.webp",
          title: "網頁開發全端攻略｜零程式基礎也適用（最新修訂版）",
          price: 1967,
          fixed_price: 2490,
        },
        {
          id: 2,
          image: "/fakeshoppingcartimg-2.webp",
          title: "程式必修課！資料結構與演算法｜JavaScript 篇",
          price: 2125,
          fixed_price: 2690,
        },
        {
          id: 3,
          image: "/fakeshoppingcartimg-3.webp",
          title: "程式必修課！離散數學與演算法｜JavaScript x Python 篇",
          price: 3580,
        },
      ],
    };
  },

  computed: {
    ...mapState("product", ["products"]),
    ...mapState("shoppingcart", ["shoppingcart"]),
    fixShoppingCart() {
      let shoppingcart = this.shoppingcart ? [...this.shoppingcart] : [];
      let products = this.products ? [...this.products] : [];
      let fixShoppingCart = shoppingcart.map((item) => {
        const product = products.find((d) => d.id == item.id);
        return {
          id: item.id,
          image: item.thumbnails.w300,
          title: item.name,
          price: product.price,
          fixed_price: product.fixed_price,
        };
      });
      return fixShoppingCart;
    },
    fixPrice() {
      const items = [...this.fakeItems, ...this.fixShoppingCart];
      let sum = items
        .map((d) => d.price)
        .reduce((a, b) => {
          return a + b;
        });
      return sum;
    },
  },
};
</script>
