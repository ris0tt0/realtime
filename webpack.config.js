const deps = require('./package.json').dependencies;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const federationConfig = {
  name: 'jaybrt',
  filename: 'remoteEntry.js',
  shared: {
    '@emotion/react': { singleton: true },
    '@reduxjs/toolkit': { singleton: true },
    axios: { singleton: true },
    'date-fns': { singleton: true },
    'js-logger': { singleton: true },
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-redux': { singleton: true },
    'react-router-dom': { singleton: true },
    reselect: { singleton: true },
  },
  // exposes: {
  //   './CommandsProvider': path.resolve(__dirname, 'src/providers/commands.tsx'),
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
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/**/*'),
          context: './public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
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
