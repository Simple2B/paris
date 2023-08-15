//webpack.config.js
const path = require('path');
const {merge} = require('webpack-merge');

const defaultConfig = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};

const baseConfig = {
  entry: {
    main: './src/base.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/base.js', // <--- Will be compiled to this single file
  },
};

const userConfig = {
  entry: {
    main: './src/user.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/user.js', // <--- Will be compiled to this single file
  },
};

const ticketConfig = {
  entry: {
    main: './src/ticket.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/ticket.js', // <--- Will be compiled to this single file
  },
};

const dashboardConfig = {
  entry: {
    main: './src/dashboard.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/dashboard.js', // <--- Will be compiled to this single file
  },
};

const botConfig = {
  entry: {
    main: './src/bot.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/bot.js', // <--- Will be compiled to this single file
  },
};

const taskConfig = {
  entry: {
    main: './src/task.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/task.js', // <--- Will be compiled to this single file
  },
};

const configs = [baseConfig, userConfig, ticketConfig, dashboardConfig, botConfig, taskConfig].map(conf =>
  merge(defaultConfig, conf),
);

module.exports = configs;
