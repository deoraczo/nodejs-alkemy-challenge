class SequelizeRepository {
    constructor(sequelize, model) {
        // this.sequelize = sequelize;
        // this.model = model;
        this.model = sequelize.models[model];
    }

    async save(model) {
        return await this.model.create(model);
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async findByCriteria(criteria) {
        return await this.model.findOne({ ...criteria });
    }
    
    async findAllByCriteria(criteria) {
        return await this.model.findAll(criteria);
    }

    async remove(id) {
        return await this.model.destroy({ where: { id } });
    }

    async update(id, model) {
        await this.model.update(model, {
            where: {
              id
            },
        });
    }
    
}

module.exports = SequelizeRepository;