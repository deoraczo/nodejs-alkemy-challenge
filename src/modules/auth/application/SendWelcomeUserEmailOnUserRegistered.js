const UserRegisteredEvent = require("../../users/domain/UserRegisteredEvent");

class SendWelcomeUserEmailOnUserRegistered {
    constructor() {
        
    }

    subscribedTo() {
        return [UserRegisteredEvent];
    }

    async on(event) {
        const  { user }  = event;
    }
}

module.exports = SendWelcomeUserEmailOnUserRegistered;