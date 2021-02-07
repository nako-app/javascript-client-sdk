export interface Pagination {
  limit: Number
  page: Number
}

export interface Filters {
  pagination?: Pagination
}

type ActivityType = 'user ' | 'system'

type ActivityResultStatus = 'error' | 'success'

type ActivityStateStatus = 'scheduled' | 'in_progress' | 'completed'

export interface ActivityActor {
  type?: ActivityType
  id: String
  firstName: String
  lastName: String
  isPrimary: boolean
}

export interface ActivityResource {
  id: String
  name?: String
}

export interface ActivityResult {
  status: ActivityResultStatus
  details?: Map<String, Object>
}

export interface ActivityState {
  status: ActivityStateStatus
  details?: Map<String, Object>
}

export interface Activity {
  createdAt: Date
  happenedAt: Date
  id: String
  metadata?: Map<String, Object>
  operation: String
  resources: ActivityResource[]
  actors: ActivityActor[]
  result?: ActivityResult
  state?: ActivityState
}

export interface ActivityList {
  items: Activity[]
  total: Number
}
