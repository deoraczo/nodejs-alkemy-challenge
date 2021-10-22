class Event {
    static NAME;

    constructor(eventName) {
        this.eventName = eventName;
        this.occurredOn = new Date();
    }
}

module.exports = Event;