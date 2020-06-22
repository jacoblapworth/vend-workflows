import React, { useState } from 'react'
import useSWR from 'swr'
import { GraphQLClient } from 'graphql-request'

import withAuthentication from '../components/WithAuthentication'
import { getCustomFields } from '../graphql/queries/CustomFields'
import AddCustomField from '../components/CustomFields/AddCustomField'

import { ErrorMessage } from '../components/ErrorMessage'

import {
  Tab,
  Tabs,
  TabContent,
  SelectedTabProvider,
  LoaderSpinner,
} from '../components/SharedReact'

const CustomFields = () => {
  const [modal, setModal] = useState(false)
  const API = '/api/vend/graphql'
  const graphQLClient = new GraphQLClient(API)
  const fetcher = (query) => graphQLClient.request(query)
  const { data, error } = useSWR(getCustomFields, fetcher)

  function openModal() {
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }

  function Rows(props) {
    const { customFields } = props
    return customFields.map((lineItemField) => {
      const { name, title, type, visibleInUI } = lineItemField

      return (
        <tr key={name} className="vd-expandable">
          <td>{title}</td>
          <td>
            <pre>{name}</pre>
          </td>
          <td>
            <pre>{type}</pre>
          </td>
          <td>
            <pre>
              {visibleInUI && (
                <span
                  vd-icon="fa-check"
                  className="vd-pl1 fa-fw fa fa-check"
                ></span>
              )}
            </pre>
          </td>
        </tr>
      )
    })
  }

  const TabContents = () => {
    if (error)
      return (
        <tr>
          <td colSpan="4">
            <ErrorMessage>Failed to load. {error}</ErrorMessage>
          </td>
        </tr>
      )
    if (!data)
      return (
        <tr>
          <td colSpan="4">
            <LoaderSpinner />
          </td>
        </tr>
      )
    return (
      <>
        <TabContent name="productFields">
          <Rows customFields={data.productFields} />
        </TabContent>
        <TabContent name="customerFields">
          <Rows customFields={data.customerFields} />
        </TabContent>
        <TabContent name="saleFields">
          <Rows customFields={data.saleFields} />
        </TabContent>
        <TabContent name="lineItemFields">
          <Rows customFields={data.lineItemFields} />
        </TabContent>
      </>
    )
  }

  return (
    <>
      <SelectedTabProvider defaultTab="productFields">
        <section className="vd-section">
          <div className="vd-section-wrap">
            <h1 className="vd-header vd-header--page">Custom Fields</h1>
          </div>
        </section>
        {modal && <AddCustomField onClose={closeModal} />}
        <section className="vd-section vd-pb0 vd-pt0">
          <div className="vd-section-wrap">
            <Tabs modifier="large no-border" className="vd-mt3">
              <Tab name="productFields">Products</Tab>
              <Tab name="customerFields">Customers</Tab>
              <Tab name="saleFields">Sales</Tab>
              <Tab name="lineItemFields">Line Items</Tab>
            </Tabs>
          </div>
        </section>

        <section className="vd-section vd-section--secondary">
          <div className="vd-section-wrap">
            <div className="vd-flex vd-flex--justify-between vd-flex--align-center">
              <div>
                Save extra metadata on items in Vend with Custom Fields.
              </div>
              <button className="vd-btn vd-btn--do" onClick={openModal}>
                Add Field
              </button>
            </div>
          </div>
        </section>

        <section className="vd-section">
          <div className="vd-section-wrap">
            <table className="p-table p-table--no-wrap vd-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Visible</th>
                </tr>
              </thead>
              <tbody>
                <TabContents />
              </tbody>
            </table>
          </div>
        </section>
      </SelectedTabProvider>
    </>
  )
}

export default withAuthentication(CustomFields)
