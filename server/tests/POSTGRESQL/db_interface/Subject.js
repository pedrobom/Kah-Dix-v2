class Subject {
    #observers

    constructor() {
        this.#observers = []
    }

    get observers() {
        return this.#observers
    }

    subscribe(observerFunction) {
        this.#observers.push(observerFunction)
    }

    unsubscribe(observerFunctionToRemove) {
        this.#observers = this.#observers.filter(observerFunction => {
            if (observerFunction != observerFunctionToRemove) {
                return observerFunction
            }
        })
    }

    // fire all subscribbed observer functions!
    trigger() {
        this.#observers.forEach(observerFunction => {
            observerFunction()
        })
    }
}

module.exports = new Subject