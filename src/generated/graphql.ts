import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  Cursor: number;
  Date: string;
  Datetime: string;
  JSON: string;
  Time: string;
  UUID: string;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression comparing fields on type "JSON" */
export type JsonFilter = {
  eq?: InputMaybe<Scalars['JSON']>;
  neq?: InputMaybe<Scalars['JSON']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  /** Deletes zero or more records from the collection */
  deleteFromevent_schedulesCollection: Event_SchedulesDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromeventsCollection: EventsDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromgroupsCollection: GroupsDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFrommembersCollection: MembersDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromprofilesCollection: ProfilesDeleteResponse;
  /** Adds one or more `event_schedulesInsertResponse` records to the collection */
  insertIntoevent_schedulesCollection?: Maybe<Event_SchedulesInsertResponse>;
  /** Adds one or more `eventsInsertResponse` records to the collection */
  insertIntoeventsCollection?: Maybe<EventsInsertResponse>;
  /** Adds one or more `groupsInsertResponse` records to the collection */
  insertIntogroupsCollection?: Maybe<GroupsInsertResponse>;
  /** Adds one or more `membersInsertResponse` records to the collection */
  insertIntomembersCollection?: Maybe<MembersInsertResponse>;
  /** Adds one or more `profilesInsertResponse` records to the collection */
  insertIntoprofilesCollection?: Maybe<ProfilesInsertResponse>;
  /** Updates zero or more records in the collection */
  updateevent_schedulesCollection: Event_SchedulesUpdateResponse;
  /** Updates zero or more records in the collection */
  updateeventsCollection: EventsUpdateResponse;
  /** Updates zero or more records in the collection */
  updategroupsCollection: GroupsUpdateResponse;
  /** Updates zero or more records in the collection */
  updatemembersCollection: MembersUpdateResponse;
  /** Updates zero or more records in the collection */
  updateprofilesCollection: ProfilesUpdateResponse;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromevent_SchedulesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Event_SchedulesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromeventsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<EventsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromgroupsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<GroupsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrommembersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<MembersFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromprofilesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ProfilesFilter>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoevent_SchedulesCollectionArgs = {
  objects: Array<Event_SchedulesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoeventsCollectionArgs = {
  objects: Array<EventsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntogroupsCollectionArgs = {
  objects: Array<GroupsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntomembersCollectionArgs = {
  objects: Array<MembersInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoprofilesCollectionArgs = {
  objects: Array<ProfilesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationUpdateevent_SchedulesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Event_SchedulesFilter>;
  set: Event_SchedulesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateeventsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<EventsFilter>;
  set: EventsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdategroupsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<GroupsFilter>;
  set: GroupsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatemembersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<MembersFilter>;
  set: MembersUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateprofilesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ProfilesFilter>;
  set: ProfilesUpdateInput;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  AscNullsFirst = 'AscNullsFirst',
  AscNullsLast = 'AscNullsLast',
  DescNullsFirst = 'DescNullsFirst',
  DescNullsLast = 'DescNullsLast',
}

export type PageInfo = {
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** The root type for querying data */
export type Query = {
  /** A pagable collection of type `event_schedules` */
  event_schedulesCollection?: Maybe<Event_SchedulesConnection>;
  /** A pagable collection of type `events` */
  eventsCollection?: Maybe<EventsConnection>;
  /** A pagable collection of type `groups` */
  groupsCollection?: Maybe<GroupsConnection>;
  /** A pagable collection of type `members` */
  membersCollection?: Maybe<MembersConnection>;
  /** A pagable collection of type `profiles` */
  profilesCollection?: Maybe<ProfilesConnection>;
};

/** The root type for querying data */
export type QueryEvent_SchedulesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Event_SchedulesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Event_SchedulesOrderBy>>;
};

/** The root type for querying data */
export type QueryEventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<EventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};

/** The root type for querying data */
export type QueryGroupsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<GroupsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GroupsOrderBy>>;
};

/** The root type for querying data */
export type QueryMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ProfilesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type Event_Schedules = {
  end_date: Scalars['Datetime'];
  event_id?: Maybe<Scalars['Int']>;
  events?: Maybe<Events>;
  id: Scalars['Int'];
  start_date: Scalars['Datetime'];
};

export type Event_SchedulesConnection = {
  edges: Array<Event_SchedulesEdge>;
  pageInfo: PageInfo;
};

export type Event_SchedulesDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Schedules>;
};

export type Event_SchedulesEdge = {
  cursor: Scalars['String'];
  node?: Maybe<Event_Schedules>;
};

export type Event_SchedulesFilter = {
  end_date?: InputMaybe<DatetimeFilter>;
  event_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  start_date?: InputMaybe<DatetimeFilter>;
};

export type Event_SchedulesInsertInput = {
  end_date?: InputMaybe<Scalars['Datetime']>;
  event_id?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['Datetime']>;
};

export type Event_SchedulesInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Schedules>;
};

export type Event_SchedulesOrderBy = {
  end_date?: InputMaybe<OrderByDirection>;
  event_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  start_date?: InputMaybe<OrderByDirection>;
};

export type Event_SchedulesUpdateInput = {
  end_date?: InputMaybe<Scalars['Datetime']>;
  event_id?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['Datetime']>;
};

export type Event_SchedulesUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Schedules>;
};

export type Events = {
  event_schedulesCollection?: Maybe<Event_SchedulesConnection>;
  group_id?: Maybe<Scalars['Int']>;
  groups?: Maybe<Groups>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type EventsEvent_SchedulesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Event_SchedulesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Event_SchedulesOrderBy>>;
};

export type EventsConnection = {
  edges: Array<EventsEdge>;
  pageInfo: PageInfo;
};

export type EventsDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Events>;
};

export type EventsEdge = {
  cursor: Scalars['String'];
  node?: Maybe<Events>;
};

export type EventsFilter = {
  group_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

export type EventsInsertInput = {
  group_id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type EventsInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Events>;
};

export type EventsOrderBy = {
  group_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type EventsUpdateInput = {
  group_id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type EventsUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Events>;
};

export type Groups = {
  eventsCollection?: Maybe<EventsConnection>;
  id: Scalars['Int'];
  membersCollection?: Maybe<MembersConnection>;
  name: Scalars['String'];
  owner: Scalars['UUID'];
  profiles?: Maybe<Profiles>;
};

export type GroupsEventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<EventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};

export type GroupsMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

export type GroupsConnection = {
  edges: Array<GroupsEdge>;
  pageInfo: PageInfo;
};

export type GroupsDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Groups>;
};

export type GroupsEdge = {
  cursor: Scalars['String'];
  node?: Maybe<Groups>;
};

export type GroupsFilter = {
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  owner?: InputMaybe<UuidFilter>;
};

export type GroupsInsertInput = {
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['UUID']>;
};

export type GroupsInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Groups>;
};

export type GroupsOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  owner?: InputMaybe<OrderByDirection>;
};

export type GroupsUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['UUID']>;
};

export type GroupsUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Groups>;
};

export type Members = {
  group_id: Scalars['Int'];
  groups?: Maybe<Groups>;
  profiles?: Maybe<Profiles>;
  user_id: Scalars['UUID'];
};

export type MembersConnection = {
  edges: Array<MembersEdge>;
  pageInfo: PageInfo;
};

export type MembersDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type MembersEdge = {
  cursor: Scalars['String'];
  node?: Maybe<Members>;
};

export type MembersFilter = {
  group_id?: InputMaybe<IntFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type MembersInsertInput = {
  group_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['UUID']>;
};

export type MembersInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type MembersOrderBy = {
  group_id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type MembersUpdateInput = {
  group_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['UUID']>;
};

export type MembersUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type Profiles = {
  avatar_url?: Maybe<Scalars['String']>;
  groupsCollection?: Maybe<GroupsConnection>;
  id: Scalars['UUID'];
  membersCollection?: Maybe<MembersConnection>;
  nickname: Scalars['String'];
};

export type ProfilesGroupsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<GroupsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GroupsOrderBy>>;
};

export type ProfilesMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

export type ProfilesConnection = {
  edges: Array<ProfilesEdge>;
  pageInfo: PageInfo;
};

export type ProfilesDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesEdge = {
  cursor: Scalars['String'];
  node?: Maybe<Profiles>;
};

export type ProfilesFilter = {
  avatar_url?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nickname?: InputMaybe<StringFilter>;
};

export type ProfilesInsertInput = {
  avatar_url?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  nickname?: InputMaybe<Scalars['String']>;
};

export type ProfilesInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesOrderBy = {
  avatar_url?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  nickname?: InputMaybe<OrderByDirection>;
};

export type ProfilesUpdateInput = {
  avatar_url?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  nickname?: InputMaybe<Scalars['String']>;
};

export type ProfilesUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type FindGroupsQueryVariables = Exact<{
  userId: Scalars['UUID'];
}>;

export type FindGroupsQuery = {
  membersCollection?: {
    edges: Array<{
      node?: {
        groups?: {
          id: number;
          name: string;
          profiles?: {
            id: string;
            nickname: string;
            avatar_url?: string | null;
          } | null;
          membersCollection?: {
            edges: Array<{
              node?: {
                profiles?: {
                  id: string;
                  nickname: string;
                  avatar_url?: string | null;
                } | null;
              } | null;
            }>;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type AddGroupMutationVariables = Exact<{
  name: Scalars['String'];
  owner: Scalars['UUID'];
}>;

export type AddGroupMutation = {
  insertIntogroupsCollection?: { affectedCount: number } | null;
};

export type RemoveGroupMutationVariables = Exact<{
  groupId: Scalars['Int'];
  owner: Scalars['UUID'];
  atMost: Scalars['Int'];
}>;

export type RemoveGroupMutation = {
  deleteMembers: { affectedCount: number };
  deleteOwner: { affectedCount: number };
  deleteFromgroupsCollection: { affectedCount: number };
};

export type ChangeMembersMutationVariables = Exact<{
  groupId: Scalars['Int'];
  owner: Scalars['UUID'];
  members: Array<MembersInsertInput> | MembersInsertInput;
  atMost: Scalars['Int'];
}>;

export type ChangeMembersMutation = {
  deleteFrommembersCollection: { affectedCount: number };
  insertIntomembersCollection?: { affectedCount: number } | null;
};

export type ChangeMembersToOwnerOnlyMutationVariables = Exact<{
  groupId: Scalars['Int'];
  owner: Scalars['UUID'];
  atMost: Scalars['Int'];
}>;

export type ChangeMembersToOwnerOnlyMutation = {
  deleteFrommembersCollection: { affectedCount: number };
};

export type ChangeGroupMutationVariables = Exact<{
  groupId: Scalars['Int'];
  input: GroupsUpdateInput;
}>;

export type ChangeGroupMutation = {
  updategroupsCollection: { affectedCount: number };
};

export type FindProfilesQueryVariables = Exact<{
  first: Scalars['Int'];
  likeName: Scalars['String'];
}>;

export type FindProfilesQuery = {
  profilesCollection?: {
    edges: Array<{
      node?: {
        id: string;
        nickname: string;
        avatar_url?: string | null;
      } | null;
    }>;
  } | null;
};

export const FindGroupsDocument = `
    query findGroups($userId: UUID!) {
  membersCollection(filter: {user_id: {eq: $userId}}) {
    edges {
      node {
        groups {
          id
          name
          profiles {
            id
            nickname
            avatar_url
          }
          membersCollection {
            edges {
              node {
                profiles {
                  id
                  nickname
                  avatar_url
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const useFindGroupsQuery = <TData = FindGroupsQuery, TError = unknown>(
  client: GraphQLClient,
  variables: FindGroupsQueryVariables,
  options?: UseQueryOptions<FindGroupsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<FindGroupsQuery, TError, TData>(
    ['findGroups', variables],
    fetcher<FindGroupsQuery, FindGroupsQueryVariables>(
      client,
      FindGroupsDocument,
      variables,
      headers
    ),
    options
  );
export const AddGroupDocument = `
    mutation addGroup($name: String!, $owner: UUID!) {
  insertIntogroupsCollection(objects: [{name: $name, owner: $owner}]) {
    affectedCount
  }
}
    `;
export const useAddGroupMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    AddGroupMutation,
    TError,
    AddGroupMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<AddGroupMutation, TError, AddGroupMutationVariables, TContext>(
    ['addGroup'],
    (variables?: AddGroupMutationVariables) =>
      fetcher<AddGroupMutation, AddGroupMutationVariables>(
        client,
        AddGroupDocument,
        variables,
        headers
      )(),
    options
  );
export const RemoveGroupDocument = `
    mutation removeGroup($groupId: Int!, $owner: UUID!, $atMost: Int!) {
  deleteMembers: deleteFrommembersCollection(
    filter: {group_id: {eq: $groupId}, user_id: {neq: $owner}}
    atMost: $atMost
  ) {
    affectedCount
  }
  deleteOwner: deleteFrommembersCollection(filter: {group_id: {eq: $groupId}}) {
    affectedCount
  }
  deleteFromgroupsCollection(filter: {id: {eq: $groupId}}) {
    affectedCount
  }
}
    `;
export const useRemoveGroupMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    RemoveGroupMutation,
    TError,
    RemoveGroupMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    RemoveGroupMutation,
    TError,
    RemoveGroupMutationVariables,
    TContext
  >(
    ['removeGroup'],
    (variables?: RemoveGroupMutationVariables) =>
      fetcher<RemoveGroupMutation, RemoveGroupMutationVariables>(
        client,
        RemoveGroupDocument,
        variables,
        headers
      )(),
    options
  );
export const ChangeMembersDocument = `
    mutation changeMembers($groupId: Int!, $owner: UUID!, $members: [membersInsertInput!]!, $atMost: Int!) {
  deleteFrommembersCollection(
    filter: {group_id: {eq: $groupId}, user_id: {neq: $owner}}
    atMost: $atMost
  ) {
    affectedCount
  }
  insertIntomembersCollection(objects: $members) {
    affectedCount
  }
}
    `;
export const useChangeMembersMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ChangeMembersMutation,
    TError,
    ChangeMembersMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    ChangeMembersMutation,
    TError,
    ChangeMembersMutationVariables,
    TContext
  >(
    ['changeMembers'],
    (variables?: ChangeMembersMutationVariables) =>
      fetcher<ChangeMembersMutation, ChangeMembersMutationVariables>(
        client,
        ChangeMembersDocument,
        variables,
        headers
      )(),
    options
  );
export const ChangeMembersToOwnerOnlyDocument = `
    mutation changeMembersToOwnerOnly($groupId: Int!, $owner: UUID!, $atMost: Int!) {
  deleteFrommembersCollection(
    filter: {group_id: {eq: $groupId}, user_id: {neq: $owner}}
    atMost: $atMost
  ) {
    affectedCount
  }
}
    `;
export const useChangeMembersToOwnerOnlyMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ChangeMembersToOwnerOnlyMutation,
    TError,
    ChangeMembersToOwnerOnlyMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    ChangeMembersToOwnerOnlyMutation,
    TError,
    ChangeMembersToOwnerOnlyMutationVariables,
    TContext
  >(
    ['changeMembersToOwnerOnly'],
    (variables?: ChangeMembersToOwnerOnlyMutationVariables) =>
      fetcher<
        ChangeMembersToOwnerOnlyMutation,
        ChangeMembersToOwnerOnlyMutationVariables
      >(client, ChangeMembersToOwnerOnlyDocument, variables, headers)(),
    options
  );
export const ChangeGroupDocument = `
    mutation changeGroup($groupId: Int!, $input: groupsUpdateInput!) {
  updategroupsCollection(set: $input, filter: {id: {eq: $groupId}}, atMost: 1) {
    affectedCount
  }
}
    `;
export const useChangeGroupMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ChangeGroupMutation,
    TError,
    ChangeGroupMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    ChangeGroupMutation,
    TError,
    ChangeGroupMutationVariables,
    TContext
  >(
    ['changeGroup'],
    (variables?: ChangeGroupMutationVariables) =>
      fetcher<ChangeGroupMutation, ChangeGroupMutationVariables>(
        client,
        ChangeGroupDocument,
        variables,
        headers
      )(),
    options
  );
export const FindProfilesDocument = `
    query findProfiles($first: Int!, $likeName: String!) {
  profilesCollection(first: $first, filter: {nickname: {eq: $likeName}}) {
    edges {
      node {
        id
        nickname
        avatar_url
      }
    }
  }
}
    `;
export const useFindProfilesQuery = <
  TData = FindProfilesQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: FindProfilesQueryVariables,
  options?: UseQueryOptions<FindProfilesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<FindProfilesQuery, TError, TData>(
    ['findProfiles', variables],
    fetcher<FindProfilesQuery, FindProfilesQueryVariables>(
      client,
      FindProfilesDocument,
      variables,
      headers
    ),
    options
  );
