import { Badge, Button } from '../SharedReact'

export const VariantRow = (props) => {
  const { product, editProduct } = props

  return (
    <div className="vd-flex vd-flex--justify-between vd-pt2 vd-pb2">
      <div className="vd-mt2 vd-mb2">
        <Badge
          header={product.variantName}
          description={product.sku}
          image={product.imageThumbnailURL}
          size="small"
        />
      </div>

      <Button modifier="icon" variant="go" onClick={() => editProduct(product)}>
        <i className="fa fa-pencil vd-icon"></i>
      </Button>
    </div>
  )
}
