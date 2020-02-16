const koa = require('koa')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')


const app = new koa()

const port = 8000
app.listen(port,()=>{
    console.log('server is running on port 8000')
})