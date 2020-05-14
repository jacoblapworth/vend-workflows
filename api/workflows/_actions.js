import { getValueForCustomField } from "./_utils";

export function stopAction(lineItem) {
  const action = {
    type: 'stop',
    title: 'Stop!',
    message: 'You can\'t make this sale.',
    dismiss_label: 'Got It',
  };

  return action;
}

export function confirmAction(lineItem) {
  const action = {
    type: 'confirm',
    title: 'Wait!',
    message: 'Please confirm, before taking payment.',
    dismiss_label: 'Cancel',
    confirm_label: 'Continue',
  };

  return action;
}

export function requireIMEIAction(lineItem) {
  let serial = {};

  if (lineItem.custom_fields.length > 0) {
    serial = getValueForCustomField(lineItem.custom_fields, 'serial');
  }

  const action = {
    type: 'require_custom_field',
    title: 'Enter IMEI.',
    message: 'Please enter the serial number for this product.',
    entity: 'line_item',
    entity_id: lineItem.id,
    custom_field_name: 'serial',
  };

  const invalidAction = {
    type: 'require_custom_field',
    title: 'Invalid IMEI.',
    message: 'Please enter a valid serial number for this product. Hint: abc',
    entity: 'line_item',
    entity_id: lineItem.id,
    custom_field_name: 'serial',
  };

  if (!serial.value) {
    console.log('Serial required.');
    return action;
  } if (!serial.value.match(/abc/)) {
    console.log('Serial is invalid: ', serial);
    return invalidAction;
  }

  return null;
}

export function booleanAction(lineItem) {
  const verified = getValueForCustomField(lineItem.custom_fields, 'Boolean');

  const action = {
    type: 'require_custom_field',
    title: 'Please tick the checkbox.',
    message: 'This line_item will have a custom field "boolean" set to the value:',
    entity: 'line_item',
    entity_id: lineItem.id,
    custom_field_name: 'Boolean',
  };

  if (!verified) {
    return action;
  }

  return null;
}

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
          type: 'set_custom_field',
          entity: 'sale',
          custom_field_name: 'verified',
          custom_field_value: true,
        };

        return action;
      }
      const action = {
        type: 'stop',
        title: '🔞 You can\'t sell alcohol to someone underage.',
        message: 'This customer is younger than 18.',
        dismiss_label: 'Got It',
      };

      return action;
    }

    const ddmmyy = `${over18Date.getDate()}/${over18Date.getMonth() + 1}/${over18Date.getFullYear()}`;

    const action = {
      type: 'require_custom_field',
      title: '🔞 Please check the customer\'s ID.',
      message: `The customer needs to be 18 years or older. \nBirthday before: ${ddmmyy}`,
      entity: 'sale',
      custom_field_name: 'verified',
    };

    return action;
  }

  return null;
}

export function requireCustomerAction(lineItem, ctx) {
  const { customer } = ctx;

  if (customer.id.length <= 0) {
    const action = {
      type: 'confirm',
      title: 'Please add a customer.',
      message: 'You should add a customer to this sale, and ask for their email address.',
      dismiss_label: 'Back',
      confirm_label: 'Pay',
    };

    return action;
  }

  return null;
}

export function itemReturn(lineItem, ctx) {
  const CUSTOM_FIELD_NAME = 'return-reason';
  const returnReason = getValueForCustomField(lineItem.custom_fields, CUSTOM_FIELD_NAME);

  if (!returnReason) {
    const action = {
      type: 'require_custom_field',
      title: '↪️ Why is this item being returned?',
      message: 'Please choose a reason for this return:',
      entity: 'line_item',
      entity_id: lineItem.id,
      custom_field_name: CUSTOM_FIELD_NAME,
      custom_field_values: [
        {
          value: 'damaged',
          title: 'Damaged',
        },
        {
          value: 'wrong-size',
          title: 'Wrong size',
        },
        {
          value: 'other',
          title: 'Other',
        },
      ],
    };
    return action;
  }

  console.log(returnReason);

  if (returnReason === 'other') {
    const clearReason = {
      type: 'set_custom_field',
      entity: 'line_item',
      entity_id: lineItem.id,
      custom_field_name: CUSTOM_FIELD_NAME,
      custom_field_value: '',
    };
    const action = {
      type: 'require_custom_field',
      title: '↪️ Why is this item being returned?',
      message: 'Please enter a reason for this return:',
      entity: 'line_item',
      entity_id: lineItem.id,
      custom_field_name: CUSTOM_FIELD_NAME,
    };

    return [clearReason, action];
  }

  return null;
}

export function tourTimeAction(lineItem, ctx) {
  const CUSTOM_FIELD_NAME = 'tour-datetime';
  const tour_datetime = getValueForCustomField(lineItem.custom_fields, CUSTOM_FIELD_NAME);

  if (!tour_datetime) {
    const now = new Date();

    const action = {
      type: 'require_custom_field',
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

export function redeemReward(lineItem, ctx) {
  const CUSTOM_FIELD_NAME = 'reward';
  const rewardId = getValueForCustomField(ctx.sale.custom_fields, CUSTOM_FIELD_NAME);

  if (!rewardId) {
    const action = {
      type: 'require_custom_field',
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
      type: 'add_line_item',
      product_sku: 'reward',
    };

    return action;
  }

  return null;
}
