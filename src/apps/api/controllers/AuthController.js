class AuhtController {
    async signin(req, res) {
        return res.json({
            message: 'User logged in successfully'
        })
    }
}


module.exports = AuhtController;