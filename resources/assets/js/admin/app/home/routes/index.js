import {
  HomeComponent
} from '../components'

export default [{
  path: '/admin',
  component: HomeComponent,
  name: 'home',
  meta: {
    guest: false,
    needsAuth: true
  }
}]