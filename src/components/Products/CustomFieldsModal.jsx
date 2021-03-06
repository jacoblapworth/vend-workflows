import React, { Fragment } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { GET_PRODUCT_CUSTOM_FIELD_VALUES } from '../../graphql/queries/CustomFields'
import { SET_CUSTOM_FIELD_VALUES } from '../../graphql/mutations/CustomFields'

import { Badge, Dialog, Button, LoaderSpinner } from '../SharedReact'
import { Form } from './Form'

function getValueTypeForCustomField(customFields, customFieldName) {
  const field = customFields.find((field) => field.name == customFieldName)
  switch (field.type) {
    case 'STRING':
      return 'stringValue'
    case 'INTEGER':
      return 'integerValue'
    case 'BOOLEAN':
      return 'booleanValue'
    default:
      break
  }
}

export function CustomFieldsModal(props) {
  const { product, onClose } = props

  const { loading, error, data } = useQuery(GET_PRODUCT_CUSTOM_FIELD_VALUES, {
    variables: { productId: product.id },
  })

  const [setCustomFieldValues, { loading: mutationLoading }] = useMutation(
    SET_CUSTOM_FIELD_VALUES,
    {
      onCompleted: () => onClose(),
    }
  )

  const formMethods = useForm()
  const { handleSubmit } = formMethods

  const save = (formData) => {
    const values = Object.entries(formData).map((fields) => {
      const valueType = getValueTypeForCustomField(data.customFields, fields[0])
      return { name: fields[0], [valueType]: fields[1] }
    })

    setCustomFieldValues({
      variables: {
        entity: 'PRODUCT',
        entityId: product.id,
        values: values,
      },
    })
  }

  return (
    <Dialog
      dismissible={true}
      header={'Edit Custom Fields'}
      content={
        <Fragment>
          <Badge
            header={product.name}
            description={product.sku}
            image={product.imageThumbnailURL}
            size="medium"
          />
          <div className="vd-mt5 vd-mb5">
            {loading && <LoaderSpinner />}
            {error && 'Error: ' + error}
            {data && <Form data={data} formMethods={formMethods} />}
          </div>
        </Fragment>
      }
      actions={
        <div className="vd-btn-group">
          <Button onClick={onClose} variant="supplementary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(save)} loading={mutationLoading}>
            Save
          </Button>
        </div>
      }
      onClose={onClose}
      size={'medium'}
    />
  )
}

export default CustomFieldsModal
