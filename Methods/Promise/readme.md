# Promise

promise 基本用法

```js
new Promise((res,rej)=>{
    setTimeout(()=>{
        console.log('timer')
        res('fin')
    },2000)
})
.then(date=>console.log(date))
.catch(err=>console.log(err))
```