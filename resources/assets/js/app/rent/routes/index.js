import { Browse, Edit } from '../components'

export default [
    {
        path: '/admin/rent',
        component: Browse,
        name: 'browse-rent',
        meta: {
            guest: false,
            needsAuth: true
        }
    },
    {
        path: '/admin/rent/:id',
        component: Edit,
        name: 'edit-rent',
        meta: {
            guest: false,
            needsAuth: true
        }
    }
]
