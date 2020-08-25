const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            images: path.resolve(__dirname, 'src/images/'),
        },
    },
    // module: {
    //     rules: [{
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             use: {
    //                 loader: "babel-loader",
    //                 options: {
    //       presets: ['@babel/preset-env'],
    //       plugins: ['@babel/plugin-proposal-class-properties']
    //     }
    //             }
    //         },
    //         {
    //             test: /\.css$/i,
    //     use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, {
    //       loader: "css-loader",
    //       options: {
    //         importLoaders: 2
    //       }
    //     }, 'postcss-loader'],
    //         },
    //         {
    //             test: /\.(png|jpe?g|svg|gif)$/i,
    //             use: [{
    //                 loader: 'file-loader?name=./images/[name].[ext]',
    //                 options: {
    //                     esModule: false,
    //                 },

    //             }, ],
    //         },
    //         {
    //             test: /\.(eot|ttf|woff|woff2)$/,
    //             loader: 'file-loader?name=./vendor/[name].[ext]'
    //         },


    //     ]
    // },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? "style-loader" : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    "file-loader?name=./images/[name].[ext]?",
                    {
                        loader: "image-webpack-loader",
                        options: {},
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "./fonts/[name].[ext]",
                },
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ // 
            filename: './styles/[name].[contenthash].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html',
            chunks: ["main"]
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};