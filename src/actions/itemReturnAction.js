import { WORKFLOW_ACTIONS } from '../constants'
import { getValueForCustomField } from '../utils/customFields'

export function itemReturn(lineItem) {
  const CUSTOM_FIELD_NAME = 'return-reason'
  let RETURN_REASON = null
  try {
    RETURN_REASON = getValueForCustomField(
      lineItem.custom_fields,
      CUSTOM_FIELD_NAME
    )
  } catch (error) {
    console.warn(error)
  }

  if (!RETURN_REASON) {
    const action = {
      type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
      title: '↪️ Why is this item being returned?',
      message: 'Please choose a reason for this return:',
      entity: 'line_item',
      entity_id: lineItem.id,
      custom_field_name: CUSTOM_FIELD_NAME,
      custom_field_values: [
        {
          value: 'damaged',
          title: 'Damaged',
        },
        {
          value: 'wrong-size',
          title: 'Wrong size',
        },
        {
          value: 'other',
          title: 'Other',
        },
      ],
    }
    return action
  }

  if (RETURN_REASON === 'other') {
    const clearReason = {
      type: WORKFLOW_ACTIONS.SET_CUSTOM_FIELD,
      entity: 'line_item',
      entity_id: lineItem.id,
      custom_field_name: CUSTOM_FIELD_NAME,
      custom_field_value: '',
    }
    const action = {
      type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
      title: '↪️ Why is this item being returned?',
      message: 'Please enter a reason for this return:',
      entity: 'line_item',
      entity_id: lineItem.id,
      custom_field_name: CUSTOM_FIELD_NAME,
    }

    return [clearReason, action]
  }

  return null
}
