module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: "last 2 versions",
      cascade: false,
    }),
    require('cssnano')({
      preset: 'default',
    })
  ]
}