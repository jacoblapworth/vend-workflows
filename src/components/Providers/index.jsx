import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

const isProduction = process.env.NODE_ENV === 'production'

export function Providers({ children }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: isProduction
        ? 'https://workflows.now.sh/api/vend/graphql'
        : 'http://localhost:3000/api/vend/graphql',
    }),
  })
  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  )
}
