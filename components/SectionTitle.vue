<template lang="pug">
  div.font-sanstc.text-gray-700.font-medium.text-xl.md_text-xls
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
