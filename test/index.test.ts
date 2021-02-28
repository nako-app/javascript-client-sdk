import { NakoClient } from '../index'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Activity, ActivityResultStatus, ActivityStateStatus } from '../types'

describe('SDK functional tests', () => {
  it('Can retrieve activities without filters', async () => {
    const sdk = NakoClient.init({
      apiKey: process.env['NAKO_API_KEY'] ?? ''
    })

    const response = await sdk.getActivities()

    expect(response).to.be.not.undefined
  })
})
