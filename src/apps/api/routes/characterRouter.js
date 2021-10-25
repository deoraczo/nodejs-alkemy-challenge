const { Router } = require('express');
const CharacterService = require('../../../modules/characters/application/CharacterService');
const SequelizeCharacterRepository = require('../../../modules/characters/infrastructure/SequelizeCharacterRepository');
const CharacterController = require('../controllers/CharacterController');
const asyncHandler = require('../middlewares/asyncHandlerMiddleware');
const authHandler = require('../middlewares/authHandlerMiddleware');
const uploadHanlder = require('../middlewares/uploadHandlerMiddleware');

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

    router.post('/:id/upload', authHandler, uploadHanlder.single('image'), asyncHandler(characterController.uploadImage));

    return router;
}

module.exports = characterRouter;