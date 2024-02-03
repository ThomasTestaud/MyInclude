const { User, UserToUser } = require('../models');
const { Op } = require('sequelize');


async function getParentsOfUser(userId) {
    try {
        const parent = await User.findByPk(userId, {
            include: [{
                model: User,
                as: 'parents',
                through: { attributes: [] } 
            }]
        });

        return parent.parents;
    } catch (error) {
        res.status(500);
        res.send('Error on getting resource: ' + error);
    }
}

async function getChildrensOfUser(userId) {
    try {
        const children = await User.findByPk(userId, {
            include: [{
                model: User,
                as: 'children',
                through: { attributes: [] } 
            }]
        });

        return children.children;
    } catch (error) {
        throw new Error('Error on getting resource: ' + error.message);
    }
}



module.exports = { getParentsOfUser, getChildrensOfUser };