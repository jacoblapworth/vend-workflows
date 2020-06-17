import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GraphQLClient } from 'graphql-request'
import useSWR from 'swr'

import { getProduct } from '../../graphql/queries/Products'
import { getProductCustomFields } from '../../graphql/queries/CustomFields'
import { Badge, Dialog, Button, LoaderSpinner } from '../SharedReact'
import { Switch } from '../Switch'
import { InputField } from '../InputField'
import { Select } from '../Select'
import { Label } from '../Label'

export default function EditCustomFields(props) {
  const { product, onClose } = props
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, errors, setError } = useForm()

  const API = '/api/vend/graphql'
  const graphQLClient = new GraphQLClient(API)

  const fetcher = (query) => graphQLClient.request(query)
  const { data: customFields } = useSWR(getProductCustomFields, fetcher)

  const idFetcher = (query, id) => {
    const variables = {
      id: id,
    }
    return graphQLClient.request(query, variables)
  }
  const { data: customFieldValues } = useSWR(
    [getProduct, product.id],
    idFetcher
  )

  const Fields = () => {
    if (!customFields) return <LoaderSpinner />
    return customFields.customFields.map((customField) => {
      switch (customField.type) {
        case 'STRING':
          return (
            <InputField name={customField.name} label={customField.title} />
          )
        case 'INTEGER':
          return (
            <InputField
              name={customField.name}
              label={customField.title}
              type="number"
            />
          )
        case 'BOOLEAN':
          return

        default:
          return <></>
      }
    })
  }

  return (
    <Dialog
      dismissible={true}
      header={'Edit Custom Fields.'}
      content={
        <>
          <Badge
            header={product.name}
            description={product.sku}
            image={product.imageThumbnailURL}
            size="medium"
          />
          <form onSubmit={handleSubmit()}>
            <Fields></Fields>
            <InputField
              name="title"
              label="Title"
              placeholder="Enter a title"
              innerRef={register({ required: 'Please enter a title.' })}
              errors={errors}
            />
            <div className="vd-field">
              <Switch name="visibleInUI" ref={register} />
              <Label className="vd-ml2" name="visibleInUI">
                Visible in UI
              </Label>
            </div>
          </form>
        </>
      }
      actions={
        <div className="vd-btn-group">
          <Button onClick={onClose} variant="supplementary">
            Cancel
          </Button>
          <Button onClick={handleSubmit()} loading={isLoading}>
            Add
          </Button>
        </div>
      }
      onClose={onClose}
      size={'medium'}
    />
  )
}
