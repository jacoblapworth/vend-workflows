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

export default createCustomField
