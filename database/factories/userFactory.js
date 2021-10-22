const faker = require('faker');
const { factory } = require('factory-girl');


const userFactory = (squelize) => {
    factory.define('User', squelize.models.User, {
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    return factory;
}

module.exports = userFactory;