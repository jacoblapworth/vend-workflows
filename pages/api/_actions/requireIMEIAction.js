import { WORKFLOW_ACTIONS } from "../_constants";
import { getValueForCustomField } from "../_utils/customFields"

export function requireIMEIAction(lineItem) {
  const serial = getValueForCustomField(lineItem.custom_fields, 'serial');

  const action = {
    type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
    title: 'Enter IMEI.',
    message: 'Please enter the serial number for this product.',
    entity: 'line_item',
    entity_id: lineItem.id,
    custom_field_name: 'serial',
  };

  const invalidAction = {
    type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
    title: 'Invalid IMEI.',
    message: 'Please enter a valid serial number for this product. Hint: abc',
    entity: 'line_item',
    entity_id: lineItem.id,
    custom_field_name: 'serial',
  };

  if (!serial) {
    console.log('Serial required.');
    return action;
  } if (!serial.match(/abc/)) {
    console.log('Serial is invalid: ', serial);
    return invalidAction;
  }

  return null;
}