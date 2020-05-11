/*
 * @Author: your name
 * @Date: 2020-04-24 21:24:48
 * @LastEditTime: 2020-05-11 21:22:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack\build\base.js
 */
const path = require('path');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = function (env) {
    const isDev = env.development;
    const styleLoaderOrCssPlugin = isDev ? 'style-loader' : MiniCssExtractPlugin.loader
    const baseOptions = {
        entry: path.resolve(__dirname, '../src/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
        },
        module: {
            rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            }, {
                test: /\.css$/,
                use: [
                    styleLoaderOrCssPlugin,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.scss$/,
                use: [styleLoaderOrCssPlugin, 'css-loader', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }, ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html')
            })
        ]
    }
    if (isDev) {
        return merge(baseOptions, require('./dev'))
    } else {
        return merge(baseOptions, require('./prod'))
    }
}