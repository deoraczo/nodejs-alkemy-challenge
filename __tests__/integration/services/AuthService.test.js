const userFactory = require("../../../database/factories/userFactory");
const DatabaseBootstrap = require("../../../src/apps/api/bootstrap/DatabaseBootstrap");
const AuhtService = require("../../../src/modules/auth/application/AuhtService");
const PasswordEncryptor = require("../../../src/shared/infrastructure/PasswordEncryptor");



const databaseBootstrap = new DatabaseBootstrap();

describe('AuthService', () => {
    beforeAll(async () => {
        await databaseBootstrap.initialize();
    });

    afterAll(async () => {
        await databaseBootstrap.closeConnection();
    })
    
    test('should authenticate with valid credentials', async () => {
        const connection = databaseBootstrap.getConnection();

        const user = await userFactory(connection).create('User', {
            password: PasswordEncryptor.encrypt('123456')
        });
        
        const authService = new AuhtService(databaseBootstrap.getConnection());
        
        const signInReponse = await authService.authenticate({ 
            email: user.email,
            password: '1234567'
        });
        
        expect(signInReponse).toHaveProperty('token');
        expect(signInReponse).toHaveProperty('expiresIn');
    }) 
    
    test('should not authenticate with invalid credentials', async () => {
        const connection = databaseBootstrap.getConnection();

        const user = await userFactory(connection).create('User', {
            password: PasswordEncryptor.encrypt('123456')
        });
        
        const authService = new AuhtService(databaseBootstrap.getConnection());
        
        const signInReponse = await authService.authenticate({ 
            email: user.email,
            password: '1234567'
        });
    })
    
})
