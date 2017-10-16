import { Browse, Edit } from '../components'

export default [
    {
        path: '/admin/bonus',
        component: Browse,
        name: 'browse-bonus',
        meta: {
            guest: false,
            needsAuth: true
        }
    },
    {
        path: '/admin/bonus/:id',
        component: Edit,
        name: 'edit-bonus',
        meta: {
            guest: false,
            needsAuth: true
        }
    }
]
