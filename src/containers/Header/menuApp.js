export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.userSystem', menus: [
            { name: 'menu.admin.crudUser', link: '/system/user-manage' },
            { name: 'menu.admin.crudRedux', link: '/system/user-redux-manage' },
            { name: 'menu.admin.manageDoctor', link: '/system/doctor-manage' },
            { name: 'menu.admin.manageAdmin', link: '/system/admin-manage' },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ],
    },
    {
        name: 'menu.admin.clinic', menus: [{ name: 'menu.admin.manageClinic', link: '/system/clinic-manage' }]
    },
    {
        name: 'menu.admin.specialty', menus: [{ name: 'menu.admin.manageSpecialty', link: '/system/specialty-manage' }]
    },
    {
        name: 'menu.admin.handbook', menus: [{ name: 'menu.admin.manageHandbook', link: '/system/handbook-manage' }]
    }
];