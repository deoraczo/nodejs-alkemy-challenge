const ValidationException = require("../../../shared/exceptions/ValidationException");

const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ValidationException) {
        /*constraints.forEach(constraint => {
            errors[constraint.path[0]] = [constraint.message.replace(/"/g, '')];
        });*/

        const errors = {};

        const constraints = JSON.parse(err.message);

        constraints.forEach(constraint => {
            if (constraint.path in errors) {
                errors[constraint.path].push(constraint.message);
            } else {
                errors[constraint.path] = [constraint.message]
            }
        })

        return res.status(403).json({
            error: 'ValidationError',
            message: 'The given data was invalid',
            errors: errors
        })
    }

    return res.status(500).json({
        message: 'Internal server error'
    })
}

module.exports = errorHandler;