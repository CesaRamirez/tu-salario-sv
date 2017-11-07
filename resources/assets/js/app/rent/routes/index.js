import {
  BrowseComponent
} from '../components'

export default [{
  path: '/admin/rent',
  component: BrowseComponent,
  name: 'browse-rent',
  meta: {
    guest: false,
    needsAuth: true
  }
}]
