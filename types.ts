export interface Pagination {
  limit: Number
  page: Number
}

export interface Filters {
  pagination?: Pagination
}

type ActivityType = 'user ' | 'system'

export interface ActivityActor {
  type?: ActivityType
  id: String
  firstName: String
  lastName: String
}

export interface ActivityResource {
  id: String
  name?: String
}

export interface Activity {
  createdAt: Date
  happenedAt: Date
  operation: String
  resource: ActivityResource
  actor: ActivityActor
}

export interface ActivityList {
  items: Activity[]
  total: Number
}
