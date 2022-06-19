<template lang="pug">
  .border.border-gray-400.rounded-md.w-full.h-12.flex.items-center.pl-17
    img.w-7.mr-3(:src="`/${src}`")
    span.font-sanstc.text-gray-600 {{ text }}
</template>

<script>
export default {
  name: "OtherSigninButton",

  props: {
    src: {
      type: String,
      default: "default-avatar.png",
    },
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
