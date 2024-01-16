const path = require("path");
const { webpack } = require("webpack");

module.exports = (env, argv) => {
    const config = {
        mode: "development",
        devtool: "eval-source-map",
        entry: "./src/index.tsx",
        output: {
            //publicPath: '/public',
            filename: 'static/bundle.js',
            path: path.resolve(__dirname, 'public'),
        },
        module: {
            rules: [
                {
                    test: /\.tsx$/,
                    include: [path.resolve(__dirname, "src")],
                    use: ["babel-loader", "ts-loader"],
                },
                {
                    test: /\.ts$/,
                    include: [path.resolve(__dirname, "src")],
                    use: "ts-loader",
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader", // Creates "style" nodes from JS strings
                        "css-loader", // Translates CSS into CommonJS
                        "sass-loader", // Compiles Sass to CSS
                    ],
                }
            ]
        },
        resolve: {
            alias: {
                "ivy": path.resolve(__dirname, "./src/ivy"),
            },
            extensions: [".js", ".ts", ".jsx", ".tsx", ".scss", ".sass", ".css"],
            modules: ["node_modules", path.join(__dirname, "./src")],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "public"),
            },
            compress: true,
            port: 8080,
        },
        plugins: [],
    }

    if (argv.mode === "development") {
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    return config;
}