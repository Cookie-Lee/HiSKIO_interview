<template lang="pug">
  img.rounded-full(:src="src" :width="width")
</template>

<script>
export default {
  name: "Avatar",

  props: {
    src: {
      type: String,
      default: "/default-avatar.png",
    },
    width: {
      type: String,
      default: "32",
    },
  },
};
</script>
