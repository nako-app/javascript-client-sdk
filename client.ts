import fetch from 'cross-fetch'
import _ from 'lodash'
import { ApolloClient, createHttpLink, gql } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import { Activity, QueryActivitiesArgs } from './api'
import { ActivityList } from './types'

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

  async getActivities(args?: QueryActivitiesArgs): Promise<ActivityList> {
    const params = args
      ? `(${JSON.stringify(args)
          .replace('{', '')
          .replace('}', '')
          .replace(/"([^"]+)":/g, '$1:')
          .replace(/"asc"/g, 'asc')
          .replace(/"desc"/g, 'desc')})`
      : ''

    const result = await NakoClient.client.query({
      query: gql`
        query {
          activities${params} {
            items {
              id
              created_at
              happened_at
              metadata
              operation
              actors {
                id
                first_name
                last_name
                type
              }
              resources {
                id
                name
                type
              }
              result {
                status
                details
              }
              state {
                status
                details
              }
            }
            total
          }
        }
      `
    })

    return {
      items: result.data.activities.items.map(r => {
        const result = _.mapKeys(r, (v, k) => _.camelCase(k))
        delete result.typename
        return result
      }),
      total: result.data.activities.total
    }
  }

  private static getAuthorizationHeader(options: NakoClientOptions): string {
    return <string>(options.apiKey || options.token)
  }
}
