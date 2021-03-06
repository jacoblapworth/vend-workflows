import { WORKFLOW_ACTIONS } from '../constants'

export function confirmAction() {
  const action = {
    type: WORKFLOW_ACTIONS.CONFIRM,
    title: 'Wait!',
    message: 'Please confirm, before taking payment.',
    dismiss_label: 'Cancel',
    confirm_label: 'Continue',
  }

  return action
}
