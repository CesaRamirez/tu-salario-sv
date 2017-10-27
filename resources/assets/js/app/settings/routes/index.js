import {
  Browse
} from '../components'

export default [{
  path: '/admin/settings',
  component: Browse,
  name: 'browse-settings',
  meta: {
    guest: false,
    needsAuth: true
  }
}]
