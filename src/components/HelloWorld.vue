<template>
  <div class="hello">
    <h1>{{ v }}</h1>
    <p>
      <button @click="v++"></button>
      For a guide and recipes on how to configure / customize this project,2222<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>

    <h3>Ecosystem</h3>

    <icon-svg type="#icon-erweima"></icon-svg>

    <button @click="mock">mock</button>
    <button @click="mock2">mock2</button>
  </div>
</template>
<script>
import axios from "axios";
import { getMeno } from "@/api/get";
export default {
  name: "HelloWorld2",
  props: {
    msg: String,
  },
  data() {
    return { v: 0 };
  },
  computed: {},
  created() {},

  methods: {
    mock() {
      axios.get("http://localhost:8080/getUserList").then(function (res) {
        console.log(res);
      });
    },
    async mock2() {
      axios.get("http://localhost:8080/getUserList").then(function (res) {
        console.log(res.data.data.items);
      });
      // const instance = axios.create({
      //   baseURL: "http://localhost:8080", //baseUrl,
      //   timeout: 5000, // request timeout
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8",
      //   },
      // });
      // instance.interceptors.request.use((request) => {
      //   return request;
      // });
      // instance.interceptors.response.use((response) => {
      //   console.log("response", response);
      //   debugger;
      //   return response;
      // });
      // instance({ url: "/getUserList", method: "get" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
