class UserFinder {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {

        } 
    }

    async findByCriteria(criteria) {
        return await this.userRepository.findByCriteria(criteria);
    }
}

module.exports = UserFinder;