class Task {
    data;
    timestamp;

    constructor(data, timestamp) {
        this.data = data;
        this.timestamp = timestamp;
    }

    get taskData() { return this.data; }
    get taskStamp() { return this.timestamp; }
}

export { Task };