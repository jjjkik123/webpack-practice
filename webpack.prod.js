"use strict";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/index.js",
		search: "./src/search.js",
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name]_[chunkhash:8].js",
	},
	// watch:true,
	mode: "production",
	module: {
		rules: [
			{
				test: /.js$/,
				use: "babel-loader",
        // query:{
        //   presets:['react','es2015']
        // }
			},
			{
				test: /.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"less-loader",
					"postcss-loader",
				],
			},
			{
				test: /.(png|jpg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name]_[hash:8].[ext]",
						},
					},
				],
			},
		],
	},
	optimization: {
		minimizer: [new CssMinimizerWebpackPlugin({})],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name]_[contenthash:8].css",
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src/search.html"),
			filename: "search.html",
			chunks: ["search"],
			inject: true, //自动将打包出来相同的chunk注入到html中
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false,
			},
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src/index.html"),
			filename: "index.html",
			chunks: ["index"],
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false,
			},
		}),
		new CleanWebpackPlugin(),
	],
};
