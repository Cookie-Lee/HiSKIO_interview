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
            span dddddd
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
          price: "1967",
          fixed_price: "2490",
        },
        {
          id: 2,
          image: "/fakeshoppingcartimg-2.webp",
          title: "程式必修課！資料結構與演算法｜JavaScript 篇",
          price: "2125",
          fixed_price: "2690",
        },
        {
          id: 3,
          image: "/fakeshoppingcartimg-3.webp",
          title: "程式必修課！離散數學與演算法｜JavaScript x Python 篇",
          price: "3580",
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
  },
};
</script>
