import cookies from 'next-cookies'
import useSWR from 'swr'
import { GraphQLClient } from 'graphql-request'

import { Spinner } from '../components/Spinner'

const CustomFields = props => {
  const { token } = props.cookies

  const API = '/api/vend/graphql'

  const graphQLClient = new GraphQLClient(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const query = /* GraphQL */ `{
    lineItemFields: customFields(entity: LINE_ITEM) {
      name
      title
      type
      visibleInUI
    }
    saleFields: customFields(entity: SALE) {
      name
      title
      type
      visibleInUI
    }
    productFields: customFields(entity: PRODUCT) {
      name
      title
      type
      visibleInUI
    }
    customerFields: customFields(entity: CUSTOMER) {
      name
      title
      type
      visibleInUI
    }
  }`

  const fetcher = query => graphQLClient.request(query)

  const { data, error } = useSWR(query, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <Spinner />

  const rows = data.lineItemFields.map((lineItemField) => {
    const { name, title, type, visibleInUI } = lineItemField

    return <tr key={name}>
      <td>
        {title}
      </td>
      <td>
        <pre>{type}</pre>
      </td>
      <td>
        <pre>{visibleInUI ? <span vd-icon="fa-check" class="vd-pl1 fa-fw fa fa-check"></span> : ''}</pre>
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
                <th>Visible</th>
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
