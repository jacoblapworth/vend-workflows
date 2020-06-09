import { WORKFLOW_ACTIONS } from "../_constants";
import { getValueForCustomField } from "../_utils/customFields";

export function tourTimeAction(lineItem, ctx) {
  const CUSTOM_FIELD_NAME = 'tour-datetime';
  const tour_datetime = getValueForCustomField(lineItem.custom_fields, CUSTOM_FIELD_NAME);

  if (!tour_datetime) {
    const now = new Date();

    const action = {
      type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
      title: '📆 Choose a tour time.',
      message: 'Here are the available timeslots for the product:',
      entity: 'line_item',
      entity_id: lineItem.id,
      custom_field_name: CUSTOM_FIELD_NAME,
      custom_field_values: [
        {
          value: '2020/05/06 10:30',
          title: 'Wednesday May 06 at 10:30 am',
        },
        {
          value: '2020/05/06 14:00',
          title: 'Wednesday May 06 at 2:00 pm',
        },
        {
          value: '2020/05/08 09:00',
          title: 'Friday May 08 at 9:00 am',
        },
      ],
    };

    return action;
  }

  return null;
}
