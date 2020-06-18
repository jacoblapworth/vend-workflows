import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../graphql/queries/Products'

import { getProducts } from '../graphql/queries/Products'

import { Badge, Button } from '../components/SharedReact'
import { EditProductCustomFieldsModal } from '../components/products/editProductCustomFieldsModal'
import { Spinner } from '../components/Spinner'
import { InputField } from '../components/InputField'
import Section from '../components/Section'
import { LoaderSpinner } from '../components/SharedReact'

// const ProductResults = (props) => { }

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

  function editProduct(product) {
    setProduct(product)
    setEditProductModal(true)
  }

  function closeModal() {
    setEditProductModal(false)
    setProduct(null)
  }

  const { register, handleSubmit, watch, errors } = useForm()
  console.log(watch('search'))

  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      first: 20,
    },
  })

  const endCursor = data && data.products.pageInfo.endCursor

  function loadMore() {
    fetchMore({
      query: GET_PRODUCTS,
      variables: {
        first: 20,
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        console.log('previousResult', previousResult)
        console.log('fetchMoreResult', fetchMoreResult)
        const previousEntry = previousResult.products
        const nextEntry = fetchMoreResult.products.products
        const newCursor = fetchMoreResult.products.pageInfo.endCursor
        return {
          // By returning `cursor` here, we update the `fetchMore` function
          // to the new cursor.
          endCursor: newCursor,
          products: {
            products: [...nextEntry, ...previousEntry.products],
          },
          __typename: previousEntry.__typename,
        }
      },
    })
  }

  const Pages = () => {
    if (loading) return null
    if (error) return 'Error! ' + error
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
        <EditProductCustomFieldsModal onClose={closeModal} product={product} />
      )}
      <section className="vd-section vd-section--secondary">
        <div className="vd-section-wrap">
          <div className="vd-flex vd-flex--justify-between vd-flex--align-center">
            <div>Save extra metadata on items in Vend with Custom Fields.</div>
          </div>
        </div>
      </section>
      <Section>
        <InputField name="search" label="Search" innerRef={register} />
        <table className="p-table p-table--no-wrap vd-table">
          <thead>
            <tr>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            <Pages />
          </tbody>
        </table>
        {loading && <LoaderSpinner />}
        <Button onClick={loadMore}>Load more</Button>
      </Section>
    </>
  )
}

export default Products
