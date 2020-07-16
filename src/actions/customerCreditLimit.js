import { WORKFLOW_ACTIONS } from '../constants'
import { getValueForCustomField } from '../utils/customFields'
import { redis } from '../services/redis'
import axios from 'axios'

export default async function action(lineItem, ctx) {
  const { domain_prefix } = ctx.retailer
  const saleCustomer = ctx.customer

  if (!saleCustomer.id) return

  const token = await redis.hgetall(`retailer:${domain_prefix}`)

  if (!token) return

  const { access_token, expires, expires_in, refresh_token, expires_at } = token

  const vendApi = axios.create({
    baseURL: `https://${domain_prefix}.vendhq.com/api`,
    headers: { Authorization: 'Bearer ' + access_token },
  })

  const customer = await vendApi
    .get(`/2.0/customers/${customer.id}`)
    .then((res) => {
      return res.data.data
    })
    .catch(console.error)

  console.log(customer)

  const action = {
    type: WORKFLOW_ACTIONS.CONFIRM,
    title: 'Maximum account balance exceeded',
    message: `${customer.first_name}'s balance is ${customer.balance}.`,
  }

  if (customer.balance > 0) {
    return action
  }

  return null
}
