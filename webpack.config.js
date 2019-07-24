// const path = require('path');

// module.exports = {
//   mode: 'development',
//   entry: './src/index.js',
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, './dist')
//   }
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除dist

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(['/dist']), // 清除dist
        new MiniCssExtractPlugin({
            filename: '[name][hash].css',
            chunkFilename: '[id][hash].css'
        }),
        new HtmlWebpackPlugin({
            title: 'AICODER 全栈线下实习', // 默认值：Webpack App
            filename: 'main.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, 'src/main.html'), // 注意是src下面的
            minify: {
                collapseWhitespace: true, // 是否移除空行
                removeComments: true, // 是否去掉注释
                removeAttributeQuotes: true // 移除属性的引号
            }
        })
    ],
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            //   {
            //     test: /\.(sc|c|sa)ss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            //   }
            {
                test: /\.(sc|c|sa)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: loader => [autoprefixer({
                                overrideBrowserslist: ['> 0.15% in CN'] // 浏览器范围包含ie8
                            })]
                        }
                    },
                    {
                        loader: 'sass-loader'
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
    }
};