const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                        loader: 'babel-loader',
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            // eslint options (if necessary)
                            fix: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
                use: [{
                        loader: 'url-loader', // 根据图片大小，把图片优化成base64
                        options: {
                            limit: 10000
                        }
                    },
                    {
                        loader: 'image-webpack-loader', // 先进行图片优化
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'AICODER 全栈线下实习', // 默认值：Webpack App
            filename: 'index.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, 'src/index.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true // 移除属性的引号
            }
        }),
        new CleanWebpackPlugin(['dist']) // 清除dist
    ]
};