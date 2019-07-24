const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let prodConfig = module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: loader => [require('autoprefixer')({
                            overrideBrowserslist: ['> 0.15% in CN']
                        })]
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][hash].css',
            chunkFilename: '[id][hash].css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // 如果需要JS源映射，请设置为true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};

module.exports = merge(common, prodConfig)