import Router from 'koa-router'
import busQueryRoutesAdmin from './admin';
import busQueryRoutesWeb from './web';

const router = new Router()
const busQuery_routes_admin = busQueryRoutesAdmin()
const busQuery_routes_web = busQueryRoutesWeb()

router.use('/api/admin',busQuery_routes_admin.routes(),busQuery_routes_admin.allowedMethods())
router.use('/api/web',busQuery_routes_web.routes(),busQuery_routes_web.allowedMethods())

export default router