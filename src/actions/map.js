export const setPolygon = 'SET-POLYGON'
export const savePolygon = 'SAVE-POLYGON'
export const removePolygon = 'REMOVE-POLYGON'

export function setPolygonAction(path) {
    return {
        type: setPolygon,
        path
    }
}

export function savePolygonAction() {
    return {
        type: savePolygon
    }
}

export function removePolygonAction() {
    return {
        type: removePolygon
    }
}