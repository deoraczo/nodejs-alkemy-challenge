
const criteriaSerializer = (criteria, models) => {
    if ('include' in criteria) {
        const { include } = criteria;

        const associations = include.map(item => {
            return {
                ...item,
                model: models[item.model]
            }
        });       
        
        return {
            ...criteria,
            include: associations
        }
    }

    return criteria;
};
class SequelizeRepository {
    constructor(sequelize, model) {
        this.models = sequelize.models;
        this.model = sequelize.models[model];
    }

    async save(model) {
        return await this.model.create(model);
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }
    

    async findByCriteria(criteria) {
       return await this.model.findOne(criteriaSerializer(criteria, this.models));
        
    }
    
    async findAllByCriteria(criteria) {
        return await this.model.findAll(criteriaSerializer(criteria, this.models));
    }

    async findAll() {
        return await this.model.findAll();
    }

    async remove(id) {
        return await this.model.destroy({ where: { id } });
    }

    async removeByCriteria(criteria) {
        return await this.model.destroy(criteria);
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