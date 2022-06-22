<template>
  <component :is="comType" v-bind="routerLink(to)">
    <slot></slot>
  </component>
</template>
<script>
export default {
  props: {
    to: {
      type: String,
      require: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    comType() {
      return "router-link";
    },
  },
  methods: {
    linkProps(to) {
      return {
        href: to,
        target: "_blank",
        rel: "noopener",
      };
    },
    routerLink(to) {
      return { to: to };
      // return {
      //   href: to,
      //   target: "_blank",
      //   rel: "noopener",
      // };
    },
  },
};
</script>
