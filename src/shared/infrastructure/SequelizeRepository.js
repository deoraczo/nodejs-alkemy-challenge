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
        return await this.model.findByPK(id);
    }

    async findByCriteria(criteria) {
        return await this.model.findOne({ ...criteria });
    }
    
}

module.exports = SequelizeRepository;