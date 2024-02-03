const sequelizeInstance = require('./_model.js');
const User = require('./user.js');
const Role = require('./role.js');
const Company = require('./company.js');
const Resource = require('./resource.js');
const Icon = require('./icon.js');
const Task = require('./task.js');
const GroupTask = require('./groupTask.js');
const UserToUser = require('./userToUser.js');

//Relations
User.belongsToMany(User, { through: UserToUser, foreignKey: 'parent_id', otherKey: 'children_id', as: 'children'});
User.belongsToMany(User, { through: UserToUser, foreignKey: 'children_id', otherKey: 'parent_id', as: 'parents'});


User.belongsTo(Role, {foreignKey: 'role_id'});
Role.hasMany(User, {foreignKey: 'role_id'});

User.belongsTo(Company, {foreignKey: 'company_id'});
Company.hasMany(User, {foreignKey: 'company_id'});

Company.hasMany(Resource, {foreignKey: 'company_id'});
Resource.belongsTo(Company, {foreignKey: 'company_id'});

Resource.belongsTo(Role, {foreignKey: 'role_id'});
Role.hasMany(Resource, {foreignKey: 'role_id'});

Resource.belongsTo(Icon, {foreignKey: 'icon_id'});
Icon.hasMany(Resource, {foreignKey: 'icon_id'});

Task.belongsToMany(User, {through: 'user_task'});
User.belongsToMany(Task, {through: 'user_task'});

Task.belongsTo(Company, {foreignKey: 'company_id'});
Company.hasMany(Task, {foreignKey: 'company_id'});

Task.belongsTo(GroupTask, {foreignKey: 'group_task_id'});
GroupTask.hasMany(Task, {foreignKey: 'group_task_id'});

//Sync
sequelizeInstance.sync({/*alter: true*/});

module.exports = {
    User,
    Role,
    Company,
    Resource,
    Icon,
    Task,
    GroupTask,
    UserToUser,
};
