import * as Actions from '../_actions'

function lineItemActions(lineItem, ctx) {
  const actions = {
    '4e9a7ef1-baa2-b269-6122-6df46aab4b2e': Actions.stopAction,
    '48cdce72-8f4a-58a7-c376-6dfccbfe23e2': Actions.confirmAction,
    'ae7cc7ab-7ff7-0d63-0327-b90801994f82': Actions.requireIMEIAction,
    '406ce5ae-cf72-6b6c-eb0e-422bf6e66e41': Actions.booleanAction,
    'a9d42b88-06c3-b260-508d-bfdfdab7df86': Actions.requireAgeVerification,
    '86a63c16-6a21-0906-5d64-b79236dba474': Actions.tourTimeAction,
    'a584c971-9dfa-c919-f8ee-91a58938ea18': Actions.requireCustomerAction,
    '3ef832e7-a556-d0b0-bfe7-5c62927fb5c4': Actions.redeemReward,
    'c879df57-c246-f98b-1caf-059f6f69ee44': Actions.formAction,
  };

  const productId = lineItem.product_id.toLowerCase();

  if (typeof actions[productId] === 'undefined') {
    return null;
  }

  const action = actions[productId](lineItem, ctx);
  return action;
}

export function readyForPayment(event) {
  const lineItems = event.sale.line_items;

  const actions = lineItems.flatMap((lineItem, i) => {
    console.log(`Line_item: ${i}`, lineItem);

    // Returns
    if (lineItem.quantity < 0) {
      return Actions.itemReturn(lineItem, event);
    }

    // Line-item actions
    return lineItemActions(lineItem, event);

  }).filter((item) => !!item);

  return { actions };
}


