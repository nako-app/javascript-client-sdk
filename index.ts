import { ActivityList, Filters } from './types'

interface NakoClientOptions {
  apiKey?: string
  token?: string
}

export class NakoClient {
  static options: NakoClientOptions

  static init(options: NakoClientOptions) {
    if (!options || (!options.apiKey && !options.token)) {
      throw new Error('Nako must be initialized with an API Key or a token.')
    }

    NakoClient.options = options
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
        'authorization': this.getAuthorizationHeader()
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
          metadata: r.metadata,
          operation: r.operation,
          resources: r.resources,
          actors: r.actors.map(a => { return {
            id: a.id,
            type: a.type,
            firstName: a.first_name,
            lastName: a.last_name,
            isPrimary: a.is_primary
          }}),
          result: r.result,
          state: r.state
        }
      }),
      total: result.total
    }
  }

  private getAuthorizationHeader(): string {
    return <string> (NakoClient.options.apiKey || NakoClient.options.token)
  }
}
