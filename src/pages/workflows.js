import Section from '../components/Section'

import {
  Button,
  Tab,
  Tabs,
  TabContent,
  SelectedTabProvider,
  ActionBar,
} from '../components/SharedReact'

function Workflows() {
  return (
    <>
      <SelectedTabProvider defaultTab="businessRules">
        <Section>
          <h1 className="vd-header vd-header--page">Workflows</h1>
        </Section>
        <Section className="vd-pb0 vd-pt0">
          <Tabs modifier="large no-border" className="vd-mt3">
            <Tab name="businessRules">Business Rules</Tab>
            <Tab name="customFields">Custom Fields</Tab>
          </Tabs>
        </Section>
        <ActionBar>
          Test
          <Button>Test</Button>
        </ActionBar>
        <Section>
          <TabContent name="businessRules"></TabContent>
          <TabContent name="customFields"></TabContent>
        </Section>
      </SelectedTabProvider>
    </>
  )
}

export default Workflows
