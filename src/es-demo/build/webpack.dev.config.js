const path = require("path");

module.exports = {
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: path.join(__dirname, "../static"),
    client: {
      logging: "none",
    },
  },
};
