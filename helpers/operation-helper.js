module.exports = class Operation {
    _countOfReader;

    constructor() {
        this._countOfReader = 0;
    }

    isReading() {
        return this._countOfReader !== 0;
    }

    addReader() {
        this._countOfReader += 1;
    }

    removeReader() {
        this._countOfReader = Math.max(0, (this._countOfReader -= 1));
    }
};
