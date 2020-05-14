import { WORKFLOW_ACTIONS } from "../_constants";

export function requireCustomerAction(lineItem, ctx) {
  const { customer } = ctx;

  if (customer.id.length <= 0) {
    const action = {
      type: WORKFLOW_ACTIONS.CONFIRM,
      title: 'Please add a customer.',
      message: 'You should add a customer to this sale, and ask for their email address.',
      dismiss_label: 'Back',
      confirm_label: 'Pay',
    };

    return action;
  }

  return null;
}