new Promise((res, rej) => {
        console.log('begin_0')
        setTimeout(() => {
            console.log('timer_0')
            res('p1_fin')
        }, 1000)
        console.log('begin_1')
    })
    .then(data => {
        console.log(data)
        return new Promise((res, rej) => {
            setTimeout(() => {
                console.log('timer_2')
                res('p2_fin')
            }, 1000)
        })
    }).then(data => {
        console.log(data)
        console.log('p3_fin')
    })

console.log('out_p')

new Promise((res, rej) => {
        console.log(error)
    })
    .then(
        data => console.log(data),
        err => console.log(err)
    )