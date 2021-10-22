const DatabaseBootstrap = require("../../../apps/api/bootstrap/DatabaseBootstrap");
const PasswordEncryptor = require("../../../shared/infrastructure/PasswordEncryptor");
const UserFinder = require("../../users/application/UserFinder");
const ValidationException = require('../../../shared/exceptions/ValidationException');
const Yup = require('yup');
const UserRegisteredEvent = require("../../users/domain/UserRegisteredEvent");

class AuhtService {
    constructor(userRepository, eventBus) {       
        this.userRepository = userRepository;
        this.eventBus = eventBus;
        this.userFinder = new UserFinder(userRepository);
    }

    authenticate = async ({ email, password }) => {
        const user = await this.User.findOne({ where: { email }})

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const matchedPassword = PasswordEncryptor.compare(password, user.password);

        if (!matchedPassword) {
            throw new Error('Invalid credentials');
        }
        
        return {
            token: 'sdfsdfsdf',
            expiresIn: 4552
        }
    }

    register = async ({ name, email, password }) => {
        console.log(typeof name)
        const validationSchema = Yup.object().shape({
            name: Yup.string().strict()
                .test(
                    'alphabets', 
                    'Name must only contain alphabets', 
                    (value) => {
                        return /^[a-zA-Z][a-zA-Z\s]*$/.test(value);
                    }
                ),
            email: Yup.string()
                .email()
                .required()
                .test(
                    'unique',
                    'user with this email already exists',
                    async value => {
                        if (!value) {
                            return false;
                        }

                        const emailExists = await this.userFinder.findByCriteria({ where: { email: value } });

                        return !emailExists;
                }),
            password: Yup.string().required()
        });

        try {
            await validationSchema.validate({ name, email, password }, { abortEarly: false });
        }
        catch (err) {
            const validationErrors = err.inner.map(constraint => ({
                path: constraint.path,
                message: constraint.errors[0]
            }))
           throw new ValidationException(JSON.stringify(validationErrors));
        }
        
        const createdUser =  await this.userRepository.save({ name, email, password });
        //console.log(createdUser.email);
        this.eventBus.publish([new UserRegisteredEvent(createdUser)]);        
    }
}

module.exports = AuhtService;