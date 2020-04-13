const productionPlugins = [
  require('postcss-import'),
  require('postcss-preset-env')({ stage: 4 }),
  require('autoprefixer'),
  require('cssnano'),
];

// module.exports = (config) => ({
//   require('react-app-rewire-postcss')(config, {
//     plugins: loader => productionPlugins
//  });
// });

module.exports = {
  plugins: productionPlugins,
};
