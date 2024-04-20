const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
   mode: "production",
   entry: {
      background: path.resolve(__dirname, "..", "src", "background.ts"),
      content: path.resolve(__dirname, "..", "src", "content.ts"),
      popup:  path.resolve(__dirname, "..", "src", "popup.ts"),
   },
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   resolve: {
      extensions: ['.ts', '.js'], 
   },
   plugins: [
      new CopyPlugin({
         patterns: [
            {from: ".", to: ".", context: "public"},
            { from:  path.resolve(__dirname, "..", "src", "popup.html"), to: '' },
            { from:  path.resolve(__dirname, "..", "public", "icons"), to: 'icons' },
            { from:  path.resolve(__dirname, "..", "public", "css"), to: 'css/' },
            { from:  path.resolve(__dirname, "..", "node_modules", "bootstrap/dist/css/bootstrap.min.css"), to: 'css/' },
         ]
      }),
   ],
   devtool: 'source-map', 
};