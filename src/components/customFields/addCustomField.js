import React from 'react'
import { useForm } from 'react-hook-form'

import { Dialog, Button } from '../SharedReact'
import { Switch } from '../Switch'
import { InputField } from '../InputField'
import { Select } from '../Select'
import { Label } from '../Label'

export default function AddCustomField(props) {
  const { onClose } = props

  const { register, handleSubmit, errors } = useForm()
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
              errors={errors}
            >
              <option value="product">Product</option>
              <option value="sale">Sale</option>
              <option value="line_item">Line Item</option>
              <option value="customer">Customer</option>
            </Select>
            <InputField
              name="customFieldName"
              label="Name"
              prefix="demo_"
              style={{
                paddingLeft: '6.2ch',
              }}
              innerRef={register({ required: 'Please enter a name.' })}
              errors={errors}
            />
            <InputField
              name="customFieldTitle"
              label="Title"
              placeholder="Enter a title"
              innerRef={register({ required: 'Please enter a title.' })}
              errors={errors}
            />
            <Select
              name="customFieldType"
              label="Field Type"
              innerRef={register({ required: true })}
              errors={errors}
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </Select>
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
