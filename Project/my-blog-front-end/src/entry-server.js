import { createApp } from './app'

export default (context) => {
    return new Promise((res, rej) => {
        const { app, router } = createApp()
        // const { app, router, store } = createApp()

        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return rej({
                    code: 404
                })
            }
            res(app)
        }, rej)
    })
}
