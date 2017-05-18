const path = require('path');

module.exports = {
    entry: {
        game: './src/pages/game.ts',
        client: './src/pages/client.ts',
        lobby: "./src/pages/lobby.ts"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),  
        filename: '[name].js',
        publicPath: '/dist/'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}