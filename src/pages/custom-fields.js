import cookies from 'next-cookies'
import useSWR from 'swr'
import { GraphQLClient } from 'graphql-request'

// import { withAuthSync } from "../utils/auth";
import { Spinner } from '../components/Spinner'

const API = 'https://cors-anywhere.herokuapp.com/https://thetaxman.vendhq.com/api/graphql'

const CustomFields = props => {

  console.log(props);


  const graphQLClient = new GraphQLClient(API, {
    headers: {
      Authorization: 'Bearer 5OtjwgBqfINOmTyVvRBrC_Nq274OevQsbpRLMPkU',
    },
  })

  const query = /* GraphQL */ `{
    lineItemFields: customFields(entity: LINE_ITEM) {
      name
      title
      type
    }
    saleFields: customFields(entity: SALE) {
      name
      title
      type
    }
  }`

  const fetcher = query => graphQLClient.request(query)

  const { data, error } = useSWR(query, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <Spinner />

  const rows = data.lineItemFields.map((lineItemField) => {
    return <tr key={lineItemField.name}>
      <td>
        {lineItemField.title}
      </td>
      <td>
        <pre>{lineItemField.type}</pre>
      </td>
    </tr>
  })

  return (
    <>
      <section className="vd-section">
        <div className="vd-section-wrap">
          <h1 className="vd-header vd-header--page">Custom Fields</h1>
        </div>
      </section>
      <section className="vd-section">
        <div className="vd-section-wrap">
          <table className="p-table p-table--no-wrap vd-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

CustomFields.getInitialProps = (ctx) => {
  return {
    cookies: cookies(ctx)
  }
}

export default CustomFields;
