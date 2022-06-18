<template lang="pug">
  .flex.justify-center.bg-gray-100
    .container.pt-10
      SectionTitle.mb-6(text="募資課程")
      .grid.grid-cols-1.md_grid-cols-4.gap-x-4.gap-y-3
        div(v-for="i in 4" :key="i")
          ProductCard(v-for="product in products" :key="`${product.id}_${i}`" :image="product.thumbnails.w300" :title="product.title" :avatar="product.lecturers[0].avatar" :author="product.lecturers[0].username" :dayLeft="`${i}`" :alreadyP="`${i*10}`" :price="`${product.price}`" :fixed_price="`${product.fixed_price}`" :id="`${product.id+i-1}`")
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
