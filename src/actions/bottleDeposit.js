import { WORKFLOW_ACTIONS } from '../constants'

export function bottleDeposit(lineItem) {
  const action = {
    type: WORKFLOW_ACTIONS.ADD_LINE_ITEM,
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
