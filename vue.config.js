module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/covid19/'
  : '/',

  transpileDependencies: [
    'vuetify'
  ],



}
