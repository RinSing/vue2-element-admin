module.exports = {
  publicPath: "/", //程序部署目录
  outputDir: "dist", //打包文件名
  assetsDir: "static", //放置静态文件，outputDir下
  productionSourceMap: true, //源文件映射
  lintOnSave: false, //esLint校验
  open: false, //是否启动浏览器
  isMock: true,
  mocUrl: "http://localhost:8080",
};
