<template lang="pug">
  div.font-sanstc.text-gray-700.font-medium.text-2xl
    slot {{ text }}
</template>

<script>
export default {
  name: "SectionTitle2",

  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
