import * as Actions from '../_actions'
import { getValueForCustomField } from '../_utils/customFields'

function lineItemActions(lineItem, ctx) {
  /*
  Look for a custom field on the line_item's product called "demo_rule"
  Use the value to call an action of the same name
  */

  if (!lineItem.product || !lineItem.product.custom_fields) {
    throw new Error("No custom fields for this product.")
  }

  const rule = getValueForCustomField(lineItem.product.custom_fields, 'demo_rule')

  if (typeof Actions[rule] === 'undefined') {
    throw new Error(`No action with the name: "${rule}"`)
  }

  const ruleAction = Actions[rule](lineItem, ctx)

  return ruleAction;
}

export default function readyForPayment(event) {
  const lineItems = event.sale.line_items;

  const actions = lineItems.flatMap((lineItem, i) => {
    console.log(`Line_item: ${i}`, lineItem);

    // Returns
    if (lineItem.quantity < 0) {
      return Actions.itemReturn(lineItem, event);
    }

    // Line-item actions
    try {
      return lineItemActions(lineItem, event);
    } catch (error) {
      console.warn(error)
    }

  }).filter((item) => !!item);

  return { actions };
}


