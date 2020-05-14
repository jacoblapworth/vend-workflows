export function getValueForCustomField(customFields, customFieldName) {
  console.log('Custom fields:', customFieldName, customFields);

  const customField = customFields.find((custom_field) => custom_field.name == customFieldName);

  if (!customField) {
    return null;
  }

  if (customField.value) {
    return customField.value;
  }

  if (customField.string_value) {
    return customField.string_value;
  }

  if (customField.boolean_value) {
    return customField.boolean_value;
  }

  return null;
}