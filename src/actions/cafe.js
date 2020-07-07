import { WORKFLOW_ACTIONS } from '../constants'
import { getValueForCustomField } from '../utils/customFields'

export function cafeOrder(lineItem) {
  // const CUSTOM_FIELD_NAMES = [
  //   'demo_flavour',
  //   'demo_size',
  //   'demo_ice',
  //   'demo_toppings',
  //   'demo_milk',
  // ]

  const TOPPINGS = {
    REGULAR_CARAMEL_DRIZZLE: 'Regular Caramel Drizzle',
    REGULAR_WHIPPED_CREAM: 'Regular Whipped Cream',
    REGULAR_CARAMEL_CRUNCH_TOPPING: 'Regular Caramel Crunch Topping',
  }

  const required_custom_fields = (object) =>
    Object.entries(object).map((name) => {
      return { name: name }
    })

  const toppingsAction = {
    type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELDS,
    title: 'Choose your toppings.',
    message: 'Choose some toppings for this drink:',
    entity: 'line_item',
    entity_id: lineItem.id,
    required_custom_fields: required_custom_fields(TOPPINGS),
  }

  const milkAction = {
    type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELDS,
    title: 'Choose your milk',
    message: 'Choose a milk for your drink:',
    entity: 'line_item',
    entity_id: lineItem.id,
    required_custom_fields: [
      {
        name: 'demo_MILK',
        values: [
          {
            value: 'WHOLE_MILK',
            title: 'Whole Milk',
          },
          {
            value: 'ALMOND_MILK',
            title: 'Almond',
          },
          {
            value: '1_PERCENT_MILK',
            title: '1% Milk',
          },
          {
            value: 'BREVE_MILK',
            title: 'Breve (Hald & Half)',
          },
          {
            value: 'COCONUT_MILK',
            title: 'Coconut',
          },
          {
            value: 'SOY_MILK',
            title: 'Soy',
          },
        ],
      },
      {
        name: 'demo_ICE',
        values: [
          {
            value: 'NO_ICE',
            title: 'No ice',
          },
          {
            value: 'LIGHT_ICE',
            title: 'Light',
          },
          {
            value: 'EXTRA_ICE',
            title: 'Extra',
          },
        ],
      },
    ],
  }

  const sizeAction = {
    type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELDS,
    title: 'Choose your size',
    message: 'Choose a size for your drink:',
    entity: 'line_item',
    entity_id: lineItem.id,
    required_custom_fields: [
      {
        name: 'demo_SIZE',
        values: [
          {
            value: 'TALL',
            title: 'Tall',
          },
          {
            value: 'GRANDE',
            title: 'Grande',
          },
          {
            value: 'VENTI',
            title: 'Venti',
          },
        ],
      },
    ],
  }

  let SIZE, REGULAR_CARAMEL_DRIZZLE, MILK
  try {
    SIZE = getValueForCustomField(lineItem.custom_fields, 'demo_SIZE')
    REGULAR_CARAMEL_DRIZZLE = getValueForCustomField(
      lineItem.custom_fields,
      'demo_REGULAR_CARAMEL_DRIZZLE'
    )
    MILK = getValueForCustomField(lineItem.custom_fields, 'demo_MILK')
  } catch (error) {
    console.warn(error)
  }

  if (!SIZE) {
    return [sizeAction, toppingsAction, milkAction]
  }

  if (!REGULAR_CARAMEL_DRIZZLE) {
    return toppingsAction
  }

  if (!MILK) {
    return milkAction
  }

  return null
}
