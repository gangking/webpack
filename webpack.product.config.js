// // 最终部署模式文件
// // 单独抽取css
// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// module.exports = {
//     mode: 'production',
//     entry: './src/index.js',
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, './dist')
//     },
//     module: {
//         rules: [{
//             test: /\.(sa|sc|c)ss$/,
//             use: [
//                 MiniCssExtractPlugin.loader,
//                 {
//                     loader: "css-loader",
//                     options: {
//                         sourceMap: true
//                     }
//                 },
//                 {
//                     loader: 'postcss-loader',
//                     options: {
//                         ident: 'postcss',
//                         sourceMap: true,
//                         plugins: loader => [
//                             require('autoprefixer')({
//                                 browsers: ['> 0.15% in CN'] // 浏览器范围，包含ie8
//                             }) // 添加前缀
//                         ]
//                     }
//                 },
//                 {
//                     loader: "sass-loader",
//                     options: {
//                         sourceMap: true
//                     }
//                 }
//             ]
//         }]
//     },
//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: '[name].[hash].css', // 设置最终输出的文件名
//             chunkFilename: '[id].css'
//         })
//     ]
// };

// 压缩css
// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const autoprefixer = require('autoprefixer');

// module.exports = {
//   mode: 'production',
//   entry: './src/index.js',
//   output: {
//     filename: 'main.[hash].js',
//     path: path.resolve(__dirname, './dist')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(sa|sc|c)ss$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           {
//             loader: 'css-loader'
//           },
//           {
//             loader: 'postcss-loader',
//             options: {
//               ident: 'postcss',
//               plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
//             }
//           },
//           {
//             loader: 'sass-loader'
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: '[name].css',
//       chunkFilename: '[id].css'
//     })
//   ],
//   optimization: {
//     minimizer: [new OptimizeCSSAssetsPlugin({})]
//   }
// };

// js压缩
// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const autoprefixer = require('autoprefixer');

// module.exports = {
//   mode: 'production',
//   entry: './src/index.js',
//   output: {
//     filename: 'main.[hash].js',
//     path: path.resolve(__dirname, './dist')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(sa|sc|c)ss$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           {
//             loader: 'css-loader'
//           },
//           {
//             loader: 'postcss-loader',
//             options: {
//               ident: 'postcss',
//               plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
//             }
//           },
//           {
//             loader: 'sass-loader'
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: '[name].css',
//       chunkFilename: '[id].css'
//     })
//   ],
//   optimization: {
//     minimizer: [
//       new UglifyJsPlugin({
//         cache: true,
//         parallel: true,
//         sourceMap: true // set to true if you want JS source maps
//       }),
//       new OptimizeCSSAssetsPlugin({})
//     ]
//   }
// };


// 解决hash值变化问题bpack-plugin
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist']), // 清除dist
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
      chunkFilename: '[id][hash].css'
    }),
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'main.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/main.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true // 移除属性的引号
      }
    })
  ],
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
        test: /\.(sa|sc|c)ss$/,
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
                overrideBrowserslist: ['> 0.15% in CN']
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
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};