const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    allowedHosts:[
      "395789ob20.zicp.vip",
      "localhost"
    ]
  }
  
})
