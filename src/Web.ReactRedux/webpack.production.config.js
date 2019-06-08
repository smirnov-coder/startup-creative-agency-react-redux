"use strict";

const webpack = require("webpack");
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsConfigPathsPlugin = require("awesome-typescript-loader").TsConfigPathsPlugin;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const ImageminPlugin = require("imagemin-webpack");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminSvgo = require("imagemin-svgo");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

module.exports = {
    mode: "production",
    devtool: "", // Removed dev-tools mapping
    entry: {
        app: "./ClientApp/index.tsx",
    },
    output: {
        filename: "js/[name].bundle.min.js",
        path: path.join(__dirname, "wwwroot"),
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [
            new TsConfigPathsPlugin()
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /ClientApp/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.s(c|a)ss$/,
                include: /ClientApp/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                require("autoprefixer")(),
                                require("css-mqpacker")(),
                                require("cssnano")()
                            ]
                        }
                    },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "images/[name].[ext]",
                        limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
                use: {
                    loader: "file-loader",
                    options: { name: "fonts/[name].[ext]" }
                }
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new CleanPlugin([
            "wwwroot/*.*",
            "wwwroot/js",
            "wwwroot/css",
            "wwwroot/images",
            "wwwroot/fonts"
        ]),
        new CopyPlugin([
            {
                from: "./ClientApp/assets/images",
                to: "./images"
            },
            {
                from: "./ClientApp/assets/favicon",
                to: "./"
            }
        ]),
        // ImageminPlugin должен идти после всех плагинов, взаимодействующих с изображениями.
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif)$/,
            include: /images/, // Оптимизировать картинки только в папке wwwroot/images.
            name: "images/[name].[ext]",
            bail: false,
            cache: true,
            imageminOptions: {
                plugins: [
                    imageminGifsicle({
                        interlaced: false
                    }),
                    imageminMozjpeg({
                        progressive: true,
                        quality: 80
                    }),
                    imageminPngquant({
                        quality: [0.8, 0.8],
                        speed: 4
                    }),
                    imageminSvgo({
                        removeViewBox: true
                    })
                ]
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].bundle.min.css"
        }),
        new OptimizeCSSAssetsPlugin({}),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "bundle-report.html",
            openAnalyzer: false
        }),
    ],
    optimization: {
        concatenateModules: true,
        splitChunks: {
            chunks: "all",
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/](node_modules|ClientApp[\\/]assets[\\/]lib)[\\/]/,
                    name: "vendor",
                    filename: "js/[name].bundle.min.js"
                }
            }
        }
    },
};