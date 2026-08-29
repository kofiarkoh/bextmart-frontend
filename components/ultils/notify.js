import toast from 'react-hot-toast'

function withTitle(title, message) {
  return title ? `${title}: ${message}` : message
}

const errorStyle = {
  style: { background: '#dc2626', color: '#fff' },
  iconTheme: { primary: '#fff', secondary: '#dc2626' },
}

const successStyle = {
  style: { background: '#16a34a', color: '#fff' },
  iconTheme: { primary: '#fff', secondary: '#16a34a' },
}

export function notifyError(message, title = 'Error') {
  toast.error(withTitle(title, message || 'Something went wrong.'), { duration: 4500, ...errorStyle })
}

export function notifySuccess(message, title = 'Success') {
  toast.success(withTitle(title, message), { duration: 4500, ...successStyle })
}

export function notifyInfo(message, title = '') {
  toast(withTitle(title, message), { duration: 4500 })
}

export function notifyAuth(message, title = 'Login Required') {
  toast.error(withTitle(title, message), { duration: 1200, ...errorStyle })
}

export function dismissAll() {
  toast.dismiss()
}
