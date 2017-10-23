import {
  Browse
} from '../components'

export default [{
  path: '/admin/bonus',
  component: Browse,
  name: 'browse-bonus',
  meta: {
    guest: false,
    needsAuth: true
  }
}]
