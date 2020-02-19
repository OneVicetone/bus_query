import { BASE_URL } from './index.js'
import fetch from '../utils/fetch.js'

export const getBusQueryList = () => fetch.get(BASE_URL+'/routeList')

export const deleteRouteById = id => fetch.delete(BASE_URL+'/deleteRoute',id)