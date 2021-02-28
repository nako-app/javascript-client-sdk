import fetch from 'cross-fetch'
import { ApolloClient, createHttpLink, gql } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import { ActivityList, Filters } from './types'

interface NakoClientOptions {
  apiKey?: string
  token?: string
}

export class NakoClient {
  static client

  static init(options: NakoClientOptions) {
    if (!options || (!options.apiKey && !options.token)) {
      throw new Error('Nako must be initialized with an API Key or a token.')
    }

    const httpLink = createHttpLink({
      uri: 'https://api.nako.co/v1/graphql',
      fetch
    })

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: NakoClient.getAuthorizationHeader(options)
        }
      }
    })

    NakoClient.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
      queryDeduplication: false
    })

    return new NakoClient()
  }

  async getActivities(filters?: Filters): Promise<ActivityList> {
    const page = filters?.pagination?.page || 0
    const limit = filters?.pagination?.limit || 10

    const result = await NakoClient.client.query({
      query: gql`
        query {
          activities(page: ${page}, limit: ${limit}, sort: {
            direction: ${filters?.sort?.direction || 'desc'}
          }) {
            items {
              id
              happened_at
              metadata
              operation
              actors {
                id
                first_name
                last_name
              }
            }
            total
          }
        }
      `
    })

    return {
      items: result.data.activities.items.map(r => {
        return {
          createdAt: r.created_at,
          happenedAt: r.happened_at,
          id: r.id,
          metadata: r.metadata,
          operation: r.operation,
          resources: r.resources,
          actors: r.actors.map(a => {
            return {
              id: a.id,
              type: a.type,
              firstName: a.first_name,
              lastName: a.last_name,
              isPrimary: a.is_primary
            }
          }),
          result: r.result,
          state: r.state
        }
      }),
      total: result.total
    }
  }

  private static getAuthorizationHeader(options: NakoClientOptions): string {
    return <string>(options.apiKey || options.token)
  }
}
