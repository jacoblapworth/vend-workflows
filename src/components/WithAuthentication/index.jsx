import { useRouter } from 'next/router'
import { useAuth } from '../Providers/Auth'

import { LoaderSpinner } from '../SharedReact'

export const withAuthentication = (WrappedComponent) => (props) => {
  const router = useRouter()
  const { isLoading, isAuthenticated } = useAuth()
  if (isLoading) {
    return <LoaderSpinner />
  }

  if (typeof window !== 'undefined' && !isAuthenticated) {
    router.push('/')
    return <></>
  }
  return <WrappedComponent {...props} />

  // const redirectOnError = () => {
  //   /* eslint-disable no-console */
  //   console.log('Redirecting back to main page')
  //   if (typeof window !== 'undefined') {
  //     Router.push('/')
  //   } else {
  //     // ctx.res.writeHead(302, { Location: '/' })
  //     // ctx.res.end()
  //   }
  // }

  // if (!token) {
  //   return redirectOnError()
  // }
}

export default withAuthentication
