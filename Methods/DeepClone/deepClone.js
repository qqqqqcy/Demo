function deepClone(data) {
    var obj
    if (data === null) {
        return data
    } else if (data instanceof Array) {
        obj = []
        for (var i = 0; i < data.length; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (data instanceof Object && typeof data !== 'function') {
        obj = {}
        for (var key in data) {
            obj[key] = deepClone(data[key])
        }
    } else {
        return data
    }
    return obj
}