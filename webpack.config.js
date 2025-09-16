const deps = require('./package.json').dependencies;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const federationConfig = {
  name: 'jaybrt',
  filename: 'remoteEntry.js',
  shared: {
    '@emotion/react': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['@emotion/react'],
      version: deps['@emotion/react'],
    },
    // '@emotion/styled': {
    //   singleton: true,
    //   strictVersion: true,
    //   requiredVersion: deps['@emotion/styled'],
    //   version: deps['@emotion/styled'],
    // },
    '@mui/icons-material': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['@mui/icons-material'],
      version: deps['@mui/icons-material'],
    },
    '@mui/material': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['@mui/material'],
      version: deps['@mui/material'],
    },
    '@mui/system': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['@mui/system'],
      version: deps['@mui/system'],
    },
    '@reduxjs/toolkit': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['@reduxjs/toolkit'],
      version: deps['@reduxjs/toolkit'],
    },
    axios: {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps.axios,
      version: deps.axios,
    },
    'date-fns': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['date-fns'],
      version: deps['date-fns'],
    },
    'js-logger': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['js-logger'],
      version: deps['js-logger'],
    },
    react: {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps.react,
      version: deps.react,
    },
    'react-dom': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['react-dom'],
      version: deps['react-dom'],
    },
    'react-redux': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['react-redux'],
      version: deps['react-redux'],
    },
    'react-router-dom': {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps['react-router-dom'],
      version: deps['react-router-dom'],
    },
    reselect: {
      singleton: true,
      strictVersion: true,
      requiredVersion: deps.reselect,
      version: deps.reselect,
    },
  },
  exposes: {
    './CommandsProvider': path.resolve(__dirname, 'src/providers/commands.tsx'),
  },
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
