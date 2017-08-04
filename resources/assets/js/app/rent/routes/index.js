import { Browse, Edit } from '../components'

export default [
    {
        path: '/rent',
        component: Browse,
        name: 'browse-rent',
        meta: {
            guest: false,
            needsAuth: true
        }
    },
    {
        path: '/rent/:id',
        component: Edit,
        name: 'edit-rent',
        meta: {
            guest: false,
            needsAuth: true
        }
    }
]
