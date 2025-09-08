import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import { resolve } from "path";

export default merge(common, {
  mode: "production",
  output: {
    filename: "main.js",
    // eslint-disable-next-line no-undef
    path: resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
