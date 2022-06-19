<template lang="pug">
  .flex.justify-center.bg-gray-100
    .container.pt-5.md_pt-10.pb-6.md_pb-16.px-4.md_px-0
      SectionTitle.mb-6(text="募資課程")
      .grid.grid-cols-1.md_grid-cols-4.gap-x-4.gap-y-3
        div(v-for="i in 4" :key="i")
          ProductCard.hidden.md_block(v-for="product in products" :key="`${product.id}_${i}`" :image="product.thumbnails.w300" :title="product.title" :avatar="product.lecturers[0].avatar" :author="product.lecturers[0].username" :dayLeft="`${i}`" :alreadyP="`${i*10}`" :price="`${product.price}`" :fixed_price="`${product.fixed_price}`" :id="`${product.id}`")
          ProductCardMobile.md_hidden.block(v-for="product in products" :key="`${product.id}_${i}_m`" :image="product.thumbnails.w300" :title="product.title" :avatar="product.lecturers[0].avatar" :author="product.lecturers[0].username" :dayLeft="`${i}`" :alreadyP="`${i*10}`" :price="`${product.price}`" :fixed_price="`${product.fixed_price}`" :id="`${product.id}`")
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Products",

  computed: {
    ...mapState("product", ["products"]),
  },
};
</script>
