import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query getProducts($after: String, $first: Int!, $filter: ProductFilter) {
    products(
      after: $after
      first: $first
      filter: $filter
      orderBy: { direction: ASC, field: NAME }
    ) {
      products {
        __typename
        id
        name
        sku
        imageThumbnailURL
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`

export const getProducts = /* GraphQL */ `
  query getProducts($after: String, $first: Int) {
    products(
      after: $after
      first: $first
      orderBy: { direction: ASC, field: NAME }
    ) {
      products {
        id
        name
        sku
        imageThumbnailURL
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`

export const getProduct = /* GraphQL */ `
  query getProduct($id: ID!) {
    product(id: $id) {
      customFields {
        name
        title
        ... on IntegerCustomFieldValue {
          integerValue
        }
        ... on StringCustomFieldValue {
          stringValue
        }
        ... on BooleanCustomFieldValue {
          booleanValue
        }
      }
    }
  }
`

export default getProducts
