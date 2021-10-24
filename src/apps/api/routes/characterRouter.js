const { Router } = require('express');
const CharacterService = require('../../../modules/characters/application/CharacterService');
const SequelizeCharacterRepository = require('../../../modules/characters/infrastructure/SequelizeCharacterRepository');
const CharacterController = require('../controllers/CharacterController');
const asyncHandler = require('../middlewares/asyncHandlerMiddleware');
const authHandler = require('../middlewares/authHandlerMiddleware');

const characterRouter = (sequelize) => {
    const router = Router();
    const characterRepository = new SequelizeCharacterRepository(sequelize);
    const characterService = new CharacterService(characterRepository);
    const characterController = new CharacterController(characterService);

    router.route('/')
        .get(authHandler, asyncHandler(characterController.getCharacters))
        .post(authHandler, asyncHandler(characterController.createCharacter));
        

    router.route('/:id')
        .get(authHandler, asyncHandler(characterController.getCharacter))
        .delete(authHandler, asyncHandler(characterController.deleteCharacter))
        .put(authHandler, asyncHandler(characterController.updateCharacter));

    return router;
}

module.exports = characterRouter;