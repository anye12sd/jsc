module.exports = {
	devServer:{
		proxy:{
			"/api":{
				changeOrigin:true,
				target:"http://10.21.197.237",
				// target:"http://localhost:8080",
				pathRewrite:{
					"^/api":''
				}
			}
		}
	},
	assetsDir:'static'
}