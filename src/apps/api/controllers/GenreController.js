class GenreController {
    constructor(service) {
        this.service = service;
    }


    createGenre = async (req, res, next) => {
        const { name, image } = req.body;

        const response = await this.service.createGenre({ name, image });

        return res.status(201).json({
            message: 'Genre created successfully',
            data: {
                genre: response
            }
        });
    }

    updateGenre = async (req, res, next) => {
        const { id } = req.params;
        const { name } = req.body;

        await this.service.updateGenre(id, { name, image });

        return res.json({
            message: 'Genre updated successfully'
        });
    }

    getAllGenres = async (req, res, next) => {
        const genres = await this.service.findAllGenres();

        return res.json({
            data: {
                genres
            }
        });
    }
}

module.exports = GenreController;