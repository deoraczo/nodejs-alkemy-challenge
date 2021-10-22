const SengridMailer = require("./email/SengridMailer");

class Notifier {
    constructor() {
        this.notifiers = [
            new SengridMailer()
        ];
        
    }

    send(message) {
        this.notifiers.forEach(notify => notify.send(message));
    }

    addNotifiers(notifiers) {
        notifiers.forEach(notifier => {
            this.notifiers.push(notifier);
        })
    }
}

module.exports = Notifier;