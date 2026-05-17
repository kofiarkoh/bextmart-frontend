import { Store } from 'react-notifications-component'

const base = {
  insert: 'top',
  container: 'top-right',
  animationIn: [],
  animationOut: [],
  dismiss: { duration: 4500, onScreen: false, showIcon: true },
}

export function notifyError(message, title = 'Error') {
  Store.addNotification({ ...base, title, message: message || 'Something went wrong.', type: 'danger' })
}

export function notifySuccess(message, title = 'Success') {
  Store.addNotification({ ...base, title, message, type: 'success' })
}

export function notifyInfo(message, title = '') {
  Store.addNotification({ ...base, title, message, type: 'info' })
}
