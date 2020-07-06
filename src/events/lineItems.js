import * as Actions from '../actions'
import { getValueForCustomField } from '../utils/customFields'

function lineItemActions(lineItem, ctx) {
  /*
  Look for a custom field on the line_item's product called "demo_rule"
  Use the value to call an action of the same name
  */

  if (!lineItem.product || !lineItem.product.custom_fields) {
    throw new Error('No custom fields for this product.')
  }

  const CUSTOM_FIELD = 'demo_rule'
  const RULE = getValueForCustomField(
    lineItem.product.custom_fields,
    CUSTOM_FIELD
  )

  if (RULE !== 'workOrderForm') return

  if (typeof Actions[RULE] === 'undefined') {
    throw new Error(`No action with the name: "${RULE}"`)
  }

  const ruleAction = Actions[RULE](lineItem, ctx)

  return ruleAction
}

export function respondToLineItems(event) {
  const lineItemsAdded = event.line_items

  const actions = lineItemsAdded
    .flatMap((lineItem, i) => {
      console.log(`Added_line_item: ${i}`, lineItem)

      try {
        return lineItemActions(lineItem, event)
      } catch (error) {
        console.warn(error)
      }
    })
    .filter((item) => !!item)

  return { actions }
}
