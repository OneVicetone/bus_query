import Router from 'koa-router'
import BusQuery from '../../schema/busQuery'

const busQueryRoutesWeb = () => {
    const route = new Router
    route.get('/routeList',async ctx => {
        const data = await BusQuery.find()
        ctx.body = {
            data,
            code:200
        }
    })
    route.post('/findBusStatusByRoute',async ctx => {
        const {routes} = ctx.request.body
        const reg = new RegExp(routes,'i')
        const data = await BusQuery.findOne({
            $or: [
                { routes:{ $regex:reg }}
            ]
        })
        if(!data){
            ctx.body = {
                code:404,
                msg:'您查询的线路暂无停运信息'
            }
            return
        }
        ctx.body = {
            data,
            code:200
        }
    })
    route.post('/fuzzyFindRoutes', async ctx => {
        const { routes } = ctx.request.body
        const reg = new RegExp(routes,'i')
        const data = await BusQuery.find({
            $or: [
                { routes:{ $regex:reg }}
            ]
        })
        if(!data){
            ctx.body = {
                code: 200,
                data:[]
            }
            return
        }
        ctx.body = {
            data,
            code:200
        }
    })
    return route
}

export default busQueryRoutesWeb