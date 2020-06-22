import { useQuery } from '@apollo/client'

import { GET_RETAILER } from '../graphql/queries/Retailer'

export default function Apollo() {
  const { loading, error, data } = useQuery(GET_RETAILER)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return <p>{JSON.stringify(data.retailer)}</p>
}
