const sgMail = require('@sendgrid/mail');
const { mailConfig } = require('../../../apps/api/config');

class SengridMailer {
    constructor() {
        this.sgMail = sgMail;
        this.sgMail.setApiKey(mailConfig.API_KEY);
    }

    async send(message) {
        await this.sgMail.send(message);
    }
}

module.exports = SengridMailer;