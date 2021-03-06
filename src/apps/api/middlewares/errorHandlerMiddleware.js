const BadException = require("../../../shared/exceptions/BadException");
const NotFoundException = require("../../../shared/exceptions/NotFoundException");
const UnauthorizedException = require("../../../shared/exceptions/UnauthorizedException");
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

        return res.status(422).json({
            error: 'ValidationError',
            message: 'The given data was invalid',
            errors: errors
        })
    }

    if (err instanceof UnauthorizedException) {
        return res.status(401).json({
            error: 'UnauthorizedError',
            message: err.message
        })
    }

    if (err instanceof NotFoundException) {
        return res.status(404).json({
            error: 'NotFoundError',
            message: err.message
        })
    }

    if (err instanceof BadException) {
        return res.status(400).json({
            error: 'BadError',
            message: err.message
        })
    }

    return res.status(500).json({
        message: 'Internal server error'
    })
}

module.exports = errorHandler;