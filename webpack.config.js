// fichier webpack.config.js
const webpack = require("webpack");
const webpackCli = require("webpack-cli");
const path = require("path");
// const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer')

let config = {
  entry: {
    app: path.join(__dirname, '/src/scripts/main.js'),
    // vendors: path.join(__dirname, '/../scripts/vendors.js')
  },
  output: {
    path: path.join(__dirname, '/src/'),
    filename: 'content_script.js'
    // path: './js/build',
    // filename: 'app.min.[hash].js'
  },
  devtool: "source-map",
  module: {
    rules: [
      // perform js babelization on all .js files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // {
      //   test: /\.(scss|css)$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       options: {}
      //     },
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         autoprefixer: {
      //           browsers: ["> 1%", "last 2 versions"]
      //         },
      //         plugins: () => [
      //           autoprefixer
      //         ]
      //       },
      //     },
      //     {
      //       loader: "sass-loader",
      //       options: {}
      //     }
      //   ]
      // },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: '../fonts/'
      //       }
      //     }
      //   ]
      // }
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: [
      //     'file-loader'
      //   ]
      // }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   dry: false,
    //   cleanOnceBeforeBuildPatterns: [path.join(__dirname, '/../dist/')],
    //   dangerouslyAllowCleanPatternsOutsideProject: true
    // }),
    // extract css into dedicated file
    // new MiniCssExtractPlugin({
    //   filename: '../css/main.css'
    // }),
    // new CopyWebpackPlugin([{
    //   from: path.join(__dirname, '/../src/img'),
    //   to: path.join(__dirname, '/../dist/img')
    // // path: path.join(__dirname, '/../dist/js/'),
    // }]),
    // new ImageminPlugin({
    //   disable: process.env.NODE_ENV !== 'production',
    //   pngquant: {
    //     quality: '50-80'
    //   },
    //   plugins: [imageminMozjpeg({quality: 60})]
    // }),
    // new BrowserSyncPlugin({
    //     host: 'localhost',
    //     port: 3000,
    //     proxy: 'https://'
    // })
  ],
  optimization: {
    minimizer: [
      // enable the js minification plugin
      // new UglifyJSPlugin({
      //   cache: true,
      //   parallel: true
      // }),
      // // enable the css minification plugin
      // new OptimizeCSSAssetsPlugin({})
    ]
  }
};

module.exports = config;

// if (process.env.NODE_ENV === 'production') {
//   module.exports.plugins.push({
//       cleanOnceBeforeBuildPatterns: ['./js/build/*','./css/build/*']
//     }// new CleanWebpackPlugin(__dirname + '/../dist', { allowExternal: true })
//   )
// }