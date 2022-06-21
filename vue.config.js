const { defineConfig } = require("@vue/cli-service");
const path = require("path");
console.log(path);
const { publicPath, outputDir, assetsDir, productionSourceMap, lintOnSave, port } = require("./src/config");
const name = "vue Admin Template"; // page title
function resolve(dir) {
  return path.join(__dirname, dir);
}
// const { open } = require("@/config/cli.config.js");
module.exports = {
  //transpileDependencies: true,
  publicPath: publicPath, //程序部署目录
  outputDir: outputDir, //打包文件名
  assetsDir: assetsDir, //放置静态文件，outputDir下
  productionSourceMap: productionSourceMap, //源文件映射
  lintOnSave: lintOnSave, //是否启用esLint校验
  devServer: {
    port: port,
    client: {
      overlay: {
        //当出现编译错误或警告时，在浏览器中显示全屏覆盖。
        warnings: false,
        errors: true,
      },
      progress: true,
    },
    open: false, //是否启动浏览器
    historyApiFallback: true,

    //before: require("./mock/mock-server.js"),
    //setupMiddlewares: require("./mock/index.js"),
    //onBeforeSetupMiddleware: require("./mock/index.js"),
    // onBeforeSetupMiddleware(devServer, server, compiler) {
    //   debugger;
    //   devServer.app.get("/api/seller", (req, res) => {
    //     res.json({
    //       errno: 0,
    //       data: seller,
    //     });
    //   });
    // },
  },
  css: {},
  // chainWebpack: (config) => {
  //   // config
  //   //   .plugin("webpack-bundle-analyzer")
  //   //   .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin); //或使用npm后的--report
  // },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // config.plugin("preload").tap(() => [
    //   {
    //     rel: "preload",
    //     // to ignore runtime.js
    //     // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: "initial",
    //   },
    // ]);

    // when there are many pages, it will cause too many meaningless requests
    // config.plugins.delete("prefetch");

    // set svg-sprite-loader
    // config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    // config.module
    //   .rule("icons")
    //   .test(/\.svg$/)
    //   .include.add(resolve("src/icons"))
    //   .end()
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loader")
    //   .options({
    //     symbolId: "icon-[name]",
    //   })
    //   .end();
    config.module.rules.delete("svg"); // 重点:删除默认配置中处理svg
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/icons")) // 处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });

    config.when(process.env.NODE_ENV !== "development", (config) => {
      // config
      //   .plugin("ScriptExtHtmlWebpackPlugin")
      //   .after("html")
      //   .use("script-ext-html-webpack-plugin", [
      //     {
      //       // `runtime` must same as runtimeChunk name. default is `runtime`
      //       inline: /runtime\..*\.js$/,
      //     },
      //   ])
      //   .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
};
