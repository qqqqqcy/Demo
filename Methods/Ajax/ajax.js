function Ajax(obj) {
    obj.async = obj.async ? true : false
    var xhr = new XMLHttpRequest()
    obj.data = params(obj.data)
    if (obj.method === 'get') {
        obj.url += (obj.url.includes('?') ? '' : '?') + obj.data
    }
    // 异步
    if (obj.async === true) {
        xhr.onreadystatechange === function () {
            if (xhr.readyState == 4) {
                callback()
            }
        }
    }

    xhr.open(obj.method, obj.url, obj.async)
    if (obj.method === 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(obj.data)
    } else {
        xhr.send(null)
    }

    // 同步
    if (obj.async === false) {
        callback
    }

    function callback() {
        if (xhr.status == 200) {
            obj.success(xhr.responseText)
        } else {
            alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
        }
    }
}

function params(obj) {
    var str = []
    for (var key in obj) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.key))
    }
    return str.join('&')
}