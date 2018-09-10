module.exports = {
    response: function (data, msg, code) {
        if (data instanceof Error) {
            data = data.message
        }
        if (typeof data === typeof {}) {
            return {
                "common": {
                    "resultCode": msg ? code || "2" : "1",
                    "resultMsg": msg || "成功"
                },
                "data": data
            }
        } else {
            code = msg
            msg = data
            return {
                "common": {
                    "resultCode": msg ? code || "2" : "1",
                    "resultMsg": msg || "成功"
                }
            }
        }
    }
}