import cookies from 'next-cookies'

const withAuthentication = (WrappedComponent) => (props) => {
  // const { user } = useAuth()
  if (user) return <WrappedComponent {...props} />
  return <p>Unauthorized</p>
}

withAuthentication.isAuth = async (ctx) => {
  try {
    await axios.get('/api/me', { ctx }) // I use 'ctx' in the interceptors
    return true
  } catch (error) {
    return false
  }
}

export default withAuthentication

export function getServerSideProps(context) {
  return {
    props: {
      cookies: cookies(context),
    },
  }
}
