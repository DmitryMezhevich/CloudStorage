module.exports = class Operation {
    #countOfReader;

    constructor() {
        this.#countOfReader = 0;
    }

    isReading() {
        return this.#countOfReader !== 0;
    }

    addReader() {
        this.#countOfReader += 1;
    }

    removeReader() {
        this.#countOfReader = Math.max(0, (this.#countOfReader -= 1));
    }
};
