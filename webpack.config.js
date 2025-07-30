const deps = require('./package.json').dependencies;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const { publicDecrypt } = require('crypto');

const federationConfig = {
  name: 'jayrt',
  filename: 'remoteEntry.js',
  shared: {
    '@emotion/react': {
      singleton: true,
      eager: true,
      version: deps['@emotion/react'],
    },
    '@emotion/styled': {
      singleton: true,
      eager: true,
      version: deps['@emotion/styled'],
    },
    '@mui/icons-material': {
      singleton: true,
      requiredVersion: deps['@mui/icons-material'],
    },
    '@mui/material': {
      singleton: true,
      version: deps['@mui/material'],
    },
    '@mui/system': {
      singleton: true,
      version: deps['@mui/system'],
    },
    axios: {
      singleton: true,
      version: deps.axios,
    },
    'date-fns': {
      singleton: true,
      version: deps['date-fns'],
    },
    'js-logger': {
      singleton: true,
      version: deps['js-logger'],
    },
    react: {
      singleton: true,
      eager: true,
      version: deps.react,
    },
    'react-dom': {
      singleton: true,
      eager: true,
      version: deps['react-dom'],
    },
    'react-router-dom': {
      singleton: true,
      eager: true,
      version: deps['react-router-dom'],
    },
    'react-youtube': {
      singleton: true,
      version: deps['react-youtube'],
    },
    zustand: {
      singleton: true,
      version: deps.zustand,
    },
  },
  // exposes: {
  //   './DateUtils': path.resolve(__dirname, '../', 'src/pages/utils.ts'),
  //   './Apod': path.resolve(__dirname, '../', 'src/components/apod/index.tsx'),
  //   './CommandsProvider': path.resolve(
  //     __dirname,
  //     '../',
  //     'src/providers/commands.tsx',
  //   ),
  // },
};

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'brt-[name].js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    static: false,
    historyApiFallback: {
      index: '/index.html',
    },
    port: 9002,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'real time',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new Dotenv({
      defaults: true,
      safe: true,
    }),
    new ModuleFederationPlugin({
      ...federationConfig,
    }),
    new FederatedTypesPlugin({
      federationConfig,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [/node_modules/, /\/\.yarn\/\_\_virtual\_\_/],
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/, /\/\.yarn\/\_\_virtual\_\_/],
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;
