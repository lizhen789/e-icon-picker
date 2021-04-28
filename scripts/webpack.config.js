const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const devMode = 'production';//development  production
const config = require('./config');

module.exports = {
    devtool: false,
    mode: devMode,
    entry: {
        'index':  path.resolve(__dirname, '../src/index.js'),
    },
    externals: {
        vue: config.vue
    },
    output: {
        path: path.resolve(__dirname, '../lib/'),
        publicPath: '../lib/',
        filename: '[name].js',
        library: 'eIconPicker',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.js$/,
                /* exclude: /(node_modules)/,*/
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                            publicPath: './',
                        },
                    },
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer"
                                    ],
                                ],
                            }
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpg|woff|svg|ttf|eot)\??.*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false, // 这里设置为false
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: false,
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            new CssMinimizerPlugin({
                parallel: true,
                minify: [
                    CssMinimizerPlugin.cssnanoMinify
                ],
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {removeAll: true},
                        },
                    ],
                },
            }),
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        //参数是一个数组，数组中是需要删除的目录名
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/utils/getSvg.js', to: 'getSvg.js'},
                {from: 'src/js/eiconfont.js', to: 'symbol.js'},
            ],
        }),
    ]
};
