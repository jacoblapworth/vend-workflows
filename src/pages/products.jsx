import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, NetworkStatus } from '@apollo/client'
import { GET_PRODUCTS } from '../graphql/queries/Products'

import { Badge, Button } from '../components/SharedReact'
import { CustomFieldsModal } from '../components/products/CustomFieldsModal'
import { InputField } from '../components/InputField'
import { Section } from '../components/Section'
import { ErrorMessage } from '../components/ErrorMessage'
import { LoaderSpinner } from '../components/SharedReact'

const ProductRow = (props) => {
  const { product, editProduct } = props
  return (
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
      <td>
        <Button
          modifier="icon"
          variant="go"
          onClick={() => editProduct(product)}
        >
          <i className="fa fa-pencil vd-icon"></i>
        </Button>
      </td>
    </tr>
  )
}

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

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_PRODUCTS,
    {
      variables: {
        first: 50,
        filter: {
          searchTerm: watch('search'),
        },
      },
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
        first: 50,
        after: endCursor,
        filter: {
          searchTerm: watch('search'),
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
        <ProductsCustomFieldsModal onClose={closeModal} product={product} />
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
              <th>Product</th>
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

export default Products
