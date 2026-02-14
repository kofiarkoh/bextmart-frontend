import '../public/assets/styles/variables.css'
import '../public/assets/styles/globals.css'
import '../public/assets/styles/header.css'
import '../public/assets/styles/footer.css'
import '../public/assets/styles/extension.css'
import { Provider } from 'react-redux'
import { store } from '../store/store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
