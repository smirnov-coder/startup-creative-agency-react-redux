"use strict";

const webpack = require("webpack");
const path = require("path");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: {
        app: "./ClientApp/index.tsx",
    },
    output: {
        filename: "js/[name].bundle.js",
        path: path.join(__dirname, "wwwroot"),
        publicPath: "/"
    },

    // Под вопросом
    //stats: { modules: false },
    //watchOptions: {
    //    ignored: /node_modules/
    //},
    //devServer: {
    //    hot: true
    //},

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
            //"components": path.resolve(__dirname, "ClientApp", "components"),
            //"containers": path.resolve(__dirname, "ClientApp", "containers"),
            //"store": path.resolve(__dirname, "ClientApp", "store"),
            //"scripts": path.resolve(__dirname, "ClientApp", "scripts"),
            //"styles": path.resolve(__dirname, "ClientApp", "styles"),
            //"bootstrap/css": path.resolve(__dirname, "ClientApp", "assets/lib/bootstrap-customized/css/bootstrap.css"),
            //"bootstrap/js": path.resolve(__dirname, "ClientApp", "assets/lib/bootstrap-customized/js/bootstrap.js")
        },
        plugins: [
            new TsConfigPathsPlugin()
        ],
    },
    //resolveLoader: {
    //    plugins: [
    //        TsConfigPathsPlugin,
    //        //PnpWebpackPlugin.moduleLoader(module),
    //    ],
    //},

    module: {
        rules: [
            //{
            //    test: /\.tsx?/,
            //    loader: "ts-loader"
            //},
            {
                test: /\.tsx?$/,
                include: /ClientApp/,
                exclude: /node_modules/,
                loader: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            useCache: true,
                            useBabel: true,
                            babelOptions: {
                                babelrc: false,
                                plugins: ["react-hot-loader/babel"],
                            }
                        }
                    }
                ]
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
                test: /\.(jpe?g|png|gif|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "images/[name].[ext]",
                        limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.(woff2?|ttf|otf|eot)$/,
                use: {
                    loader: "file-loader",
                    options: { name: "fonts/[name].[ext]" }
                }
            }
        ]
    },

    plugins: [
        // Повторно объявляем jQuery глобальной функцией, чтобы не приходилось
        // импортировать её в каждый пользовательский js-файл.
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DllReferencePlugin({
            context: ".",
            manifest: require("./wwwroot/lib/vendor-manifest.json"),
            name: "vendor_lib"
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
        //new TsConfigPathsPlugin(),
        new CheckerPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
    ]
};
