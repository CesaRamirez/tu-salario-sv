import auth from './auth/routes'
import errors from './errors/routes'
import home from './home/routes'
import rent from './rent/routes'
import settings from './settings/routes'
import bonus from './bonus/routes'

export default [...auth, ...errors, ...home, ...rent, ...settings, ...bonus]
