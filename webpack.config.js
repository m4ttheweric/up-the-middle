const createExpoWebpackConfigAsync = require('@expo/webpack-config');
//const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = async function (env, argv) {
   const config = await createExpoWebpackConfigAsync(
      {
         ...env,
         babel: {
            dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components']
         }
      },
      argv
   );

   if (env.mode === 'development') {
      config.plugins.push(new ReactRefreshWebpackPlugin());
   }

   // // Use the React refresh plugin in development mode
   // if (env.mode === 'development') {
   //    config.plugins.push(
   //       new webpack.EnvironmentPlugin({ 'EXPO_WEBPACK_FAST_REFRESH': true })
   //    );
   // }
   return config;
};
