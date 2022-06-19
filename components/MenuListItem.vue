<template lang="pug">
  a.block.px-3.py-4.font-pingfang.leading-none(href="#" :class="classes" @click="click")
    slot {{ text }}
</template>

<script>
export default {
  name: "MenuListItem",

  props: {
    text: {
      type: String,
      default: "Button",
    },
    color: {
      type: String,
      default: "text-gray-700",
    },
    hover: {
      type: Boolean,
      default: true,
    },
    click: {
      type: Function,
      default: () => {},
    },
  },

  computed: {
    classes() {
      let color = this.color;
      let hover = this.hover ? "hover_bg-gray-100" : "";
      return [color, hover];
    },
  },
};
</script>
