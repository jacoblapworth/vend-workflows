import cookies from 'next-cookies'
import '@vendhq/vend-styles/dist/vend-styles.css'
import { NavHeader } from '../components/nav/NavHeader'
import { SideBar } from '../components/nav/SideBar'

// This default export is required in a new `pages/_app.js` file.
export default function Workflows({ Component, pageProps }) {
  console.log('test', pageProps)

  return (
    <>
      <NavHeader />
      <SideBar />
      <div className="vd-main-content-container vd-main-content-inner-container">
        <Component {...pageProps} />
      </div>
    </>
  )
}

Workflows.getInitialProps = (context) => {
  return {
    pageProps: {
      cookies: cookies(context.ctx),
    },
  }
}
