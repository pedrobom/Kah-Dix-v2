// EXEMPLO DE TASK ASSÍNCRONA
const promise = (event, data) => {
    console.log('Initializing connection for socketA')

    return new Promise((resolve, reject) => {
        try {
            resolve('Resolveu <3')
        } catch {
            reject('Rejeitou...')
        }
    })
}

async function gulpTask() {

    await promise().then(console.log).catch(console.log)
}


module.exports = task2 = async (cb) => {
    gulpTask()
        .then(() => {
            return cb()
        })
}