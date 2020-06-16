import React, { useMemo } from 'react'
import useSWR, { useSWRPages } from 'swr'
import { GraphQLClient } from 'graphql-request'

import { getProducts } from '../graphql/queries/Products'

import { Badge, Button } from '../components/SharedReact'

import { Spinner } from '../components/Spinner'
import Section from '../components/Section'

function Products() {
  const API = '/api/vend/graphql'
  const graphQLClient = new GraphQLClient(API)

  function getPages({ offset, withSWR }) {
    const fetcher = (query, offset) => {
      const variables = {
        first: 20,
        after: offset,
      }
      return graphQLClient.request(query, variables)
    }

    const { data } = withSWR(useSWR([getProducts, offset], fetcher))

    if (!data) {
      return <></>
    }

    return data.products.products.map((product) => (
      <tr key={product.id}>
        <td>
          <div className="vd-mt4 vd-mb4">
            <Badge
              header={product.name}
              description={product.sku}
              image={product.imageThumbnailURL}
              size="small"
            />
          </div>
        </td>
      </tr>
    ))
  }

  function getOffset(SWR) {
    if (!SWR.data.products.pageInfo.hasNextPage) {
      return null
    }

    return SWR.data.products.pageInfo.endCursor
  }

  const { pages, isLoadingMore, loadMore } = useSWRPages(
    'products', // page key
    getPages, // page component
    getOffset, // get next page's offset from the index of current page
    [] // deps of the page component
  )

  return (
    <>
      <Section>
        <h1 className="vd-header vd-header--page">Products</h1>
      </Section>
      <section className="vd-section vd-section--secondary">
        <div className="vd-section-wrap">
          <div className="vd-flex vd-flex--justify-between vd-flex--align-center">
            <div>Save extra metadata on items in Vend with Custom Fields.</div>
          </div>
        </div>
      </section>
      <Section>
        <table className="p-table p-table--no-wrap vd-table">
          <thead>
            <tr>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>{pages}</tbody>
        </table>
        <Button onClick={loadMore} loading={isLoadingMore}>
          Load more
        </Button>
      </Section>
    </>
  )
}

// Products.propTypes = {}

export default Products
