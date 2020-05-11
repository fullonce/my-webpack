/*
 * @Author: your name
 * @Date: 2020-04-24 21:24:34
 * @LastEditTime: 2020-05-07 20:37:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack\build\prod.js
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
            new optimizeCssAssetsWebpackPlugin(),
            new terserWebpackPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        })
    ]
}