function Promise(executor) {
    const self = this
    self.status = 'pendding'
    self.value = undefined
    self.reason = undefined
    self.onfulfilledCallbacks = []; //  异步时候收集成功回调
    self.onrejectedCallbacks = []; //  异步时候收集失败回调
    function resolve(value) {
        if (self.status === 'pendding') {
            self.status = 'fulfilled'
            self.value = value
            self.onfulfilledCallbacks.forEach(element => {
                element()
            });
        }
    }

    function reject(error) {
        if (self.status === 'pendding') {
            self.status = 'rejected'
            self.reason = error
            self.onrejectedCallbacks.forEach(element => {
                element()
            });
        }
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

Promise.prototype.then = function (onfulfilled, onrejected) {
    const self = this
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
    onrejected = typeof onrejected === 'function' ? onrejected : err => {
        throw err
    }
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === 'fulfilled') {
            setTimeout(() => {
                try {
                    let x = onfulfilled(self.value);
                    resolvePromise(self, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            }, 0)
        } else if (self.status === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onrejected(self.reason);
                    resolvePromise(self, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            }, 0)
        } else if (self.status === 'pendding') {
            self.onfulfilledCallbacks.push(() =>
                setTimeout(() => {
                    try {
                        let x = onfulfilled(self.value);
                        resolvePromise(self, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            )
            self.onrejectedCallbacks.push(() =>
                setTimeout(() => {
                    try {
                        let x = onrejected(self.reason);
                        resolvePromise(self, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            )
        }
    })
    return promise2
}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) return reject(new TypeError('typeError:大佬，你循环引用了!'));
    let called
    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise, y, resolve, reject)
                }, err => {
                    if (called) return
                    called = true
                    reject(err)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            reject(error)
        }
    } else {
        resolve(x)
    }
}