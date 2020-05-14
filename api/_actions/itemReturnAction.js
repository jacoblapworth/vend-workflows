import { WORKFLOW_ACTIONS } from "../_constants";
import { getValueForCustomField } from "../_utils/customFields";

export function itemReturn(lineItem, ctx) {
  const CUSTOM_FIELD_NAME = 'return-reason';
  const returnReason = getValueForCustomField(lineItem.custom_fields, CUSTOM_FIELD_NAME);

  if (!returnReason) {
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
    };
    return action;
  }

  if (returnReason === 'other') {
    const clearReason = {
      type: WORKFLOW_ACTIONS.SET_CUSTOM_FIELD,
      entity: 'line_item',
      entity_id: lineItem.id,
      custom_field_name: CUSTOM_FIELD_NAME,
      custom_field_value: '',
    };
    const action = {
      type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
      title: '↪️ Why is this item being returned?',
      message: 'Please enter a reason for this return:',
      entity: 'line_item',
      entity_id: lineItem.id,
      custom_field_name: CUSTOM_FIELD_NAME,
    };

    return [clearReason, action];
  }

  return null;
}