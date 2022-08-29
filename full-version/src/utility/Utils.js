import { DefaultRoute } from '../router/routes'
import _ from 'lodash'

export const isObjEmpty = obj => Object.keys(obj).length === 0
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return DefaultRoute
  if (userRole === 'client') return '/access-control'
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

export const getUserFullName = (user, defaultName = 'Other') => {
  if (!user) {
    return defaultName
  }
  // const preferredName = user.preferredName ? `"${user.preferredName}"` : ''
  const fullName = `${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}`.trim().replace(/ +(?= )/g, '')
  const fullNameRs = _.isEmpty(fullName) ? defaultName : fullName

  return fullNameRs
}
