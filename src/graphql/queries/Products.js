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

export default getProducts
