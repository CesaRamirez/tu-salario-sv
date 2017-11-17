import {
  BrowseComponent
} from '../components'

export default [{
  path: '/admin/bonus',
  component: BrowseComponent,
  name: 'browse-bonus',
  meta: {
    guest: false,
    needsAuth: true
  }
}]