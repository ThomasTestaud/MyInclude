const { User, Role } = require('../models');


async function getUserData(id) {
    try {
        const user = await User.findByPk(id, {
            include: Role
        });

        // Manipulate the user object
        user.dataValues.role = user.dataValues.Role.name;

        delete user.dataValues.Role;
        delete user.dataValues.password;
        delete user.dataValues.createdAt;
        delete user.dataValues.updatedAt;
        delete user.dataValues.role_id;

        return user;
    } catch (error) {
        console.log('Error on getting user:', error);
        return false;
    }
}


module.exports = getUserData;