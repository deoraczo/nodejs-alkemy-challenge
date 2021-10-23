const CharacterNotFoundException = require("../exceptions/CharacterNotFoundException");

class CharacterFinder {
    constructor (repository) {
        this.repository = repository;
    }

    async findById(id) {
        const character = await this.repository.findById(id);
        if (!character) {
            throw new CharacterNotFoundException('Character not found');
        }

        return character;
    }
    async findByCriteria(criteria) {
        return await this.repository.findByCriteria(criteria);
    }
}

module.exports = CharacterFinder;