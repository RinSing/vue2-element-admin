<template>
  <div>
    <img :src="err404" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      err404: require("@/assets/404.jpg"),
    };
  },
};
</script>
