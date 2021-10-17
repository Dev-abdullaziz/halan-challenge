import { setPolygon, removePolygon, savePolygon } from "../actions/map"

export function polygonHandler(state=[], action) {
    switch(action.type) {
        case setPolygon:
            return action.path
        case removePolygon:
            return []
        default:
            return state
    }
}

export function polygonSaveHandler(state=0,action) {
    switch (action.type) {
        case savePolygon:
            return state+1            
        default:
            return state
    }
}