import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

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
    // Product: {
    //   // In most inventory management systems, a single UPC code uniquely
    //   // identifies any product.
    //   keyFields: ['id'],
    // },
    // ProductsConnection: {
    //   keyFields: ['pageInfo', ['startCursor', 'endCursor']],
    // },
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
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  )
}
