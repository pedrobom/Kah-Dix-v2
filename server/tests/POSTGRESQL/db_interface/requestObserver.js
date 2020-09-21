module.exports = (url, method, data, id) => {
    console('Request Observer Subscribed to Subject Instance!')
    fetch(url, {
        method: method,
        body: data ? JSON.stringify(data) : null,
        headers: { 'Content-Type': 'application/json' }
    }).then(console.log)
}

