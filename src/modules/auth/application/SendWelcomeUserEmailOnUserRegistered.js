const Notifier = require("../../notifications/Notifier");
const UserRegisteredEvent = require("../../users/domain/UserRegisteredEvent");
class SendWelcomeUserEmailOnUserRegistered {
    constructor() {
        
    }

    subscribedTo() {
        return [UserRegisteredEvent];
    }

    on = async (event) => {
        const  { user }  = event;
        const msg = {
            to: user.email,
            from: 'dinerofacilvr@gmail.com', // Use the email address or domain you verified above
            subject: 'Welcome to Disney Api',
            text: 'Welcome to our platform',
            html: ` 
                <h1>Hi, ${user.name}</h1>
                <strong>Thanks for signing up to Disney Api</strong>
            `,
        };

        const notifier = new Notifier();
        notifier.send(msg);
        
    }
}

module.exports = SendWelcomeUserEmailOnUserRegistered;