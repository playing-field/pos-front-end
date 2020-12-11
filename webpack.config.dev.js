const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { default: merge } = require("webpack-merge");
const superConfig=require('./webpack.config');
module.exports = merge(superConfig,{
    
    devServer:{
        // publicPath:'/dist/', meka meheam ona na dan index.html eka thiyana thanamayi thiyenne anith dewal e hinda awulk na
        // watchContentBase:true, methanadi meka ona wenneth na ayi hetuwa eya khomath dan dist eka diha bln innwa index.html ekath eka athule thiyanwa
        // contentBase:'.' 

        port:3000
    },
    mode: 'development',
    plugins:[
        new MiniCssExtractPlugin({
            filename:'main.css'
        }),
    ],
    // devtool:false
})