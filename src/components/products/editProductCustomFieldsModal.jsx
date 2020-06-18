import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { GET_PRODUCT_CUSTOM_FIELD_VALUES } from '../../graphql/queries/CustomFields'

import { Badge, Dialog, Button, LoaderSpinner } from '../SharedReact'
import { InputField } from '../InputField'
import { Switch } from '../Switch'
import { Label } from '../Label'
// import { Form } from './form'

export const EditProductCustomFieldsModal = React.memo(
  function EditProductCustomFieldsModal(props) {
    const { product, onClose } = props

    const { loading, error, data } = useQuery(GET_PRODUCT_CUSTOM_FIELD_VALUES, {
      variables: { productId: product.id },
    })

    const { register, errors, handleSubmit } = useForm()

    function onSubmit(data) {
      console.log('data', data)
    }

    const Form = () => {
      return (
        <Fragment>
          <form onSubmit={handleSubmit(onSubmit)} className="vd-mt5 vd-mb5">
            {data &&
              data.customFields.map((customField) => {
                const defaultValue = data.product.customFields.find(
                  (customFieldValue) =>
                    customFieldValue.name === customField.name
                )

                switch (customField.type) {
                  case 'STRING':
                    return (
                      <InputField
                        key={customField.name}
                        name={customField.name}
                        label={customField.title}
                        innerRef={register()}
                        errors={errors}
                        defaultValue={defaultValue && defaultValue.stringValue}
                      />
                    )
                  case 'INTEGER':
                    return (
                      <InputField
                        key={customField.name}
                        name={customField.name}
                        label={customField.title}
                        innerRef={register()}
                        errors={errors}
                        type="number"
                        defaultValue={defaultValue && defaultValue.integerValue}
                      />
                    )
                  case 'BOOLEAN':
                    return (
                      <div className="vd-field" key={customField.name}>
                        <Switch
                          name={customField.name}
                          ref={register}
                          defaultChecked={
                            defaultValue && defaultValue.booleanValue
                          }
                        />
                        <Label className="vd-ml2" name={customField.name}>
                          {customField.title}
                        </Label>
                      </div>
                    )
                  default:
                    return null
                }
              })}
          </form>
        </Fragment>
      )
    }

    return (
      <Dialog
        dismissible={true}
        header={'Edit Custom Fields'}
        content={
          <React.Fragment>
            <Badge
              header={product.name}
              description={product.sku}
              image={product.imageThumbnailURL}
              size="medium"
            />
            {loading && <LoaderSpinner />}
            {error && 'Error: ' + error}
            {data && <Form />}
          </React.Fragment>
        }
        actions={
          <div className="vd-btn-group">
            <Button onClick={onClose} variant="supplementary">
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>Save</Button>
          </div>
        }
        onClose={onClose}
        size={'medium'}
      />
    )
  }
)
