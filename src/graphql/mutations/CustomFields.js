import { gql } from '@apollo/client'

export const createCustomField = /* GraphQL */ `
  mutation createCustomField(
    $entity: CustomFieldEntity!
    $name: String!
    $title: String!
    $type: CustomFieldType!
    $visibleInUI: Boolean!
  ) {
    createCustomField(
      entity: $entity
      name: $name
      title: $title
      type: $type
      visibleInUI: $visibleInUI
    ) {
      id
    }
  }
`

export const SET_CUSTOM_FIELD_VALUES = gql`
  mutation setCustomFieldValues(
    $entity: CustomFieldEntity!
    $entityId: ID!
    $values: [CustomFieldValueInput!]!
  ) {
    setCustomFieldValues(
      entity: $entity
      entityId: $entityId
      values: $values
    ) {
      name
      title
      ... on IntegerCustomFieldValue {
        integerValue
      }
      ... on StringCustomFieldValue {
        stringValue
      }
      ... on BooleanCustomFieldValue {
        booleanValue
      }
    }
  }
`

export default createCustomField
