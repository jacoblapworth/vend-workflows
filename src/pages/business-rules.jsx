import useSWR from 'swr'
import axios from 'axios'
import { format, formatDistance } from 'date-fns'

import Section from '../components/Section'
import { LoaderSpinner } from '../components/SharedReact'

function BusinessRules() {
  const fetcher = (query) => axios.get(query)

  const { data, error } = useSWR('api/vend/2.0/workflows/remote_rules', fetcher)
  if (!data) return <LoaderSpinner />

  const remoteRules = data.data.data.map((rule) => {
    const date = new Date(rule.created_at)
    return (
      <tr key={rule.id}>
        <td>{rule.url}</td>
        <td>
          <pre>{rule.id}</pre>
        </td>
        <td>
          <p className="vd-mb1">{format(date, 'PPpp')}</p>
          <p className="vd-mt0">({formatDistance(date, new Date())} ago)</p>
        </td>
      </tr>
    )
  })

  return (
    <>
      <Section>
        <h1 className="vd-header vd-header--page">Business Rules</h1>
      </Section>
      <section className="vd-section vd-section--secondary">
        <div className="vd-section-wrap">
          <div className="vd-flex vd-flex--justify-between vd-flex--align-center">
            <div>Save extra metadata on items in Vend with Custom Fields.</div>
          </div>
        </div>
      </section>
      <Section>
        {error}
        <table className="p-table p-table--no-wrap vd-table">
          <thead>
            <tr>
              <th>Rule URL</th>
              <th>ID</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>{remoteRules}</tbody>
        </table>
      </Section>
    </>
  )
}

export default BusinessRules
