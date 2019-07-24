const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');

let devConfig = {
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true, // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
        port: 8081, // 端口
        open: true, // 是否打开浏览器
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: loader => [require('autoprefixer')({
                            overrideBrowserslist: ['> 0.15% in CN']
                        })]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(), // 更容易查看(patch)的依赖
        new webpack.HotModuleReplacementPlugin(), // 替换插件
    ]
};

module.exports = merge(common, devConfig)