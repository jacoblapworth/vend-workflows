import '@vendhq/vend-styles/dist/vend-styles.css'
import { NavHeader } from '../components/nav/header';

// This default export is required in a new `pages/_app.js` file.
export default function Worflows({ Component, pageProps }) {
  return (
    <>
      <NavHeader />
      <Component {...pageProps} />
    </>
  )
}