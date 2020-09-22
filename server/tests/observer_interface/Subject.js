function Subject() {
    this.observers = []
}

Subject.prototype =
{
    subscribe: function (observerFunction) {
        this.observers.push(observerFunction)
    },
    unsubscribe: function (observerFunctionToRemove) {
        const updatedObservers = this.observers.filter(observerFunction => {
            if (observerFunction != observerFunctionToRemove) {
                return observerFunction
            }
        })

        this.observers = updatedObservers
    },
    trigger: function () {
        this.observers.forEach(observerFunction => {
            observerFunction.call()
        })
    }
}

module.exports = new Subject