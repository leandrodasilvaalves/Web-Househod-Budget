const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const readAliases = () => {
    const jsconfigContent = fs.readFileSync(path.resolve(__dirname, 'jsconfig.json'), 'utf8');
    const { paths } = JSON.parse(jsconfigContent).compilerOptions;

    return Object.keys(paths).reduce((acc, key) => {
        const aliasKey = key.replace('/*', '');
        const aliasValue = paths[key][0].replace('/*', '');
        acc[aliasKey] = path.resolve(__dirname, aliasValue);
        return acc;
    }, {});
}

module.exports = {
    mode: 'development',
    entry: './src/static/scripts/main.js',
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'static/css/'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    resolve: {
        alias: readAliases(),
    }
};