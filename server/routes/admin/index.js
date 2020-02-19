import Router from 'koa-router'
import parseXlsx from 'excel'
import path from 'path'
import BusQuery from '../../schema/busQuery'

const busQueryRoutesAdmin = () => {
    const route = new Router
    route.get('/routeList',async ctx => {
        const data = await BusQuery.find()
        ctx.body = {
            data,
            code:200
        }
    })
    route.post('/addRouteInfo',async ctx => {
        const {routes,busSite,status} = ctx.request.body
        const data = await BusQuery.create({routes,busSite,status})
        ctx.body = {
            data,
            code:200
        }

    })
    route.delete('/deleteRoute/:id', async ctx => {
        const id = ctx.params.id
        const data = await BusQuery.findByIdAndRemove(id)
        ctx.body = {
            data,
            code:200
        }
    })
    route.put('/changeRouteInfo/:id', async ctx => {
        const { id } = ctx.params
        const { routes,busSite,status } = ctx.request.body
        const data = await BusQuery.findByIdAndUpdate(id,{routes,busSite,status})
        ctx.body = {
            data,
            code:200
        }
    })

    route.post('/importJson', async ctx => {
        const data = ctx.request.body
        console.log(data)
        for(let i of data){
            await BusQuery.create(i)
        }
        ctx.body = 'success'
    })

    return route
}

export default busQueryRoutesAdmin