import { BASE_URL } from './index.js'
import fetch from '@/utils/fetch.js'

export const getBusQueryList = () => fetch.get(BASE_URL+'/routeList')

export const deleteRouteById = id => fetch.delete(BASE_URL+'/deleteRoute',id)

export const addNewRoute = ({routes,busSite,status}) => fetch.post(BASE_URL+'/addRouteInfo',{routes,busSite,status})

export const changeRoute = ({routes,busSite,status},id) => fetch.put(BASE_URL+'/changeRouteInfo',{routes,busSite,status},id)