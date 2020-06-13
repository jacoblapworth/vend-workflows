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

export default getCustomFields
