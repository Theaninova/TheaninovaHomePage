/* eslint-disable */

const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

export default pluginOptions => ({
  webpack: config => {
    // config.optimization.sideEffects = false
    // config.optimization.minimizer[0] = new TerserPlugin()
    // config.plugins.push(new CompressionPlugin())
    return config
  }
})
