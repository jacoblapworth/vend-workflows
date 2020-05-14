import { WORKFLOW_ACTIONS } from "../_constants";
import { getValueForCustomField } from "../_utils";

export function booleanAction(lineItem) {
  const verified = getValueForCustomField(lineItem.custom_fields, 'Boolean');

  const action = {
    type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
    title: 'Please tick the checkbox.',
    message: 'This line_item will have a custom field "boolean" set to the value:',
    entity: 'line_item',
    entity_id: lineItem.id,
    custom_field_name: 'Boolean',
  };

  if (!verified) {
    return action;
  }

  return null;
}