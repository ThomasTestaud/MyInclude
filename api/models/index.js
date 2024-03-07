const sequelizeInstance = require('./_model.js');
const User = require('./user.js');
const Role = require('./role.js');
const Company = require('./company.js');
const Resource = require('./resource.js');
const Icon = require('./icon.js');
const Task = require('./task.js');
const GroupTask = require('./groupTask.js');
const TaskTarget = require('./taskTarget.js');
const Relation = require('./relation.js');

//Relations
// Associate associate_id in Relation with User
Relation.belongsTo(User, { as: 'associate', foreignKey: 'associate_id' });
// Associate mentor_id in Relation with User
Relation.belongsTo(User, { as: 'mentor', foreignKey: 'mentor_id' });
// Associate captain_id in Relation with User
Relation.belongsTo(User, { as: 'captain', foreignKey: 'captain_id' });

// If necessary, you can also define the inverse relationship in User model
User.hasMany(Relation, { as: 'AssociateRelations', foreignKey: 'associate_id' });
User.hasMany(Relation, { as: 'MentorRelations', foreignKey: 'mentor_id' });
User.hasMany(Relation, { as: 'CaptainRelations', foreignKey: 'captain_id' });

User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

User.belongsTo(Company, { foreignKey: 'company_id' });
Company.hasMany(User, { foreignKey: 'company_id' });

Company.hasMany(Resource, { foreignKey: 'company_id' });
Resource.belongsTo(Company, { foreignKey: 'company_id' });

Resource.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(Resource, { foreignKey: 'role_id' });

Resource.belongsTo(Icon, { foreignKey: 'icon_id' });
Icon.hasMany(Resource, { foreignKey: 'icon_id' });

Task.belongsTo(Relation, { foreignKey: 'relation_id' });
Relation.hasMany(Task, { foreignKey: 'relation_id' });

Task.belongsTo(TaskTarget, { foreignKey: 'task_target_id' });
TaskTarget.hasMany(Task, { foreignKey: 'task_target_id' });

Task.belongsTo(GroupTask, { foreignKey: 'group_task_id' });
GroupTask.hasMany(Task, { foreignKey: 'group_task_id' });
GroupTask.belongsTo(Company, { foreignKey: 'company_id' });

//Sync
const roleData = [
    {
        name: 'dev',
    },
    {
        name: 'hr',
    },
    {
        name: 'employee',
    }
];
const userData = [
    {
        first_name: 'Thomas',
        last_name: 'Testaud',
        position: 'Developper',
        email: 'thomas.testaud@hotmail.fr',
        password: 'password',
        role_id: 1,
        company_id: 1,
    },
    {
        first_name: 'Amandine',
        last_name: 'Dubreil',
        position: 'CEO',
        email: 'amandine.dubreil@hotmail.fr',
        password: 'password',
        role_id: 1,
        company_id: 1,
    },
    {
        first_name: 'Morgane',
        last_name: 'CARECCHIO',
        position: 'Designer',
        email: 'morgane.carecchio@hotmail.fr',
        password: 'password',
        role_id: 1,
        company_id: 1,
    },
    {
        first_name: 'Léa',
        last_name: 'MYSZAK',
        position: 'Designer',
        email: 'lea.myszak@hotmail.fr',
        password: 'password',
        role_id: 1,
        company_id: 1,
    },
    {
        first_name: 'Cloé',
        last_name: 'BERNA',
        position: 'Designer',
        email: 'cloe.berna@hotmail.fr',
        password: 'password',
        role_id: 1,
        company_id: 1,
    },
    {
        first_name: 'Carla',
        last_name: 'RIVERA MOLERO',
        position: 'Designer',
        email: 'carla.riveramolero@hotmail.fr',
        password: 'password',
        role_id: 1,
        company_id: 1,
    },
    {
        first_name: 'Joé',
        last_name: 'Tribbiani',
        position: 'Acteur',
        email: 'joe@titi.fr',
        password: 'password',
        role_id: 3,
        company_id: 2,
    },
    {
        first_name: 'Chandler',
        last_name: 'Bing',
        position: 'Acteur',
        email: 'chand@bing.fr',
        password: 'password',
        role_id: 3,
        company_id: 2,
    },
    {
        first_name: 'Phebe',
        last_name: 'Buffay',
        position: 'Waitress',
        email: 'phebe@buffay.fr',
        password: 'password',
        role_id: 2,
        company_id: 2,
    },
];
const companyData = [
    {
        name: 'MyInclude',
        email: 'contact@myinclude.com',
        avatar: "company_1_avatar_1709498662837.png",
        address: '14 Avenue du Rhone, 74000 Annecy, France',
        phone: '0123456789',
    },
    {
        name: 'Quadra Concrete',
        email: 'contact@quadra.com',
        avatar: "company_1_avatar_1709584929624.png",
        address: '14 Route de Findrol, 74130 Contamine-sur-Arve, France',
    },
    {
        name: 'Groupe SEB',
        avatar: "company_3_avatar_1709498816994.png",
        email: 'contact@seb.com',
        address: '112 Chemin du Moulin Carron, 69130 Écully, France',
    },
    {
        name: 'Groupe Casino',
        email: 'contact@casion.com',
        avatar: "company_4_avatar_1709498765424.png",
        address: '1 Esplanade de France, 42000 Saint-Étienne, France',
    },

];
const relations = [
    {
        associate_id: 1,
        mentor_id: 2,
        captain_id: 3,
    },
]
const groupTasks = [
    {
        name: "Premier jour",
        company_id: 1,
    },
    {
        name: "Première semaine",
        company_id: 1,
    },
    {
        name: "Premier mois",
        company_id: 1,
    },
    {
        name: "Premier trimestre",
        company_id: 1,
    },
]
const tasks = [
    {
        title: "Café d'accueil",
        description_1: 'Prendre le café avec les nouveaux arrivants',
        doneable: true,
        due_date: '2024-6-22',
        done_date: '2024-7-22',
        relation_id: 1,
        group_task_id: 1,
    },
    {
        title: "Tour de l'entreprise",
        description_1: "Visiter l'entreprise avec votre mentor",
        description_2: "Faire faire un tour de l'entreprise aux nouveaux arrivants",
        description_3: "Le tuteur fait faire un tour de l'entreprise aux nouveaux arrivants",
        doneable: true,
        due_date: '2024-6-23',
        relation_id: 1,
        group_task_id: 1,
    }
]

sequelizeInstance.sync({ force: true }) // Be cautious with `force: true`
    .then(() => {
        console.log('Database synced successfully.');

        (async () => {
            for (const role of roleData) {
                await sequelizeInstance.models.Role.create(role);
            }

            for (const company of companyData) {
                await sequelizeInstance.models.Company.create(company);
            }

            for (const user of userData) {
                await sequelizeInstance.models.User.create(user);
            }

            for (const relation of relations) {
                await sequelizeInstance.models.Relation.create(relation);
            }

            for (const groupTask of groupTasks) {
                await sequelizeInstance.models.GroupTask.create(groupTask);
            }

            for (const task of tasks) {
                await sequelizeInstance.models.Task.create(task);
            }

        })();

        console.log('DDB populated successfully.');
    })
    .then(() => {
        console.log('User created successfully.');
    })
    .catch((error) => {
        console.error('Error syncing or creating the user:', error);
    });

module.exports = {
    User,
    Role,
    Company,
    Resource,
    Icon,
    Task,
    GroupTask,
    Relation,
};
