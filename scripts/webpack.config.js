const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const devMode = 'production';//development  production
const config = require('./config');
const pkg = require('../package.json');

const webpack = require('webpack')

const createBanner = () => {
    return `
   ${pkg.name} v${pkg.version}
   (c) ${new Date().getFullYear()} ${pkg.author}
   @license ${pkg.license}
  `
}

module.exports = {
    devtool: false,
    mode: devMode,
    entry: {
        'index': path.resolve(__dirname, '../src/index.js'),
        'index.min': path.resolve(__dirname, '../src/index.js'),
    },
    externals: {
        vue: config.vue
    },
    output: {
        path: path.resolve(__dirname, './lib/'),
        publicPath: './lib/',
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
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: path.resolve(__dirname, './replace-str-loader')
                    }
                ]
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
                            esModule: false, // ???????????????false
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
            new UglifyJsPlugin({
                include: /min/,
                uglifyOptions: {
                    warnings: false,
                    //????????????????????????console
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                    }
                },
                sourceMap: false,
                parallel: true,
                extractComments: true,
            }),
            // ??????????????????????????? TerserPlugin ?????????????????????????????????????????? TerserPlugin ???????????????????????????
            new webpack.BannerPlugin({
                entryOnly: true, // ?????????????????????????????? banner ??????
                banner: createBanner()
            }),
        ],
    },

    plugins: [
        new ProgressBarPlugin(),
        new CleanWebpackPlugin(),
        // ??????????????????????????????
        new VueLoaderPlugin(),
        //????????????????????????????????????????????????????????????
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                    normalizeUnicode: false
                }]
            },
            canPrint: true
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/utils/getSvg.js', to: 'getSvg.js'},
                {from: 'src/js/eiconfont.js', to: 'symbol.js'},
            ],
        }),
    ]
};
