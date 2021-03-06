import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GraphQLClient } from 'graphql-request'

import { createCustomField } from '../../graphql/mutations/CustomFields'
import { Dialog, Button } from '../SharedReact'
import { Switch } from '../Inputs/Switch'
import { InputField } from '../Inputs/InputField'
import { Select } from '../Inputs/Select'
import { Label } from '../Inputs/Label'

export default function AddCustomField(props) {
  const { onClose } = props
  const [isLoading, setIsLoading] = useState(false)

  const uri = '/api/vend/graphql'
  const graphQLClient = new GraphQLClient(uri)

  const { register, handleSubmit, errors, setError } = useForm()
  const onSubmit = async (customField) => {
    setIsLoading(true)
    const name = 'demo_' + customField.name
    const variables = {
      ...customField,
      name,
    }
    const data = await graphQLClient
      .request(createCustomField, variables)
      .catch((error) => {
        console.error("Couldn't create custom field.", error)
        setError('name', 'notMatch', 'Please enter a different name.')
      })
    setIsLoading(false)
    data && onClose()
  }

  return (
    <Dialog
      dismissible={true}
      header={'Add Custom Field.'}
      content={
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              name="entity"
              label="Entity Type"
              innerRef={register({ required: true })}
              errors={errors}
            >
              <option value="PRODUCT">Product</option>
              <option value="SALE">Sale</option>
              <option value="LINE_ITEM">Line Item</option>
              <option value="CUSTOMER">Customer</option>
            </Select>
            <InputField
              name="name"
              label="Name"
              prefix="demo_"
              style={{
                paddingLeft: '6.2ch',
              }}
              innerRef={register({ required: 'Please enter a name.' })}
              errors={errors}
            />
            <InputField
              name="title"
              label="Title"
              placeholder="Enter a title"
              innerRef={register({ required: 'Please enter a title.' })}
              errors={errors}
            />
            <Select
              name="type"
              label="Field Type"
              innerRef={register({ required: true })}
              errors={errors}
            >
              <option value="STRING">String</option>
              <option value="NUMBER">Number</option>
              <option value="BOOLEAN">Boolean</option>
            </Select>
            <div className="vd-field">
              <Switch name="visibleInUI" ref={register} />
              <Label className="vd-ml2" name="visibleInUI">
                Visible in UI
              </Label>
            </div>
          </form>
        </>
      }
      actions={
        <div className="vd-btn-group">
          <Button onClick={onClose} variant="supplementary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} loading={isLoading}>
            Add
          </Button>
        </div>
      }
      onClose={onClose}
      size={'medium'}
    />
  )
}
