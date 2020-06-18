import { gql } from '@apollo/client'

export const getCustomFields = /* GraphQL */ `
  {
    lineItemFields: customFields(entity: LINE_ITEM) {
      name
      title
      type
      visibleInUI
    }
    saleFields: customFields(entity: SALE) {
      name
      title
      type
      visibleInUI
    }
    productFields: customFields(entity: PRODUCT) {
      name
      title
      type
      visibleInUI
    }
    customerFields: customFields(entity: CUSTOMER) {
      name
      title
      type
      visibleInUI
    }
  }
`

export const getProductCustomFields = /* GraphQL */ `
  {
    customFields(entity: PRODUCT) {
      name
      title
      type
      visibleInUI
    }
  }
`

export const GET_PRODUCT_CUSTOM_FIELD_VALUES = gql`
  query getProductCustomFieldValues($productId: ID!) {
    customFields(entity: PRODUCT) {
      name
      title
      type
      visibleInUI
    }
    product(id: $productId) {
      name
      id
      sku
      customFields {
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
  }
`

export const setCustomFieldValues = /* GraphQL */ `
mutation setCustomFieldValues(
  $entity: CustomFieldEntity!
      $entityId: ID!
      $values: [CustomFieldValueInput!]!
){
  setCustomFieldValues(
    entity: $entity
      entityId: $entityId
      values: $values
  ){
    name
    title
      ...on IntegerCustomFieldValue {
      integerValue
    }
      ...on StringCustomFieldValue {
      stringValue
    }
      ...on BooleanCustomFieldValue {
      booleanValue
    }
  })
  `

export default getCustomFields
