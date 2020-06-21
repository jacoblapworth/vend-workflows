import { gql } from '@apollo/client'

export const GET_RETAILER = gql`
  query GetRetailer {
    retailer {
      id
      domainPrefix
      accountStatus
      isTaxExclusive
      storeCreditEnabled
      currency {
        code
        symbol
      }
      culture
      country
      qboEnabled
    }
  }
`
