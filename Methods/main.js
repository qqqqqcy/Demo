var a = [{
    a: {
        a: 1
    },
    b: 2,
    c: [3, 4, 5]
}, 2, 3, [4, 5], function (i) {
    console.log(i * i)
}]

var b = deepClone(a)