const Event = require("../../../shared/domain/Event");

class UserRegisteredEvent extends Event {
    static NAME = 'user.registered';

    constructor(user) {
        super(UserRegisteredEvent.NAME);
        this.user = user;
    }
    
}

module.exports = UserRegisteredEvent;