module.exports = {
	devServer:{
		port:9000,
		proxy:{
			"/api":{
				changeOrigin:true,
				target:"http://jczl.giscloud.cx/",
				// target:"http://10.21.197.237/",
				pathRewrite:{
					"^/api":''
				}
			}
		}
	},
	assetsDir:'resources',
	productionSourceMap:false, // 打包后去掉生成的map文件
}