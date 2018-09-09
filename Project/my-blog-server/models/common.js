module.exports = {
    response: function (msg, code) {
        return {
            "common": {
                "resultCode": msg ? code || "2" : "1",
                "resultMsg": msg || "成功"
            }
        }
    }
}