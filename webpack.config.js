const webpack = require('webpack');
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const wextManifest = require('wext-manifest');
const WriteWebpackPlugin = require('write-webpack-plugin');
const manifestInput = require('./src/manifest');

const targetBrowser = process.env.TARGET_BROWSER;
const manifest = wextManifest[targetBrowser](manifestInput);

const config = {
  mode: process.env.NODE_ENV,
  context: `${__dirname}/src`,
  entry: {
    'background': './background_script/index.js',
    'content_script': './content_script/index.js',
    '../../docs/docs': './styles/docs.js',
    'styles/social': './styles/social.js',
    'oembed/oembed': './styles/oembed.js',
    // '../docs/embed': './styles/embed.js',

    'players/Youtube': './content_script/video/players/Youtube-medium.js',
    // 'players/Youtube-tiny': './content_script/video/players/Youtube-tiny.js',
    'players/Youtube-small': './content_script/video/players/Youtube-small.js',
    'players/Youtube-medium': './content_script/video/players/Youtube-medium.js',
    'players/Youtube-large': './content_script/video/players/Youtube-large.js',

    'players/Gif': './content_script/image/players/Gif.js',

    'popup/popup': './popup/popup.js',
    'options/options': './options/options.js',
    'installed/installed': './installed/installed.js',

    // 'players/Dailymotion': './content_script/video/players/Dailymotion.js',
    // 'players/Youporn': './content_script/video/players/Youporn.js',
    // 'players/Vimeo': './content_script/video/players/Vimeo.js',
    // 'players/Twitch': './content_script/video/players/Twitch.js',
  },
  optimization: {
    minimize: false
  },
  output: {
    path: path.join(__dirname, 'dist', targetBrowser),
    filename: '[name].js',

    // path: __dirname + '/dist',
    // filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      // },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     configFile: '.eslintrc.js',
      //     // eslint options (if necessary)
      //   },
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax'],
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/images/',
          emitFile: false,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/fonts/',
          emitFile: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      global: 'window',
    }),
    new WriteWebpackPlugin([{ name: manifest.name, data: Buffer.from(manifest.content) }]),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: '../node_modules/webextension-polyfill/dist/browser-polyfill.js' }, 
        { from: '_locales', to: '_locales' },
        { from: 'icons', to: 'icons', globOptions: { ignore: ['icon.xcf', '.DS_Store'] } },
        { from: 'images', to: 'images', globOptions: { ignore: ['.DS_Store'] } },
        { from: 'oembed', to: 'oembed', globOptions: { ignore: ['.DS_Store'] } },
        { from: 'lists', to: 'lists', globOptions: { ignore: ['.DS_Store'] } },
        // { from: 'content_script/players', to: 'players' },
        { from: 'popup.html', to: 'popup.html', transform: transformHtml },
        { from: 'options.html', to: 'options.html', transform: transformHtml },
        { from: 'installed.html', to: 'installed.html', transform: transformHtml },
        // {
        //   from: 'manifest.json',
        //   to: 'manifest.json',
        //   transform: (content) => {
        //     const jsonContent = JSON.parse(content);
        //     jsonContent.version = version;

        //     if (config.mode === 'development') {
        //       jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
        //     }

        //     return JSON.stringify(jsonContent, null, 2);
        //   },
        // },
      ],
    }),
  ],
};

if (config.mode === 'production') {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false },
    }),
  ]);
}

if (process.env.HMR === 'true') {
  config.plugins = (config.plugins || []).concat([
    new ExtensionReloader({
      manifest: __dirname + '/dist/chrome/manifest.json',
    }),
  ]);
}

function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

module.exports = config;
// export default config
