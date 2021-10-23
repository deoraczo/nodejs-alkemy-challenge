const EventEmmiterBus = require("./EventEmmiterBus");

class InMemoryEventBus {

    constructor() {
        this.emmiterBus = new EventEmmiterBus();
    }

    async addSubscriber(subscribers) {
        this.emmiterBus.registerSubscribers(subscribers);
    }

    async publish(events) {
        this.emmiterBus.publish(events);
    }
}

module.exports = InMemoryEventBus;