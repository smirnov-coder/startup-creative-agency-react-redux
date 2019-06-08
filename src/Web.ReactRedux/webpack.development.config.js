"use strict";

const webpack = require("webpack");
const path = require("path");
const TsConfigPathsPlugin = require("awesome-typescript-loader").TsConfigPathsPlugin;
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "eval", // https://webpack.js.org/configuration/devtool/
    entry: {
        app: "./ClientApp/index.tsx",
    },
    output: {
        filename: "js/[name].bundle.js",
        path: path.join(__dirname, "wwwroot"),
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
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
                loader: [{
                    loader: "awesome-typescript-loader",
                    options: {
                        useCache: true,
                        useBabel: true,
                        babelOptions: {
                            babelrc: false,
                            plugins: ["react-hot-loader/babel"],
                        }
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s(c|a)ss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"]
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
                test: /\.(woff2?|ttf|otf|eot|svg)$/,
                use: {
                    loader: "file-loader",
                    options: { name: "fonts/[name].[ext]" }
                }
            }
        ]
    },
    plugins: [
        // Twitter Bootstrap и различные плагины jQuery требуют, чтобы функция jQuery была глобальной.
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new CleanPlugin([
            "wwwroot/*.*",
            //"wwwroot/images",
            "wwwroot/fonts",
            "wwwroot/js",
            "wwwroot/css",
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
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/](node_modules|ClientApp[\\/]assets[\\/]lib)[\\/]/,
                    name: "vendor",
                    filename: "js/[name].bundle.js"
                }
            }
        }
    }
};
