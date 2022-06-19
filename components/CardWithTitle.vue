<template lang="pug">
  div
    SectionTitle2.mb-5(:text="title")
    Card
      slot
</template>

<script>
export default {
  name: "CardWithTitle",

  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
