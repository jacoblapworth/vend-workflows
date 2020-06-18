import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

export function Providers({ children }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/api/vend/graphql',
    }),
  })
  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  )
}
