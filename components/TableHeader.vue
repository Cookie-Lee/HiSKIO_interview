<template lang="pug">
  .grid.grid-cols-12.gap-x-3.pt-4.px-3.pb-3
    .col-span-6.font-sanstc.text-gray-500 項目
    .col-span-2.font-sanstc.text-gray-500.justify-self-center 售價
    .col-span-1
    .col-span-2.font-sanstc.text-gray-500.justify-self-center 結帳金額
</template>

<script>
export default {
  name: "TableHeader",
};
</script>
