
/** Class representing a simple queue data structure */
class Queue {
    q;
    
    constructor() {
        this.q = [];
    }

    send(item) {
        this.q.push(item);
    }
    
    receive() {
        return this.q.shift();
    }

    size() {
        return this.q.length;
    }
}

export { Queue };