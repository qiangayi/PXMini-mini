let url_config = ""
const api = "api"


if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'http://localhost:18181/'
}else{
    // 生产环境
    url_config = 'https://*****.com/'
}
url_config = url_config + api

export default url_config