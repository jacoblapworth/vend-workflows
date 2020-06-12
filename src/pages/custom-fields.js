import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import cookies from 'next-cookies'
import Link from 'next/link'
import useSWR from 'swr'
import { GraphQLClient } from 'graphql-request'

import AddCustomField from "../components/customFields/addCustomField";

const Tab = dynamic(() => import('@vendhq/shared-react')
  .then((module) => module.Tab), { ssr: false }
)
const Tabs = dynamic(() => import('@vendhq/shared-react')
  .then((module) => module.Tabs), { ssr: false }
)
const TabContent = dynamic(() => import('@vendhq/shared-react')
  .then((module) => module.TabContent), { ssr: false }
)
const SelectedTabProvider = dynamic(() => import('@vendhq/shared-react')
  .then((module) => module.SelectedTabProvider), { ssr: false }
)

// import { Tab, Tabs, TabContent, SelectedTabProvider } from "@vendhq/shared-react";
import { Spinner } from '../components/Spinner'

const CustomFields = props => {
  const [modal, setModal] = useState(false)

  function openModal(e) {
    setModal(true)
  }

  function closeModal(e) {
    setModal(false)
  }

  const { token } = props.cookies

  const API = '/api/vend/graphql'

  const graphQLClient = new GraphQLClient(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const query = /* GraphQL */ `{
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
  }`

  const fetcher = query => graphQLClient.request(query)

  const { data, error } = useSWR(query, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <Spinner />

  function Rows(props) {
    const { customFields } = props
    return customFields.map((lineItemField) => {
      const { name, title, type, visibleInUI } = lineItemField

      return <tr key={name}>
        <td>
          {title}
        </td>
        <td>
          <pre>{type}</pre>
        </td>
        <td>
          <pre>{visibleInUI ? <span vd-icon="fa-check" className="vd-pl1 fa-fw fa fa-check"></span> : ''}</pre>
        </td>
      </tr>
    })
  }

  return (
    <>
      <SelectedTabProvider defaultTab="productFields">
        <section className="vd-section">
          <div className="vd-section-wrap">
            <h1 className="vd-header vd-header--page">Custom Fields</h1>
          </div>
        </section>
        {modal && (<AddCustomField onClose={closeModal} />)}
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
              <button className='vd-btn vd-btn--do' onClick={openModal}>Add Field</button>
            </div>
          </div>
        </section>

        <section className="vd-section">
          <div className="vd-section-wrap">
            <table className="p-table p-table--no-wrap vd-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Visible</th>
                </tr>
              </thead>
              <tbody>
                <TabContent name="productFields"><Rows customFields={data.productFields} /></TabContent>
                <TabContent name="customerFields"><Rows customFields={data.customerFields} /></TabContent>
                <TabContent name="saleFields"><Rows customFields={data.saleFields} /></TabContent>
                <TabContent name="lineItemFields"><Rows customFields={data.lineItemFields} /></TabContent>
              </tbody>
            </table>
          </div>

        </section>
      </SelectedTabProvider>

    </>
  )
}

CustomFields.getInitialProps = (ctx) => {
  return {
    cookies: cookies(ctx)
  }
}

export default CustomFields;
