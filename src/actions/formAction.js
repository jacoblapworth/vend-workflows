import { WORKFLOW_ACTIONS } from '../constants'
import { getValueForCustomField } from '../utils/customFields'

export function formAction(lineItem) {
  const CUSTOM_FIELD_NAMES = [
    'demo_mechanic',
    'demo_authorised',
    'demo_required_date',
  ]

  let MECHANIC = null
  try {
    MECHANIC = getValueForCustomField(
      lineItem.custom_fields,
      CUSTOM_FIELD_NAMES[0]
    )
  } catch (error) {
    console.warn(error)
  }

  const required_custom_fields = CUSTOM_FIELD_NAMES.map((name) => {
    return { name: name }
  })

  const action = {
    type: WORKFLOW_ACTIONS.REQUIRE_CUSTOM_FIELDS,
    title: 'Enter repair job details.',
    message: 'Please enter the job details for this repair:',
    entity: 'line_item',
    entity_id: lineItem.id,
    required_custom_fields,
  }

  if (!MECHANIC) {
    return action
  }

  return null
}
