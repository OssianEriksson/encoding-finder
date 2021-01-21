const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      string_decoder: require.resolve("string_decoder/"),
    },
  },
};
