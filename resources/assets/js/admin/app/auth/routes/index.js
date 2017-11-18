import {
  LoginComponent
} from '../components'

export default [{
  path: '/admin/login',
  component: LoginComponent,
  name: 'login',
  meta: {
    guest: true,
    needsAuth: false
  }
}, ]
