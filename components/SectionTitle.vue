<template lang="pug">
  div.font-sans.text-gray-700.font-medium.text-xls
    slot {{ text }}
</template>

<script>
export default {
  name: "SectionTitle",

  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
