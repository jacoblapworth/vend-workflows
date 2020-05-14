import { WORKFLOW_ACTIONS } from "../_constants";

export function stopAction(lineItem) {
  const action = {
    type: WORKFLOW_ACTIONS.STOP,
    title: 'Stop!',
    message: 'You can\'t make this sale.',
    dismiss_label: 'Got It',
  };

  return action;
}