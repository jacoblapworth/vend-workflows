import { WORKFLOW_ACTIONS } from '../constants'
import { getValueForCustomField } from '../utils/customFields'

export function requireIMEIAction(lineItem) {
  let SERIAL = null
  try {
    SERIAL = getValueForCustomField(lineItem.custom_fields, 'serial')
  } catch (error) {
    console.warn(error)
  }

  const action = {
    type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
    title: 'Enter IMEI.',
    message: 'Please enter the serial number for this product.',
    entity: 'line_item',
    entity_id: lineItem.id,
    custom_field_name: 'serial',
  }

  const invalidAction = {
    type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
    title: 'Invalid IMEI.',
    message: 'Please enter a valid serial number for this product. Hint: abc',
    entity: 'line_item',
    entity_id: lineItem.id,
    custom_field_name: 'serial',
  }

  if (!SERIAL) {
    console.log('Serial required.')
    return action
  }
  if (!SERIAL.match(/abc/)) {
    console.log('Serial is invalid: ', SERIAL)
    return invalidAction
  }

  return null
}
