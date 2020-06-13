import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { Dialog, Button } from '../SharedReact'
import { Switch } from '../Switch'
import { InputField } from '../InputField'
import { Select } from '../Select'
import { Label } from '../Label'

export default function AddCustomField(props) {
  const { onClose } = props

  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <Dialog
      dismissible={true}
      header={'Add Custom Field.'}
      content={
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              name="customFieldEntity"
              label="Entity Type"
              innerRef={register({ required: true })}
              error={errors.customFieldEntity}
            >
              <option value="product">Product</option>
              <option value="sale">Sale</option>
              <option value="line_item">Line Item</option>
              <option value="customer">Customer</option>
            </Select>
            <InputField
              name="customFieldName"
              label="Name"
              innerRef={register({ required: true })}
              error={errors.customFieldName}
            />
            <InputField
              name="customFieldTitle"
              label="Title"
              innerRef={register({ required: true })}
              error={errors.customFieldTitle}
            />
            <div className="vd-field">
              <Switch name="customFieldVisible" ref={register} />
              <Label className="vd-ml2" name="customFieldVisible">
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
          <Button onClick={handleSubmit(onSubmit)}>Add</Button>
        </div>
      }
      onClose={onClose}
      size={'medium'}
    />
  )
}
