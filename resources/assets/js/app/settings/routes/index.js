import { Browse, Edit } from '../components'

export default [
    {
        path: '/settings',
        component: Browse,
        name: 'browse-settings',
        meta: {
            guest: false,
            needsAuth: true
        }
    },
    {
        path: '/setting/:id',
        component: Edit,
        name: 'edit-setting',
        meta: {
            guest: false,
            needsAuth: true
        }
    }
]
