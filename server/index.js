// const koa = require('koa')
// const static = require('koa-static')
// const bodyparser = require('koa-bodyparser')
// const router = require('koa-router')
import koa from 'koa'
// import static from 'koa-static'
import bodyparser from 'koa-bodyparser'
import cors from '@koa/cors'

const app = new koa()

// app.use(koaStatic())
app.use(bodyparser())
app.use(cors())
import router from './routes'
import connectDb from './plugins/db/index';
connectDb()

app.use(router.routes(),router.allowedMethods())

const port = 8000

app.listen(port,()=>{
    console.log('server is running on port 8000')
})