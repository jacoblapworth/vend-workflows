import axios from 'axios'
import Section from '../components/Layout/Section'
import { Card } from '../components/Card'
import { Button } from '../components/SharedReact'
import withAuthentication from '../components/WithAuthentication'

const Setup = () => {
  const appUrl = process.env.URL || 'https://workflows.now.sh'
  async function setupWorkflows() {
    try {
      let remoteRule = await axios
        .get('api/vend/2.0/workflows/remote_rules')
        .then((res) => {
          return res.data.find((remote) => remote.url == appUrl + '/api')
        })

      if (!remoteRule) {
        remoteRule = await axios
          .post('api/vend/2.0/workflows/remote_rules', {
            url: appUrl + '/api',
          })
          .then((res) => res.data)
      }

      let rules = await axios
        .get('api/vend/2.0/workflows/rules')
        .then((res) => {
          return res.data.find((rule) => rule.remote_rule_id == remoteRule.id)
        })

      if (!rules) {
        rules = await axios
          .post('api/vend/2.0/workflows/rules', {
            event_type: 'sale.ready_for_payment',
            remote_rule_id: remoteRule.id,
          })
          .then((res) => res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Section>
        <h1 className="vd-header vd-header--page">Setup</h1>
      </Section>
      <Section>
        <Button onClick={setupWorkflows}>Set up Workflows</Button>
        <div className="vd-flex vd-flex--column">
          <Card>
            <div className="vd-ma5">
              <div className="vd-text-sub-heading">
                Create a remote business rule
              </div>
            </div>
          </Card>
          <Card>
            <div className="vd-ma5">
              <div className="vd-text-sub-heading">Create a business rule</div>
            </div>
          </Card>
          <Card>
            <div className="vd-ma5">
              <div className="vd-text-sub-heading">Set up business rule</div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  )
}

export default withAuthentication(Setup)
