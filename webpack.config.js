const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output:{
        filename:'main.bundle.js',
        // path:'C:/Users/VISURA/OneDrive/Desktop/DEP/Class/2020.11.24/Exercise/hello-webpack/dist',
        path:__dirname+'/dist/',
        publicPath:'',
        assetModuleFilename:'asset/[hash][ext][query]'
    },
    // mode:'production',
    module: {
        rules:[
            /*{
                test: /\.scss/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },*/
            {
                test: /\.scss/,
                use: ['css-loader','sass-loader']
            },
            {
                test:/\.(png|jepg|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
                type:'asset/resource'
            },
            {
                test: /\.html/,
                use: ['html-loader']
            },
        ]
    },
    plugins: [
                
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        
    ],
    
   
}