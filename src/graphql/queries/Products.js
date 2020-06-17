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
