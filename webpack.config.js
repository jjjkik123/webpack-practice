"use strict";
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/index.js",
		search: "./src/search.js",
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
	},
	// watch:true,
	mode: "development",
	module: {
		rules: [
			{
				test: /.js$/,
				use: "babel-loader",
			},
			{
				test: /.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /.less$/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /.(png|jpg)$/,
				use: ["file-loader"],
			},
		],
	},
	plugins: [new webpack.HotModuleReplacementPlugin(), new CleanWebpackPlugin()],
	devServer: {
		static: "./dist",
		hot: true,
	},
};
