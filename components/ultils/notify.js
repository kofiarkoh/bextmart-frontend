import { Store } from 'react-notifications-component'

const base = {
  insert: 'top',
  container: 'top-center',
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

export function notifyAuth(message, title = 'Login Required') {
  Store.addNotification({
    title,
    message,
    type: 'danger',
    insert: 'top',
    container: 'top-center',
    animationIn: [],
    animationOut: [],
    dismiss: { duration: 1200, onScreen: false, showIcon: true },
  })
}

export function dismissAll() {
  Store.removeAllNotifications()
}
