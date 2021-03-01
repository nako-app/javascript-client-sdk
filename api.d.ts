export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type ActivityMetadataFilter = {
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type ActivityFilters = {
  actor_id?: Maybe<Scalars['String']>
  resource_id?: Maybe<Scalars['String']>
  operation?: Maybe<Scalars['String']>
  result?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  metadata?: Maybe<ActivityMetadataFilter>
}

export type ActivityActor = {
  __typename?: 'ActivityActor'
  id: Scalars['String']
  first_name?: Maybe<Scalars['String']>
  last_name?: Maybe<Scalars['String']>
  primary?: Maybe<Scalars['Boolean']>
  type: Scalars['String']
}

export type ActivityResource = {
  __typename?: 'ActivityResource'
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type ActivityResult = {
  __typename?: 'ActivityResult'
  status: Scalars['String']
  details?: Maybe<Scalars['JSONObject']>
}

export type ActivityState = {
  __typename?: 'ActivityState'
  status: Scalars['String']
  details?: Maybe<Scalars['JSONObject']>
}

export type Activity = {
  __typename?: 'Activity'
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  happened_at: Scalars['DateTime']
  operation: Scalars['String']
  metadata: Scalars['JSONObject']
  resources: Array<ActivityResource>
  actors: Array<ActivityActor>
  result: ActivityResult
  state: ActivityState
}

export type Activities = {
  __typename?: 'Activities'
  items: Array<Activity>
  page?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Int']>
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Sort = {
  direction?: Maybe<SortDirection>
}

export type Query = {
  __typename?: 'Query'
  activities: Activities
  activity: Activity
}

export type QueryActivitiesArgs = {
  filters?: Maybe<ActivityFilters>
  limit?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
  sort?: Maybe<Sort>
}

export type QueryActivityArgs = {
  id: Scalars['ID']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}
