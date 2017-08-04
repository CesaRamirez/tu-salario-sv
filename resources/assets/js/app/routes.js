import auth from './auth/routes'
import errors from './errors/routes'
import home from './home/routes'
import rent from './rent/routes'

export default [...auth, ...errors, ...home, ...rent]
