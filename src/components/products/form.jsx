import React, { Fragment } from 'react'

import { InputField } from '../InputField'
import { Select } from '../Select'
import { Switch } from '../Switch'
import { Label } from '../Label'

export const Form = (props) => {
  const { data, formMethods } = props
  const { register, errors } = formMethods

  return (
    <Fragment>
      {data.customFields.map((customField) => {
        const customFieldValue = data.product.customFields.find(
          (field) => field.name === customField.name
        )

        if (customField.name === 'demo_rule') {
          return (
            <Select
              key={customField.name}
              name={customField.name}
              label={customField.title}
              innerRef={register()}
              errors={errors}
              defaultValue={customFieldValue && customFieldValue.stringValue}
            >
              <option value=""></option>
              <option value="confirmAction">Confirm</option>
              <option value="stopAction">Stop</option>
              <option value="booleanAction">Boolean</option>
              <option value="itemReturn">Item Return</option>
              <option value="redeemReward">Redeem Reward</option>
              <option value="requireAgeVerification">
                Require Age Verification
              </option>
              <option value="requireCustomerAction">Require Customer</option>
              <option value="requireIMEIAction">Require IMEI</option>
              <option value="tourTimeAction">Tour Time</option>
              <option value="formAction">Form</option>
            </Select>
          )
        }
        switch (customField.type) {
          case 'STRING':
            return (
              <InputField
                key={customField.name}
                name={customField.name}
                label={customField.title}
                innerRef={register()}
                errors={errors}
                defaultValue={customFieldValue && customFieldValue.stringValue}
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
                defaultValue={customFieldValue && customFieldValue.integerValue}
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
    </Fragment>
  )
}
