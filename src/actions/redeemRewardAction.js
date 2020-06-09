import { WORKFLOW_ACTIONS } from "../constants";
import { getValueForCustomField } from "../utils/customFields";

export function redeemReward(lineItem, ctx) {
  const CUSTOM_FIELD_NAME = 'reward';
  let REWARD_ID = null
  try {
    REWARD_ID = getValueForCustomField(ctx.sale.custom_fields, CUSTOM_FIELD_NAME);
  } catch (error) {
    console.warn(error);
  }

  if (!REWARD_ID) {
    const action = {
      type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELD,
      title: '🎁 Choose a reward.',
      message: 'This product comes with a complementary reward:',
      entity: 'sale',
      custom_field_name: CUSTOM_FIELD_NAME,
      custom_field_values: [
        {
          value: 'reward1',
          title: 'Reward 1',
        },
        {
          value: 'reward2',
          title: 'Reward 2',
        },
        {
          value: 'reward3',
          title: 'Reward 3',
        },
      ],
    };

    return action;
  }

  const rewardAdded = ctx.sale.line_items.find((otherLineItem) => otherLineItem.product_id === 'ad4129fb-a9ce-31c8-c955-97e9842d42db');

  if (!rewardAdded) {
    const action = {
      type: WORKFLOW_ACTIONS.ADD_LINE_ITEM,
      product_sku: 'reward',
    };

    return action;
  }

  return null;
}