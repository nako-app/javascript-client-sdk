export interface Pagination {
  limit: Number
  page: Number
}

export interface Sort {
  direction?: 'asc' | 'desc'
}

export interface Filters {
  pagination?: Pagination
  sort?: Sort
}

export enum ActivityActorType {
  System = 'system',
  User = 'user'
}

export enum ActivityResultStatus {
  Error = 'error',
  Success = 'success'
}

export enum ActivityStateStatus {
  Scheduled = 'scheduled',
  InProgress = 'in_progress',
  Completed = 'completed'
}

export interface ActivityActor {
  type?: ActivityActorType
  id: String
  firstName: String
  lastName: String
  isPrimary: boolean
}

export interface ActivityResource {
  id: String
  name?: String
  type?: String
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
