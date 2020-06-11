import Page from '../components/Page'
import useSWR from 'swr'
import axios from 'axios'

function BusinessRules() {

  const fetcher = query => axios.get(query)

  const { data, error } = useSWR('api/vend/2.0/workflows/remote_rules', fetcher)
  if (!data) return 'loading...'

  const remoteRules = data.data.map(rule => {
    const date = new Date(rule.created_at)
    return (
      <div>
        <div>
          {rule.url}
        </div>
        <pre>{rule.id}</pre>
        {date.toString()}
      </div>
    )
  });

  return (
    <Page>
      <h1 className='vd-header vd-header--page'>Business Rules</h1>
      {error}
      {remoteRules}
    </Page >
  )
}

export default BusinessRules
