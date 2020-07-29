import { WORKFLOW_ACTIONS } from '../constants'

export default function action(lineItem, ctx) {
  const { customer } = ctx

  if (!customer.id) return

  const action = {
    type: WORKFLOW_ACTIONS.CONFIRM,
    title: 'Maximum account balance exceeded',
    message: `${customer.first_name}'s balance is ${customer.balance}.`,
    dismiss_label: 'Cancel',
    confirm_label: 'Continue',
  }

  if (customer.balance < 0) {
    return action
  }

  return null
}
