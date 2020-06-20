import { Badge, Button } from '../SharedReact'

export const ProductRow = (props) => {
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
