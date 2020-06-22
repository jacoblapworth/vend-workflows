import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

import { AuthProvider } from './Auth'

const isProduction = process.env.NODE_ENV === 'production'

const cache = new InMemoryCache({
  typePolicies: {
    CustomField: {
      keyFields: ['name'],
    },
    BooleanCustomFieldValue: {
      keyFields: ['name'],
    },
    StringCustomFieldValue: {
      keyFields: ['name'],
    },
    IntegerCustomFieldValue: {
      keyFields: ['name'],
    },
  },
})

export function Providers({ children }) {
  const client = new ApolloClient({
    cache: cache,
    link: new HttpLink({
      uri: isProduction
        ? 'https://workflows.now.sh/api/vend/graphql'
        : 'http://localhost:3000/api/vend/graphql',
    }),
  })
  return (
    <>
      <AuthProvider>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </AuthProvider>
    </>
  )
}
