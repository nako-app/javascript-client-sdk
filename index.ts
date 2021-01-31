import { ActivityList, Filters } from './types'

export class NakoClient {
  static apiKey

  // TODO api keys only work for the all-public flow
  // Add support to token generation flow
  static init(apiKey: String) {
    NakoClient.apiKey = apiKey
    return new NakoClient()
  }

  async getActivities(filters?: Filters): Promise<ActivityList> {
    const url = new URL('https://api.nako.co/v1/activities')

    if (filters) {
      const params = {}
      if (filters.pagination) {
        params['page'] = filters.pagination.page || 0
        params['limit'] = filters.pagination.limit || 10
      }

      url.search = new URLSearchParams(params).toString()
    }

    const response = await fetch(url.toString(), {
      headers: {
        'x-api-key': NakoClient.apiKey
      }
    })

    // TODO - handle errors
    const result = await response.json()

    return {
      items: result.items.map(r => {
        return {
          createdAt: r.created_at,
          happenedAt: r.happened_at,
          id: r.id,
          operation: r.operation,
          resource: r.resource,
          actor: {
            id: r.actor.id,
            type: r.actor.type,
            firstName: r.actor.first_name,
            lastName: r.actor.last_name
          },
          result: r.result
        }
      }),
      total: result.total
    }
  }
}
