const ValidationException = require("../../exceptions/ValidationException");

const errorSeliarizer = (err) => {
    const validationErrors = err.inner.map(constraint => ({
        path: constraint.path,
        message: constraint.errors[0]
    }))
   throw new ValidationException(JSON.stringify(validationErrors));
}

module.exports = errorSeliarizer;