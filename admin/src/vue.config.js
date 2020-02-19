const devPort = 8000
module.exports = {
    devServer: {
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        progress: false,
        // proxy: {
        //     [process.env.VUE_APP_BASE_URL]: {
        //         target: `http://localhost:${devPort}`,
        //         changeOrigin: false,
        //         ws: true,
        //         pathRewrite: {
        //           [`^${process.env.NODE_ENV.VUE_APP_BASE_URL}`]: ""
        //         }
        //     }
        // }
    }
}