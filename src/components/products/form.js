import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'

import { InputField } from '../InputField'
import { Switch } from '../Switch'
import { Label } from '../Label'

export const Form = (props) => {
  const { data } = props

  // const defaultValues = () => {
  //   const values = {}
  //   data.product.customFields.forEach((customField) => {
  //     const type = customField['__typename']

  //     let value
  //     switch (type) {
  //       case 'StringCustomFieldValue':
  //         value = customField.stringValue
  //         break
  //       case 'IntegerCustomFieldValue':
  //         value = customField.integerValue
  //         break
  //       case 'BooleanCustomFieldValue':
  //         value = customField.booleanValue ? 'on' : 'off'
  //         break
  //       default:
  //         return null
  //     }

  //     values[customField.name] = value
  //   })
  //   return values
  // }

  const { register, errors, handleSubmit } = useForm({
    // defaultValues: defaultValues(),
  })

  function onSubmit(data) {
    console.log('data', data)
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="vd-mt5 vd-mb5">
        {data.customFields.map((customField) => {
          const customFieldValue = data.product.customFields.find(
            (field) => field.name === customField.name
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
                  defaultValue={
                    customFieldValue && customFieldValue.stringValue
                  }
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
                  defaultValue={
                    customFieldValue && customFieldValue.integerValue
                  }
                />
              )
            case 'BOOLEAN':
              return (
                <div className="vd-field" key={customField.name}>
                  <Switch
                    name={customField.name}
                    ref={register}
                    defaultChecked={
                      customFieldValue && customFieldValue.booleanValue
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
        <button onClick={handleSubmit((data) => console.log(data))}>
          Save
        </button>
      </form>
    </Fragment>
  )
}
