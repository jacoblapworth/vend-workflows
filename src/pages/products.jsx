import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, NetworkStatus } from '@apollo/client'
import withAuthentication from '../components/WithAuthentication'
import { GET_PRODUCTS } from '../graphql/queries/Products'

import { ProductRow } from '../components/Products/ProductRow'

import { Button } from '../components/SharedReact'
import { CustomFieldsModal } from '../components/Products/CustomFieldsModal'
import { InputField } from '../components/Inputs/InputField'
import { Section } from '../components/Layout/Section'
import { ErrorMessage } from '../components/ErrorMessage'
import { LoaderSpinner } from '../components/SharedReact'

function Products() {
  const [editProductModal, setEditProductModal] = useState(false)
  const [product, setProduct] = useState(null)
  const { register, watch } = useForm()

  function editProduct(product) {
    setProduct(product)
    setEditProductModal(true)
  }

  function closeModal() {
    setEditProductModal(false)
    setProduct(null)
  }

  const variables = {
    first: 50,
    filter: {
      searchTerm: watch('search'),
      excludeChildren: true,
    },
  }
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_PRODUCTS,
    {
      variables: variables,
      notifyOnNetworkStatusChange: true,
    }
  )
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const endCursor = data && data.products.pageInfo.endCursor
  const hasNextPage = data && data.products.pageInfo.hasNextPage

  const handleLoadMore = () => {
    fetchMore({
      query: GET_PRODUCTS,
      variables: {
        ...variables,
        after: endCursor,
        filter: {
          searchTerm: watch('search'),
          excludeChildren: true,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newQuery = {
          products: {
            ...fetchMoreResult.products,
            products: [
              ...prev.products.products,
              ...fetchMoreResult.products.products,
            ],
          },
        }

        return newQuery
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading posts." />

  const Pages = () => {
    if (loading && !loadingMorePosts)
      return (
        <tr>
          <td>
            <LoaderSpinner />
          </td>
        </tr>
      )

    return data.products.products.map((product) => (
      <ProductRow
        key={product.id}
        product={product}
        editProduct={editProduct}
      />
    ))
  }

  return (
    <>
      <Section>
        <h1 className="vd-header vd-header--page">Products</h1>
      </Section>
      {editProductModal && (
        <CustomFieldsModal onClose={closeModal} product={product} />
      )}
      <section className="vd-section vd-section--secondary">
        <div className="vd-section-wrap">
          <div className="vd-flex vd-flex--justify-between vd-flex--align-center">
            <div>Save extra metadata on items in Vend with Custom Fields.</div>
          </div>
        </div>
      </section>
      <Section>
        <InputField
          name="search"
          label="Search for Products"
          innerRef={register}
          prefix={<i className="fa fa-search" />}
          placeholder="Enter name, SKU, handle or supplier code"
        />
        <table className="p-table p-table--no-wrap vd-table vd-mb4">
          <thead>
            <tr>
              <th className="vd-pl0 vd-pr0 vd-tight"></th>
              <th>Product</th>
              <th className="vd-pl0 vd-pr0 vd-tight"></th>
            </tr>
          </thead>
          <tbody>
            <Pages />
          </tbody>
        </table>
        {hasNextPage && (
          <Button onClick={handleLoadMore} loading={loadingMorePosts}>
            Load more
          </Button>
        )}
      </Section>
    </>
  )
}

export default withAuthentication(Products)
