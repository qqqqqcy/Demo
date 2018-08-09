# Promise

> [参考](https://juejin.im/post/5b596449f265da0f47352989)

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