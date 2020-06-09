import { WORKFLOW_ACTIONS } from "../_constants";
import { getValueForCustomField } from "../_utils/customFields";

export function requireAgeVerification(lineItem, ctx) {
  const verified = getValueForCustomField(ctx.sale.custom_fields, 'verified');

  if (!verified) {
    const today = new Date();
    const over18Date = new Date(today.setFullYear(today.getFullYear() - 18));
    const { date_of_birth } = ctx.customer;

    if (date_of_birth) {
      const dob = new Date(date_of_birth);
      const isOver18 = dob < over18Date;

      if (isOver18) {
        const action = {
          type: WORKFLOW_ACTIONS.SET_CUSTOM_FIELD,
          entity: 'sale',
          custom_field_name: 'verified',
          custom_field_value: true,
        };

        return action;
      }
      const action = {
        type: WORKFLOW_ACTIONS.STOP,
        title: '🔞 You can\'t sell alcohol to someone underage.',
        message: 'This customer is younger than 18.',
        dismiss_label: 'Got It',
      };

      return action;
    }

    const ddmmyy = `${over18Date.getDate()}/${over18Date.getMonth() + 1}/${over18Date.getFullYear()}`;

    const action = {
      type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
      title: '🔞 Please check the customer\'s ID.',
      message: `The customer needs to be 18 years or older. \nBirthday before: ${ddmmyy}`,
      entity: 'sale',
      custom_field_name: 'verified',
    };

    return action;
  }

  return null;
}