"use strict";

const path = require("path");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const globImporter = require("node-sass-glob-importer");
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        index: "./ClientApp/index.tsx",
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
        alias: { "react-dom": "@hot-loader/react-dom" }
    },
    module: {
        rules: [
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
                test: /\.s(c|a)ss$/,
                exclude: /node_modules/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "sass-loader",
                        options: { importer: globImporter() } // А надо ли?
                    }
                ]
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
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: {
                    loader: "file-loader",
                    options: { name: "fonts/[name].[ext]" }
                }
            }
        ]
    },

    plugins: [
        new CleanPlugin([
            "wwwroot/*.*",
            //"wwwroot/images",
            "wwwroot/fonts",
            "wwwroot/js",
            "wwwroot/css",
        ]),
        new CopyPlugin([
            {
                from: "./ClientApp/images",
                to: "./images"
            },
            {
                from: "./ClientApp/favicon",
                to: "./"
            }
        ]),
        new CheckerPlugin()
    ]
};
