import axios from 'axios'

const Setup = props => {
  const appUrl = process.env.URL || 'https://workflows.now.sh'
  async function setupWorkflows(e) {

    try {
      let remoteRule = await axios.get('api/vend/2.0/workflows/remote_rules')
        .then(res => {
          return res.data.find(remote => remote.url == appUrl + '/api')
        })

      if (!remoteRule) {
        remoteRule = await axios.post('api/vend/2.0/workflows/remote_rules', {
          "url": appUrl + '/api'
        })
          .then(res => res.data)
      }

      let rules = await axios.get('api/vend/2.0/workflows/rules')
        .then(res => {
          return res.data.find(rule => rule.remote_rule_id == remoteRule.id)
        })

      if (!rules) {
        rules = await axios.post('api/vend/2.0/workflows/rules', {
          event_type: 'sale.ready_for_payment',
          remote_rule_id: remoteRule.id
        })
          .then(res => res.data)
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='vd-section'>
        <h1>Setup</h1>

        <button className='vd-btn vd-btn--do' onClick={setupWorkflows}>
          Set up Workflows
        </button>
      </div>
    </>
  )
}

export default Setup