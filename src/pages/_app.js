import '@vendhq/vend-styles/dist/vend-styles.css'
import { NavHeader } from '../components/nav/NavHeader';

// This default export is required in a new `pages/_app.js` file.
export default function Workflows({ Component, pageProps }) {

  if (typeof window === 'undefined') {
    global.window = {}
  }

  return (
    <>
      <NavHeader />
      <Component {...pageProps} />
    </>
  )
}