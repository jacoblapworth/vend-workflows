import React from 'react'
// import cookies from 'next-cookies'
import { useRouter } from 'next/router'
import Head from 'next/head'
import '@vendhq/vend-styles/dist/vend-styles.css'
import { NavHeader } from '../components/Nav/NavHeader'
import { SideBar } from '../components/Nav/SideBar'
import { DemoWarning } from '../components/DemoWarning'
import { Body, Content } from '../components/styled'
import { Providers } from '../components/Providers'

// This default export is required in a new `pages/_app.js` file.
export default function Workflows({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Workflows Demo | Vend</title>
        <link
          rel="shortcut icon"
          href="https://www.vendhq.com/favicon.ico"
        ></link>
      </Head>
      <Providers>
        <NavHeader />
        <DemoWarning></DemoWarning>
        <Body className="vd-body">
          <SideBar active={router.pathname} />
          <Content className="vd-main-content-container vd-main-content-inner-container">
            <Component {...pageProps} />
          </Content>
        </Body>
      </Providers>
    </>
  )
}
