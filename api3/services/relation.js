const { Op } = require('sequelize');
const { User, Relation } = require('../models');

async function getRelationsOfUser(id) {
    try {
        const relations = await Relation.findAll({
            attributes: [],
            include: [
                { model: User, as: 'associate' },
                { model: User, as: 'mentor'},
                { model: User, as: 'captain'}
            ],
            where: {
                [Op.or]: [
                    { associate_id: id },
                    { mentor_id: id },
                    { captain_id: id }
                ]
            }
        });

        return relations;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = getRelationsOfUser;