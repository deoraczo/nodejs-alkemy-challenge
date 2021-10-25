class UserService {
    constructor(repository) {
        this.repository = repository;
    }


    async me(id) {
        const user = await this.repository.findById(id);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status.toLowerCase()
        }
    }
}

module.exports = UserService;