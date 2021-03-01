import { expect } from 'chai'
import { describe, it } from 'mocha'
import { NakoClient } from '../index'
import { SortDirection } from '../api'

describe('SDK functional tests', () => {
  it('can retrieve activities without filters', async () => {
    const sdk = NakoClient.init({
      apiKey: process.env['NAKO_API_KEY'] ?? ''
    })

    const response = await sdk.getActivities()

    validateResponse(response)
  })

  it('can retrieve activities with pagination', async () => {
    const sdk = NakoClient.init({
      apiKey: process.env['NAKO_API_KEY'] ?? ''
    })

    const response = await sdk.getActivities({
      page: 0,
      limit: 10
    })

    validateResponse(response)
  })

  it('can retrieve activities with sort', async () => {
    const sdk = NakoClient.init({
      apiKey: process.env['NAKO_API_KEY'] ?? ''
    })

    const response = await sdk.getActivities({
      sort: {
        direction: SortDirection.Asc
      }
    })

    validateResponse(response)
  })

  it('can retrieve activities with filters', async () => {
    const sdk = NakoClient.init({
      apiKey: process.env['NAKO_API_KEY'] ?? ''
    })

    const response = await sdk.getActivities({
      filters: {
        operation: 'create'
      }
    })

    validateResponse(response)
  })

  const validateResponse = response => {
    expect(response).to.be.not.undefined
    expect(response.items).to.be.not.empty
    expect(response.total > 0).to.be.true

    response.items.forEach(item => {
      expect(item.id).to.not.be.undefined
      expect(item.createdAt).to.not.be.undefined
      expect(item.happenedAt).to.not.be.undefined
      expect(item.operation).to.not.be.undefined
      expect(item.result.status).to.not.be.undefined
      expect(item.state.status).to.not.be.undefined
    })
  }
})
