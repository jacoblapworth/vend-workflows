import { useState } from 'react'
import classNames from 'classnames'
import { useQuery, NetworkStatus } from '@apollo/client'
import { GET_PRODUCTS } from '../../graphql/queries/Products'

import { Badge, LoaderSpinner } from '../SharedReact'
import { VariantRow } from './VariantRow'

export const ProductVariants = (props) => {
  const { product, editProduct } = props
  const variables = {
    first: 50,
    filter: {
      include: {
        variantParentIDs: [product.id],
      },
    },
  }
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_PRODUCTS,
    {
      variables: variables,
      notifyOnNetworkStatusChange: true,
    }
  )

  if (loading) return <LoaderSpinner />
  if (error) return null

  return data.products.products.map((product) => {
    return (
      <VariantRow
        key={product.id + '-expanded'}
        product={product}
        editProduct={editProduct}
      />
    )
  })
}

export const ProductRow = (props) => {
  const { product, editProduct } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const handleRowClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <tr
        key={product.id}
        className={classNames('vd-expandable', {
          'vd-expandable--expanded': isExpanded,
        })}
        onClick={handleRowClick}
      >
        <td className="vd-valign-t vd-pt5">
          <i
            className={classNames('fa', 'vd-icon', 'vd-text--secondary', {
              'fa-angle-down': isExpanded,
              'fa-angle-right': !isExpanded,
            })}
          ></i>
        </td>
        <td>
          <div className="vd-mt2 vd-mb2">
            <Badge
              header={product.name}
              description={
                product.hasVariants
                  ? product.variantCount + ' variants'
                  : product.sku
              }
              image={product.imageThumbnailURL}
              size="small"
            />
          </div>
        </td>
        <td>
          {/* <Button
            modifier="icon"
            variant="go"
            onClick={() => editProduct(product)}
          >
            <i className="fa fa-pencil vd-icon"></i>
          </Button> */}
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td className="p-expanded-content" colSpan="3">
            <ProductVariants product={product} editProduct={editProduct} />
          </td>
        </tr>
      )}
    </>
  )
}
