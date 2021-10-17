import { combineReducers } from "redux"
import { authHandler } from "./auth"
import { polygonHandler, polygonSaveHandler } from './map'

export default combineReducers({
    token: authHandler,
    polygon: polygonHandler,
    savedPolygons: polygonSaveHandler
})