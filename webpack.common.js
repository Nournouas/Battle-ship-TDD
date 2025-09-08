import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".js"],
  },
};
