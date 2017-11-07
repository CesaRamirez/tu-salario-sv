import {
  BrowseComponent
} from '../components'

export default [{
  path: '/admin/settings',
  component: BrowseComponent,
  name: 'browse-settings',
  meta: {
    guest: false,
    needsAuth: true
  }
}]
