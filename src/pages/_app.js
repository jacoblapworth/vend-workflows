import cookies from 'next-cookies'
import { useRouter } from 'next/router'
import '@vendhq/vend-styles/dist/vend-styles.css'
import { NavHeader } from '../components/nav/NavHeader'
import { SideBar } from '../components/nav/SideBar'
import { Body, Content } from '../components/styled'

// This default export is required in a new `pages/_app.js` file.
export default function Workflows({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      <NavHeader />
      <Body className="vd-body">
        <SideBar active={router.pathname} />
        <Content className="vd-main-content-container vd-main-content-inner-container">
          <Component {...pageProps} />
        </Content>
      </Body>
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
