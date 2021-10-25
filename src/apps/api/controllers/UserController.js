class UserController {
    constructor(service) {
        this.service = service;
    }

    me = async (req, res, next) => {
        const { id } = req.currentUser;

        const user = await this.service.me(id);

        return res.json({
            data: {
                user
            }
        })
    }
}

module.exports = UserController;