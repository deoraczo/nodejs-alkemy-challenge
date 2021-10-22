const { EventEmitter } = require('events');

class EventEmmiterBus extends EventEmitter {
    constructor() {
        super();
    }

    registerSubscribers(subscribers) {
        subscribers.map(subscriber => {
            subscriber.subscribedTo().map(event => {
                console.log(event);
                this.on(event.NAME, subscriber.on.bind(subscriber))
            });
        })
    }

    publish(events) {
        events.map(event => {
            this.emit(event.eventName, event);
        })
    }
}

module.exports = EventEmmiterBus;