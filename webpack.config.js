const webpack = require('webpack'); 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./Front-end/index.js'], //this is where webpack first looks to create the bundle.js file
        //* if a file isn't connected to this through imports, it won't get bundled and therefore, is effectively unusable to the browser
    mode: 'development', // this allows us to connect to webpack's development server
    output: {
      path: path.resolve(__dirname, 'dist'), //if mode === 'production', this is the path to where the bundle.js file will get saved. Otherwise it'll be saved in memory
      filename: 'bundle.js', 
    //   publicPath: "/build",   --> still not sure what this does but works without it
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        static: {
            directory: path.join(__dirname, 'dist')
        },
        proxy: {
          //tentatively we can call our backend stuff to /api/
          '/api/**': {
              target: 'http://localhost:3000',
              secure: false
          }
        }
    },
    modules: {
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    option: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            { 
              test: /\.(?:sa|s?c)ss$/,
              exclude: /node_modules/, 
              use: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './Front-end/index.html'
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
}






