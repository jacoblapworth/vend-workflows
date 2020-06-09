export function getValueForCustomField(customFields, customFieldName) {
  console.log('Custom fields:', customFields);

  if (!customFields) {
    throw new Error(`No custom fields.`)
  }

  const customField = customFields.find((custom_field) => custom_field.name == customFieldName);

  if (!customField) {
    throw new Error(`No custom field with name: "${customFieldName}".`)
  }

  let value = null

  if (customField.value) {
    value = customField.value;
  }

  if (customField.string_value) {
    value = customField.string_value;
  }

  if (customField.boolean_value) {
    value = customField.boolean_value;
  }

  return value;
}

export default getValueForCustomField