import * as Events from '../../events'

async function workflow(event) {
  console.log('Event:', event)

  const events = {
    'sale.ready_for_payment': Events.readyForPayment,
    'sale.line_items.added': Events.respondToLineItems,
    'sale.line_items.removed': null,
    'sale.customer.added': null,
    'sale.created': null,
  }

  if (typeof events[event.event_type] === 'undefined') {
    return null
  }

  return events[event.event_type](event)
}

export default async (req, res) => {
  if (req.body == null) {
    return res.status(400).send({ error: 'No payload body.' })
  }

  try {
    await workflow(req.body).then((actions) => {
      console.log('Response:', actions)
      res.status(200).send(actions)
    })
  } catch (error) {
    return res.status(400).json({ error: 'Workflow failed.' })
  }
}
