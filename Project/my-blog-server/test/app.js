const express = require("express")
const app = express()

app.get("/", function (req, res) {
    res.send("you just sent a GET request, friend");
});

app.post("/", function (req, res) {
    res.send("a POST request? nice");
});

app.put("/", function (req, res) {
    res.send("i don't see a lot of PUT requests anymore");
});

app.delete("/", function (req, res) {
    res.send("oh my, a DELETE??");
});

app.get("/random/:min/:max", function (req, res) {
    let {
        min,
        max
    } = req.params
    min = parseInt(min)
    max = parseInt(max)
    if (isNaN(min) || isNaN(max)) {
        res.status(400)
        res.json({
            error: "Bad request."
        })
        return
    }

    let result = Math.round((Math.random() * (max - min)) + min)
    res.json({
        result: result
    })
})

app.listen(8088, function () {
    console.log("App started on port 8088")
})