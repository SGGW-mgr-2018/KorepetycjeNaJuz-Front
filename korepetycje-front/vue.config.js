module.exports = {
  lintOnSave: 'error',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/sass/_vars.scss";@import "@/assets/sass/_mixins.scss";@import "@/assets/sass/_transitions.scss";'
      }
    }
  }
}
