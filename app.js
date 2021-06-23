const express = require('express')
const app = express()

var router = require('./router')
const routerVD = require('./routerVD')

var bodyParser = require('body-parser')
var session = require('express-session')

app.use('/public/', express.static(__dirname + '/public/'))


//配置中间件一定要在挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//配置express-session
app.use(session({
  secret: 'lzj',    //给数据加个字符串，增加安全性
  resave: false,
  saveUninitialized: true
}))

app.use(router)    //把路由容器挂载到app服务中
app.use(routerVD)

app.listen(3000, () => console.log(`App listening on port 3000!`))

