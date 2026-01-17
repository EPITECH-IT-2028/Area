import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
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
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  jsonb: { input: any; output: any };
  timestamptz: { input: string; output: string };
  uuid: { input: string; output: string };
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "actions" */
export type Actions = {
  __typename?: 'actions';
  /** An array relationship */
  areas: Array<Areas>;
  /** An aggregate relationship */
  areas_aggregate: Areas_Aggregate;
  config_schema?: Maybe<Scalars['jsonb']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_name: Scalars['String']['output'];
  event_type: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  /** An object relationship */
  service: Services;
  service_id: Scalars['uuid']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** columns and relationships of "actions" */
export type ActionsAreasArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

/** columns and relationships of "actions" */
export type ActionsAreas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

/** columns and relationships of "actions" */
export type ActionsConfig_SchemaArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "actions" */
export type Actions_Aggregate = {
  __typename?: 'actions_aggregate';
  aggregate?: Maybe<Actions_Aggregate_Fields>;
  nodes: Array<Actions>;
};

export type Actions_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Actions_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Actions_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Actions_Aggregate_Bool_Exp_Count>;
};

export type Actions_Aggregate_Bool_Exp_Bool_And = {
  arguments: Actions_Select_Column_Actions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Actions_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Actions_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Actions_Select_Column_Actions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Actions_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Actions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Actions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Actions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "actions" */
export type Actions_Aggregate_Fields = {
  __typename?: 'actions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Actions_Max_Fields>;
  min?: Maybe<Actions_Min_Fields>;
};

/** aggregate fields of "actions" */
export type Actions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Actions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "actions" */
export type Actions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Actions_Max_Order_By>;
  min?: InputMaybe<Actions_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Actions_Append_Input = {
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "actions" */
export type Actions_Arr_Rel_Insert_Input = {
  data: Array<Actions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Actions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "actions". All fields are combined with a logical 'AND'. */
export type Actions_Bool_Exp = {
  _and?: InputMaybe<Array<Actions_Bool_Exp>>;
  _not?: InputMaybe<Actions_Bool_Exp>;
  _or?: InputMaybe<Array<Actions_Bool_Exp>>;
  areas?: InputMaybe<Areas_Bool_Exp>;
  areas_aggregate?: InputMaybe<Areas_Aggregate_Bool_Exp>;
  config_schema?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  event_type?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  service?: InputMaybe<Services_Bool_Exp>;
  service_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "actions" */
export enum Actions_Constraint {
  /** unique or primary key constraint on columns "id" */
  ActionsPkey = 'actions_pkey',
  /** unique or primary key constraint on columns "service_id", "name" */
  ActionsServiceIdNameKey = 'actions_service_id_name_key',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Actions_Delete_At_Path_Input = {
  config_schema?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Actions_Delete_Elem_Input = {
  config_schema?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Actions_Delete_Key_Input = {
  config_schema?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "actions" */
export type Actions_Insert_Input = {
  areas?: InputMaybe<Areas_Arr_Rel_Insert_Input>;
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  event_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  service?: InputMaybe<Services_Obj_Rel_Insert_Input>;
  service_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Actions_Max_Fields = {
  __typename?: 'actions_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  event_type?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  service_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "actions" */
export type Actions_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  service_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Actions_Min_Fields = {
  __typename?: 'actions_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  event_type?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  service_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "actions" */
export type Actions_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  service_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "actions" */
export type Actions_Mutation_Response = {
  __typename?: 'actions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Actions>;
};

/** input type for inserting object relation for remote table "actions" */
export type Actions_Obj_Rel_Insert_Input = {
  data: Actions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Actions_On_Conflict>;
};

/** on_conflict condition type for table "actions" */
export type Actions_On_Conflict = {
  constraint: Actions_Constraint;
  update_columns?: Array<Actions_Update_Column>;
  where?: InputMaybe<Actions_Bool_Exp>;
};

/** Ordering options when selecting data from "actions". */
export type Actions_Order_By = {
  areas_aggregate?: InputMaybe<Areas_Aggregate_Order_By>;
  config_schema?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  service?: InputMaybe<Services_Order_By>;
  service_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: actions */
export type Actions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Actions_Prepend_Input = {
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "actions" */
export enum Actions_Select_Column {
  /** column name */
  ConfigSchema = 'config_schema',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  EventType = 'event_type',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Name = 'name',
  /** column name */
  ServiceId = 'service_id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** select "actions_aggregate_bool_exp_bool_and_arguments_columns" columns of table "actions" */
export enum Actions_Select_Column_Actions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsActive = 'is_active',
}

/** select "actions_aggregate_bool_exp_bool_or_arguments_columns" columns of table "actions" */
export enum Actions_Select_Column_Actions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsActive = 'is_active',
}

/** input type for updating data in table "actions" */
export type Actions_Set_Input = {
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  event_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  service_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "actions" */
export type Actions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Actions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Actions_Stream_Cursor_Value_Input = {
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  event_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  service_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "actions" */
export enum Actions_Update_Column {
  /** column name */
  ConfigSchema = 'config_schema',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  EventType = 'event_type',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Name = 'name',
  /** column name */
  ServiceId = 'service_id',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Actions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Actions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Actions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Actions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Actions_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Actions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Actions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Actions_Bool_Exp;
};

/** columns and relationships of "areas" */
export type Areas = {
  __typename?: 'areas';
  /** An object relationship */
  action: Actions;
  action_config?: Maybe<Scalars['jsonb']['output']>;
  action_id: Scalars['uuid']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  hook_logs: Array<Hook_Logs>;
  /** An aggregate relationship */
  hook_logs_aggregate: Hook_Logs_Aggregate;
  id: Scalars['uuid']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  last_triggered?: Maybe<Scalars['timestamptz']['output']>;
  name: Scalars['String']['output'];
  /** An object relationship */
  reaction: Reactions;
  reaction_config?: Maybe<Scalars['jsonb']['output']>;
  reaction_id: Scalars['uuid']['output'];
  trigger_count?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** columns and relationships of "areas" */
export type AreasAction_ConfigArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "areas" */
export type AreasHook_LogsArgs = {
  distinct_on?: InputMaybe<Array<Hook_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hook_Logs_Order_By>>;
  where?: InputMaybe<Hook_Logs_Bool_Exp>;
};

/** columns and relationships of "areas" */
export type AreasHook_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hook_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hook_Logs_Order_By>>;
  where?: InputMaybe<Hook_Logs_Bool_Exp>;
};

/** columns and relationships of "areas" */
export type AreasReaction_ConfigArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "areas" */
export type Areas_Aggregate = {
  __typename?: 'areas_aggregate';
  aggregate?: Maybe<Areas_Aggregate_Fields>;
  nodes: Array<Areas>;
};

export type Areas_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Areas_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Areas_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Areas_Aggregate_Bool_Exp_Count>;
};

export type Areas_Aggregate_Bool_Exp_Bool_And = {
  arguments: Areas_Select_Column_Areas_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Areas_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Areas_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Areas_Select_Column_Areas_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Areas_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Areas_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Areas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Areas_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "areas" */
export type Areas_Aggregate_Fields = {
  __typename?: 'areas_aggregate_fields';
  avg?: Maybe<Areas_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Areas_Max_Fields>;
  min?: Maybe<Areas_Min_Fields>;
  stddev?: Maybe<Areas_Stddev_Fields>;
  stddev_pop?: Maybe<Areas_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Areas_Stddev_Samp_Fields>;
  sum?: Maybe<Areas_Sum_Fields>;
  var_pop?: Maybe<Areas_Var_Pop_Fields>;
  var_samp?: Maybe<Areas_Var_Samp_Fields>;
  variance?: Maybe<Areas_Variance_Fields>;
};

/** aggregate fields of "areas" */
export type Areas_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Areas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "areas" */
export type Areas_Aggregate_Order_By = {
  avg?: InputMaybe<Areas_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Areas_Max_Order_By>;
  min?: InputMaybe<Areas_Min_Order_By>;
  stddev?: InputMaybe<Areas_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Areas_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Areas_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Areas_Sum_Order_By>;
  var_pop?: InputMaybe<Areas_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Areas_Var_Samp_Order_By>;
  variance?: InputMaybe<Areas_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Areas_Append_Input = {
  action_config?: InputMaybe<Scalars['jsonb']['input']>;
  reaction_config?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "areas" */
export type Areas_Arr_Rel_Insert_Input = {
  data: Array<Areas_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Areas_On_Conflict>;
};

/** aggregate avg on columns */
export type Areas_Avg_Fields = {
  __typename?: 'areas_avg_fields';
  trigger_count?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "areas" */
export type Areas_Avg_Order_By = {
  trigger_count?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "areas". All fields are combined with a logical 'AND'. */
export type Areas_Bool_Exp = {
  _and?: InputMaybe<Array<Areas_Bool_Exp>>;
  _not?: InputMaybe<Areas_Bool_Exp>;
  _or?: InputMaybe<Array<Areas_Bool_Exp>>;
  action?: InputMaybe<Actions_Bool_Exp>;
  action_config?: InputMaybe<Jsonb_Comparison_Exp>;
  action_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  hook_logs?: InputMaybe<Hook_Logs_Bool_Exp>;
  hook_logs_aggregate?: InputMaybe<Hook_Logs_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  last_triggered?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  reaction?: InputMaybe<Reactions_Bool_Exp>;
  reaction_config?: InputMaybe<Jsonb_Comparison_Exp>;
  reaction_id?: InputMaybe<Uuid_Comparison_Exp>;
  trigger_count?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "areas" */
export enum Areas_Constraint {
  /** unique or primary key constraint on columns "id" */
  AreasPkey = 'areas_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Areas_Delete_At_Path_Input = {
  action_config?: InputMaybe<Array<Scalars['String']['input']>>;
  reaction_config?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Areas_Delete_Elem_Input = {
  action_config?: InputMaybe<Scalars['Int']['input']>;
  reaction_config?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Areas_Delete_Key_Input = {
  action_config?: InputMaybe<Scalars['String']['input']>;
  reaction_config?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "areas" */
export type Areas_Inc_Input = {
  trigger_count?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "areas" */
export type Areas_Insert_Input = {
  action?: InputMaybe<Actions_Obj_Rel_Insert_Input>;
  action_config?: InputMaybe<Scalars['jsonb']['input']>;
  action_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  hook_logs?: InputMaybe<Hook_Logs_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_triggered?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reaction?: InputMaybe<Reactions_Obj_Rel_Insert_Input>;
  reaction_config?: InputMaybe<Scalars['jsonb']['input']>;
  reaction_id?: InputMaybe<Scalars['uuid']['input']>;
  trigger_count?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Areas_Max_Fields = {
  __typename?: 'areas_max_fields';
  action_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_triggered?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  reaction_id?: Maybe<Scalars['uuid']['output']>;
  trigger_count?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "areas" */
export type Areas_Max_Order_By = {
  action_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_triggered?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  reaction_id?: InputMaybe<Order_By>;
  trigger_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Areas_Min_Fields = {
  __typename?: 'areas_min_fields';
  action_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_triggered?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  reaction_id?: Maybe<Scalars['uuid']['output']>;
  trigger_count?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "areas" */
export type Areas_Min_Order_By = {
  action_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_triggered?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  reaction_id?: InputMaybe<Order_By>;
  trigger_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "areas" */
export type Areas_Mutation_Response = {
  __typename?: 'areas_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Areas>;
};

/** input type for inserting object relation for remote table "areas" */
export type Areas_Obj_Rel_Insert_Input = {
  data: Areas_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Areas_On_Conflict>;
};

/** on_conflict condition type for table "areas" */
export type Areas_On_Conflict = {
  constraint: Areas_Constraint;
  update_columns?: Array<Areas_Update_Column>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

/** Ordering options when selecting data from "areas". */
export type Areas_Order_By = {
  action?: InputMaybe<Actions_Order_By>;
  action_config?: InputMaybe<Order_By>;
  action_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  hook_logs_aggregate?: InputMaybe<Hook_Logs_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  last_triggered?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  reaction?: InputMaybe<Reactions_Order_By>;
  reaction_config?: InputMaybe<Order_By>;
  reaction_id?: InputMaybe<Order_By>;
  trigger_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: areas */
export type Areas_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Areas_Prepend_Input = {
  action_config?: InputMaybe<Scalars['jsonb']['input']>;
  reaction_config?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "areas" */
export enum Areas_Select_Column {
  /** column name */
  ActionConfig = 'action_config',
  /** column name */
  ActionId = 'action_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  LastTriggered = 'last_triggered',
  /** column name */
  Name = 'name',
  /** column name */
  ReactionConfig = 'reaction_config',
  /** column name */
  ReactionId = 'reaction_id',
  /** column name */
  TriggerCount = 'trigger_count',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** select "areas_aggregate_bool_exp_bool_and_arguments_columns" columns of table "areas" */
export enum Areas_Select_Column_Areas_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsActive = 'is_active',
}

/** select "areas_aggregate_bool_exp_bool_or_arguments_columns" columns of table "areas" */
export enum Areas_Select_Column_Areas_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsActive = 'is_active',
}

/** input type for updating data in table "areas" */
export type Areas_Set_Input = {
  action_config?: InputMaybe<Scalars['jsonb']['input']>;
  action_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_triggered?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reaction_config?: InputMaybe<Scalars['jsonb']['input']>;
  reaction_id?: InputMaybe<Scalars['uuid']['input']>;
  trigger_count?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Areas_Stddev_Fields = {
  __typename?: 'areas_stddev_fields';
  trigger_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "areas" */
export type Areas_Stddev_Order_By = {
  trigger_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Areas_Stddev_Pop_Fields = {
  __typename?: 'areas_stddev_pop_fields';
  trigger_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "areas" */
export type Areas_Stddev_Pop_Order_By = {
  trigger_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Areas_Stddev_Samp_Fields = {
  __typename?: 'areas_stddev_samp_fields';
  trigger_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "areas" */
export type Areas_Stddev_Samp_Order_By = {
  trigger_count?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "areas" */
export type Areas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Areas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Areas_Stream_Cursor_Value_Input = {
  action_config?: InputMaybe<Scalars['jsonb']['input']>;
  action_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_triggered?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reaction_config?: InputMaybe<Scalars['jsonb']['input']>;
  reaction_id?: InputMaybe<Scalars['uuid']['input']>;
  trigger_count?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Areas_Sum_Fields = {
  __typename?: 'areas_sum_fields';
  trigger_count?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "areas" */
export type Areas_Sum_Order_By = {
  trigger_count?: InputMaybe<Order_By>;
};

/** update columns of table "areas" */
export enum Areas_Update_Column {
  /** column name */
  ActionConfig = 'action_config',
  /** column name */
  ActionId = 'action_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  LastTriggered = 'last_triggered',
  /** column name */
  Name = 'name',
  /** column name */
  ReactionConfig = 'reaction_config',
  /** column name */
  ReactionId = 'reaction_id',
  /** column name */
  TriggerCount = 'trigger_count',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

export type Areas_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Areas_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Areas_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Areas_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Areas_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Areas_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Areas_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Areas_Set_Input>;
  /** filter the rows which have to be updated */
  where: Areas_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Areas_Var_Pop_Fields = {
  __typename?: 'areas_var_pop_fields';
  trigger_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "areas" */
export type Areas_Var_Pop_Order_By = {
  trigger_count?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Areas_Var_Samp_Fields = {
  __typename?: 'areas_var_samp_fields';
  trigger_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "areas" */
export type Areas_Var_Samp_Order_By = {
  trigger_count?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Areas_Variance_Fields = {
  __typename?: 'areas_variance_fields';
  trigger_count?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "areas" */
export type Areas_Variance_Order_By = {
  trigger_count?: InputMaybe<Order_By>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC',
}

/** columns and relationships of "hook_logs" */
export type Hook_Logs = {
  __typename?: 'hook_logs';
  action_data?: Maybe<Scalars['jsonb']['output']>;
  /** An object relationship */
  area: Areas;
  area_id: Scalars['uuid']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  error_message?: Maybe<Scalars['String']['output']>;
  execution_time_ms?: Maybe<Scalars['Int']['output']>;
  id: Scalars['uuid']['output'];
  reaction_data?: Maybe<Scalars['jsonb']['output']>;
  status: Scalars['String']['output'];
};

/** columns and relationships of "hook_logs" */
export type Hook_LogsAction_DataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "hook_logs" */
export type Hook_LogsReaction_DataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "hook_logs" */
export type Hook_Logs_Aggregate = {
  __typename?: 'hook_logs_aggregate';
  aggregate?: Maybe<Hook_Logs_Aggregate_Fields>;
  nodes: Array<Hook_Logs>;
};

export type Hook_Logs_Aggregate_Bool_Exp = {
  count?: InputMaybe<Hook_Logs_Aggregate_Bool_Exp_Count>;
};

export type Hook_Logs_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Hook_Logs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Hook_Logs_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "hook_logs" */
export type Hook_Logs_Aggregate_Fields = {
  __typename?: 'hook_logs_aggregate_fields';
  avg?: Maybe<Hook_Logs_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Hook_Logs_Max_Fields>;
  min?: Maybe<Hook_Logs_Min_Fields>;
  stddev?: Maybe<Hook_Logs_Stddev_Fields>;
  stddev_pop?: Maybe<Hook_Logs_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Hook_Logs_Stddev_Samp_Fields>;
  sum?: Maybe<Hook_Logs_Sum_Fields>;
  var_pop?: Maybe<Hook_Logs_Var_Pop_Fields>;
  var_samp?: Maybe<Hook_Logs_Var_Samp_Fields>;
  variance?: Maybe<Hook_Logs_Variance_Fields>;
};

/** aggregate fields of "hook_logs" */
export type Hook_Logs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Hook_Logs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "hook_logs" */
export type Hook_Logs_Aggregate_Order_By = {
  avg?: InputMaybe<Hook_Logs_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Hook_Logs_Max_Order_By>;
  min?: InputMaybe<Hook_Logs_Min_Order_By>;
  stddev?: InputMaybe<Hook_Logs_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Hook_Logs_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Hook_Logs_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Hook_Logs_Sum_Order_By>;
  var_pop?: InputMaybe<Hook_Logs_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Hook_Logs_Var_Samp_Order_By>;
  variance?: InputMaybe<Hook_Logs_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Hook_Logs_Append_Input = {
  action_data?: InputMaybe<Scalars['jsonb']['input']>;
  reaction_data?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "hook_logs" */
export type Hook_Logs_Arr_Rel_Insert_Input = {
  data: Array<Hook_Logs_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Hook_Logs_On_Conflict>;
};

/** aggregate avg on columns */
export type Hook_Logs_Avg_Fields = {
  __typename?: 'hook_logs_avg_fields';
  execution_time_ms?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "hook_logs" */
export type Hook_Logs_Avg_Order_By = {
  execution_time_ms?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "hook_logs". All fields are combined with a logical 'AND'. */
export type Hook_Logs_Bool_Exp = {
  _and?: InputMaybe<Array<Hook_Logs_Bool_Exp>>;
  _not?: InputMaybe<Hook_Logs_Bool_Exp>;
  _or?: InputMaybe<Array<Hook_Logs_Bool_Exp>>;
  action_data?: InputMaybe<Jsonb_Comparison_Exp>;
  area?: InputMaybe<Areas_Bool_Exp>;
  area_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  error_message?: InputMaybe<String_Comparison_Exp>;
  execution_time_ms?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  reaction_data?: InputMaybe<Jsonb_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "hook_logs" */
export enum Hook_Logs_Constraint {
  /** unique or primary key constraint on columns "id" */
  HookLogsPkey = 'hook_logs_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Hook_Logs_Delete_At_Path_Input = {
  action_data?: InputMaybe<Array<Scalars['String']['input']>>;
  reaction_data?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Hook_Logs_Delete_Elem_Input = {
  action_data?: InputMaybe<Scalars['Int']['input']>;
  reaction_data?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Hook_Logs_Delete_Key_Input = {
  action_data?: InputMaybe<Scalars['String']['input']>;
  reaction_data?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "hook_logs" */
export type Hook_Logs_Inc_Input = {
  execution_time_ms?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "hook_logs" */
export type Hook_Logs_Insert_Input = {
  action_data?: InputMaybe<Scalars['jsonb']['input']>;
  area?: InputMaybe<Areas_Obj_Rel_Insert_Input>;
  area_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  error_message?: InputMaybe<Scalars['String']['input']>;
  execution_time_ms?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reaction_data?: InputMaybe<Scalars['jsonb']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Hook_Logs_Max_Fields = {
  __typename?: 'hook_logs_max_fields';
  area_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  error_message?: Maybe<Scalars['String']['output']>;
  execution_time_ms?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "hook_logs" */
export type Hook_Logs_Max_Order_By = {
  area_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  error_message?: InputMaybe<Order_By>;
  execution_time_ms?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Hook_Logs_Min_Fields = {
  __typename?: 'hook_logs_min_fields';
  area_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  error_message?: Maybe<Scalars['String']['output']>;
  execution_time_ms?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "hook_logs" */
export type Hook_Logs_Min_Order_By = {
  area_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  error_message?: InputMaybe<Order_By>;
  execution_time_ms?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "hook_logs" */
export type Hook_Logs_Mutation_Response = {
  __typename?: 'hook_logs_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Hook_Logs>;
};

/** on_conflict condition type for table "hook_logs" */
export type Hook_Logs_On_Conflict = {
  constraint: Hook_Logs_Constraint;
  update_columns?: Array<Hook_Logs_Update_Column>;
  where?: InputMaybe<Hook_Logs_Bool_Exp>;
};

/** Ordering options when selecting data from "hook_logs". */
export type Hook_Logs_Order_By = {
  action_data?: InputMaybe<Order_By>;
  area?: InputMaybe<Areas_Order_By>;
  area_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  error_message?: InputMaybe<Order_By>;
  execution_time_ms?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reaction_data?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: hook_logs */
export type Hook_Logs_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Hook_Logs_Prepend_Input = {
  action_data?: InputMaybe<Scalars['jsonb']['input']>;
  reaction_data?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "hook_logs" */
export enum Hook_Logs_Select_Column {
  /** column name */
  ActionData = 'action_data',
  /** column name */
  AreaId = 'area_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ErrorMessage = 'error_message',
  /** column name */
  ExecutionTimeMs = 'execution_time_ms',
  /** column name */
  Id = 'id',
  /** column name */
  ReactionData = 'reaction_data',
  /** column name */
  Status = 'status',
}

/** input type for updating data in table "hook_logs" */
export type Hook_Logs_Set_Input = {
  action_data?: InputMaybe<Scalars['jsonb']['input']>;
  area_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  error_message?: InputMaybe<Scalars['String']['input']>;
  execution_time_ms?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reaction_data?: InputMaybe<Scalars['jsonb']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Hook_Logs_Stddev_Fields = {
  __typename?: 'hook_logs_stddev_fields';
  execution_time_ms?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "hook_logs" */
export type Hook_Logs_Stddev_Order_By = {
  execution_time_ms?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Hook_Logs_Stddev_Pop_Fields = {
  __typename?: 'hook_logs_stddev_pop_fields';
  execution_time_ms?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "hook_logs" */
export type Hook_Logs_Stddev_Pop_Order_By = {
  execution_time_ms?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Hook_Logs_Stddev_Samp_Fields = {
  __typename?: 'hook_logs_stddev_samp_fields';
  execution_time_ms?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "hook_logs" */
export type Hook_Logs_Stddev_Samp_Order_By = {
  execution_time_ms?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "hook_logs" */
export type Hook_Logs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Hook_Logs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Hook_Logs_Stream_Cursor_Value_Input = {
  action_data?: InputMaybe<Scalars['jsonb']['input']>;
  area_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  error_message?: InputMaybe<Scalars['String']['input']>;
  execution_time_ms?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reaction_data?: InputMaybe<Scalars['jsonb']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Hook_Logs_Sum_Fields = {
  __typename?: 'hook_logs_sum_fields';
  execution_time_ms?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "hook_logs" */
export type Hook_Logs_Sum_Order_By = {
  execution_time_ms?: InputMaybe<Order_By>;
};

/** update columns of table "hook_logs" */
export enum Hook_Logs_Update_Column {
  /** column name */
  ActionData = 'action_data',
  /** column name */
  AreaId = 'area_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ErrorMessage = 'error_message',
  /** column name */
  ExecutionTimeMs = 'execution_time_ms',
  /** column name */
  Id = 'id',
  /** column name */
  ReactionData = 'reaction_data',
  /** column name */
  Status = 'status',
}

export type Hook_Logs_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Hook_Logs_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Hook_Logs_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Hook_Logs_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Hook_Logs_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Hook_Logs_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Hook_Logs_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Hook_Logs_Set_Input>;
  /** filter the rows which have to be updated */
  where: Hook_Logs_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Hook_Logs_Var_Pop_Fields = {
  __typename?: 'hook_logs_var_pop_fields';
  execution_time_ms?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "hook_logs" */
export type Hook_Logs_Var_Pop_Order_By = {
  execution_time_ms?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Hook_Logs_Var_Samp_Fields = {
  __typename?: 'hook_logs_var_samp_fields';
  execution_time_ms?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "hook_logs" */
export type Hook_Logs_Var_Samp_Order_By = {
  execution_time_ms?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Hook_Logs_Variance_Fields = {
  __typename?: 'hook_logs_variance_fields';
  execution_time_ms?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "hook_logs" */
export type Hook_Logs_Variance_Order_By = {
  execution_time_ms?: InputMaybe<Order_By>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "actions" */
  delete_actions?: Maybe<Actions_Mutation_Response>;
  /** delete single row from the table: "actions" */
  delete_actions_by_pk?: Maybe<Actions>;
  /** delete data from the table: "areas" */
  delete_areas?: Maybe<Areas_Mutation_Response>;
  /** delete single row from the table: "areas" */
  delete_areas_by_pk?: Maybe<Areas>;
  /** delete data from the table: "hook_logs" */
  delete_hook_logs?: Maybe<Hook_Logs_Mutation_Response>;
  /** delete single row from the table: "hook_logs" */
  delete_hook_logs_by_pk?: Maybe<Hook_Logs>;
  /** delete data from the table: "reactions" */
  delete_reactions?: Maybe<Reactions_Mutation_Response>;
  /** delete single row from the table: "reactions" */
  delete_reactions_by_pk?: Maybe<Reactions>;
  /** delete data from the table: "services" */
  delete_services?: Maybe<Services_Mutation_Response>;
  /** delete single row from the table: "services" */
  delete_services_by_pk?: Maybe<Services>;
  /** delete data from the table: "user_services" */
  delete_user_services?: Maybe<User_Services_Mutation_Response>;
  /** delete single row from the table: "user_services" */
  delete_user_services_by_pk?: Maybe<User_Services>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "actions" */
  insert_actions?: Maybe<Actions_Mutation_Response>;
  /** insert a single row into the table: "actions" */
  insert_actions_one?: Maybe<Actions>;
  /** insert data into the table: "areas" */
  insert_areas?: Maybe<Areas_Mutation_Response>;
  /** insert a single row into the table: "areas" */
  insert_areas_one?: Maybe<Areas>;
  /** insert data into the table: "hook_logs" */
  insert_hook_logs?: Maybe<Hook_Logs_Mutation_Response>;
  /** insert a single row into the table: "hook_logs" */
  insert_hook_logs_one?: Maybe<Hook_Logs>;
  /** insert data into the table: "reactions" */
  insert_reactions?: Maybe<Reactions_Mutation_Response>;
  /** insert a single row into the table: "reactions" */
  insert_reactions_one?: Maybe<Reactions>;
  /** insert data into the table: "services" */
  insert_services?: Maybe<Services_Mutation_Response>;
  /** insert a single row into the table: "services" */
  insert_services_one?: Maybe<Services>;
  /** insert data into the table: "user_services" */
  insert_user_services?: Maybe<User_Services_Mutation_Response>;
  /** insert a single row into the table: "user_services" */
  insert_user_services_one?: Maybe<User_Services>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "actions" */
  update_actions?: Maybe<Actions_Mutation_Response>;
  /** update single row of the table: "actions" */
  update_actions_by_pk?: Maybe<Actions>;
  /** update multiples rows of table: "actions" */
  update_actions_many?: Maybe<Array<Maybe<Actions_Mutation_Response>>>;
  /** update data of the table: "areas" */
  update_areas?: Maybe<Areas_Mutation_Response>;
  /** update single row of the table: "areas" */
  update_areas_by_pk?: Maybe<Areas>;
  /** update multiples rows of table: "areas" */
  update_areas_many?: Maybe<Array<Maybe<Areas_Mutation_Response>>>;
  /** update data of the table: "hook_logs" */
  update_hook_logs?: Maybe<Hook_Logs_Mutation_Response>;
  /** update single row of the table: "hook_logs" */
  update_hook_logs_by_pk?: Maybe<Hook_Logs>;
  /** update multiples rows of table: "hook_logs" */
  update_hook_logs_many?: Maybe<Array<Maybe<Hook_Logs_Mutation_Response>>>;
  /** update data of the table: "reactions" */
  update_reactions?: Maybe<Reactions_Mutation_Response>;
  /** update single row of the table: "reactions" */
  update_reactions_by_pk?: Maybe<Reactions>;
  /** update multiples rows of table: "reactions" */
  update_reactions_many?: Maybe<Array<Maybe<Reactions_Mutation_Response>>>;
  /** update data of the table: "services" */
  update_services?: Maybe<Services_Mutation_Response>;
  /** update single row of the table: "services" */
  update_services_by_pk?: Maybe<Services>;
  /** update multiples rows of table: "services" */
  update_services_many?: Maybe<Array<Maybe<Services_Mutation_Response>>>;
  /** update data of the table: "user_services" */
  update_user_services?: Maybe<User_Services_Mutation_Response>;
  /** update single row of the table: "user_services" */
  update_user_services_by_pk?: Maybe<User_Services>;
  /** update multiples rows of table: "user_services" */
  update_user_services_many?: Maybe<
    Array<Maybe<User_Services_Mutation_Response>>
  >;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};

/** mutation root */
export type Mutation_RootDelete_ActionsArgs = {
  where: Actions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Actions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_AreasArgs = {
  where: Areas_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Areas_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Hook_LogsArgs = {
  where: Hook_Logs_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Hook_Logs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_ReactionsArgs = {
  where: Reactions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Reactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_ServicesArgs = {
  where: Services_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Services_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_User_ServicesArgs = {
  where: User_Services_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_User_Services_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootInsert_ActionsArgs = {
  objects: Array<Actions_Insert_Input>;
  on_conflict?: InputMaybe<Actions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Actions_OneArgs = {
  object: Actions_Insert_Input;
  on_conflict?: InputMaybe<Actions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_AreasArgs = {
  objects: Array<Areas_Insert_Input>;
  on_conflict?: InputMaybe<Areas_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Areas_OneArgs = {
  object: Areas_Insert_Input;
  on_conflict?: InputMaybe<Areas_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Hook_LogsArgs = {
  objects: Array<Hook_Logs_Insert_Input>;
  on_conflict?: InputMaybe<Hook_Logs_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Hook_Logs_OneArgs = {
  object: Hook_Logs_Insert_Input;
  on_conflict?: InputMaybe<Hook_Logs_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ReactionsArgs = {
  objects: Array<Reactions_Insert_Input>;
  on_conflict?: InputMaybe<Reactions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Reactions_OneArgs = {
  object: Reactions_Insert_Input;
  on_conflict?: InputMaybe<Reactions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ServicesArgs = {
  objects: Array<Services_Insert_Input>;
  on_conflict?: InputMaybe<Services_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Services_OneArgs = {
  object: Services_Insert_Input;
  on_conflict?: InputMaybe<Services_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_ServicesArgs = {
  objects: Array<User_Services_Insert_Input>;
  on_conflict?: InputMaybe<User_Services_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Services_OneArgs = {
  object: User_Services_Insert_Input;
  on_conflict?: InputMaybe<User_Services_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_ActionsArgs = {
  _append?: InputMaybe<Actions_Append_Input>;
  _delete_at_path?: InputMaybe<Actions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Actions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Actions_Delete_Key_Input>;
  _prepend?: InputMaybe<Actions_Prepend_Input>;
  _set?: InputMaybe<Actions_Set_Input>;
  where: Actions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Actions_By_PkArgs = {
  _append?: InputMaybe<Actions_Append_Input>;
  _delete_at_path?: InputMaybe<Actions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Actions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Actions_Delete_Key_Input>;
  _prepend?: InputMaybe<Actions_Prepend_Input>;
  _set?: InputMaybe<Actions_Set_Input>;
  pk_columns: Actions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Actions_ManyArgs = {
  updates: Array<Actions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_AreasArgs = {
  _append?: InputMaybe<Areas_Append_Input>;
  _delete_at_path?: InputMaybe<Areas_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Areas_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Areas_Delete_Key_Input>;
  _inc?: InputMaybe<Areas_Inc_Input>;
  _prepend?: InputMaybe<Areas_Prepend_Input>;
  _set?: InputMaybe<Areas_Set_Input>;
  where: Areas_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Areas_By_PkArgs = {
  _append?: InputMaybe<Areas_Append_Input>;
  _delete_at_path?: InputMaybe<Areas_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Areas_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Areas_Delete_Key_Input>;
  _inc?: InputMaybe<Areas_Inc_Input>;
  _prepend?: InputMaybe<Areas_Prepend_Input>;
  _set?: InputMaybe<Areas_Set_Input>;
  pk_columns: Areas_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Areas_ManyArgs = {
  updates: Array<Areas_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Hook_LogsArgs = {
  _append?: InputMaybe<Hook_Logs_Append_Input>;
  _delete_at_path?: InputMaybe<Hook_Logs_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Hook_Logs_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Hook_Logs_Delete_Key_Input>;
  _inc?: InputMaybe<Hook_Logs_Inc_Input>;
  _prepend?: InputMaybe<Hook_Logs_Prepend_Input>;
  _set?: InputMaybe<Hook_Logs_Set_Input>;
  where: Hook_Logs_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Hook_Logs_By_PkArgs = {
  _append?: InputMaybe<Hook_Logs_Append_Input>;
  _delete_at_path?: InputMaybe<Hook_Logs_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Hook_Logs_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Hook_Logs_Delete_Key_Input>;
  _inc?: InputMaybe<Hook_Logs_Inc_Input>;
  _prepend?: InputMaybe<Hook_Logs_Prepend_Input>;
  _set?: InputMaybe<Hook_Logs_Set_Input>;
  pk_columns: Hook_Logs_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Hook_Logs_ManyArgs = {
  updates: Array<Hook_Logs_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ReactionsArgs = {
  _append?: InputMaybe<Reactions_Append_Input>;
  _delete_at_path?: InputMaybe<Reactions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Reactions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Reactions_Delete_Key_Input>;
  _prepend?: InputMaybe<Reactions_Prepend_Input>;
  _set?: InputMaybe<Reactions_Set_Input>;
  where: Reactions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Reactions_By_PkArgs = {
  _append?: InputMaybe<Reactions_Append_Input>;
  _delete_at_path?: InputMaybe<Reactions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Reactions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Reactions_Delete_Key_Input>;
  _prepend?: InputMaybe<Reactions_Prepend_Input>;
  _set?: InputMaybe<Reactions_Set_Input>;
  pk_columns: Reactions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Reactions_ManyArgs = {
  updates: Array<Reactions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ServicesArgs = {
  _append?: InputMaybe<Services_Append_Input>;
  _delete_at_path?: InputMaybe<Services_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Services_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Services_Delete_Key_Input>;
  _prepend?: InputMaybe<Services_Prepend_Input>;
  _set?: InputMaybe<Services_Set_Input>;
  where: Services_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Services_By_PkArgs = {
  _append?: InputMaybe<Services_Append_Input>;
  _delete_at_path?: InputMaybe<Services_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Services_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Services_Delete_Key_Input>;
  _prepend?: InputMaybe<Services_Prepend_Input>;
  _set?: InputMaybe<Services_Set_Input>;
  pk_columns: Services_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Services_ManyArgs = {
  updates: Array<Services_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_User_ServicesArgs = {
  _append?: InputMaybe<User_Services_Append_Input>;
  _delete_at_path?: InputMaybe<User_Services_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<User_Services_Delete_Elem_Input>;
  _delete_key?: InputMaybe<User_Services_Delete_Key_Input>;
  _prepend?: InputMaybe<User_Services_Prepend_Input>;
  _set?: InputMaybe<User_Services_Set_Input>;
  where: User_Services_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_Services_By_PkArgs = {
  _append?: InputMaybe<User_Services_Append_Input>;
  _delete_at_path?: InputMaybe<User_Services_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<User_Services_Delete_Elem_Input>;
  _delete_key?: InputMaybe<User_Services_Delete_Key_Input>;
  _prepend?: InputMaybe<User_Services_Prepend_Input>;
  _set?: InputMaybe<User_Services_Set_Input>;
  pk_columns: User_Services_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_Services_ManyArgs = {
  updates: Array<User_Services_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  actions: Array<Actions>;
  /** An aggregate relationship */
  actions_aggregate: Actions_Aggregate;
  /** fetch data from the table: "actions" using primary key columns */
  actions_by_pk?: Maybe<Actions>;
  /** An array relationship */
  areas: Array<Areas>;
  /** An aggregate relationship */
  areas_aggregate: Areas_Aggregate;
  /** fetch data from the table: "areas" using primary key columns */
  areas_by_pk?: Maybe<Areas>;
  /** An array relationship */
  hook_logs: Array<Hook_Logs>;
  /** An aggregate relationship */
  hook_logs_aggregate: Hook_Logs_Aggregate;
  /** fetch data from the table: "hook_logs" using primary key columns */
  hook_logs_by_pk?: Maybe<Hook_Logs>;
  /** An array relationship */
  reactions: Array<Reactions>;
  /** An aggregate relationship */
  reactions_aggregate: Reactions_Aggregate;
  /** fetch data from the table: "reactions" using primary key columns */
  reactions_by_pk?: Maybe<Reactions>;
  /** fetch data from the table: "services" */
  services: Array<Services>;
  /** fetch aggregated fields from the table: "services" */
  services_aggregate: Services_Aggregate;
  /** fetch data from the table: "services" using primary key columns */
  services_by_pk?: Maybe<Services>;
  /** An array relationship */
  user_services: Array<User_Services>;
  /** An aggregate relationship */
  user_services_aggregate: User_Services_Aggregate;
  /** fetch data from the table: "user_services" using primary key columns */
  user_services_by_pk?: Maybe<User_Services>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};

export type Query_RootActionsArgs = {
  distinct_on?: InputMaybe<Array<Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actions_Order_By>>;
  where?: InputMaybe<Actions_Bool_Exp>;
};

export type Query_RootActions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actions_Order_By>>;
  where?: InputMaybe<Actions_Bool_Exp>;
};

export type Query_RootActions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootAreasArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

export type Query_RootAreas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

export type Query_RootAreas_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootHook_LogsArgs = {
  distinct_on?: InputMaybe<Array<Hook_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hook_Logs_Order_By>>;
  where?: InputMaybe<Hook_Logs_Bool_Exp>;
};

export type Query_RootHook_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hook_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hook_Logs_Order_By>>;
  where?: InputMaybe<Hook_Logs_Bool_Exp>;
};

export type Query_RootHook_Logs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootReactionsArgs = {
  distinct_on?: InputMaybe<Array<Reactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reactions_Order_By>>;
  where?: InputMaybe<Reactions_Bool_Exp>;
};

export type Query_RootReactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reactions_Order_By>>;
  where?: InputMaybe<Reactions_Bool_Exp>;
};

export type Query_RootReactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootServicesArgs = {
  distinct_on?: InputMaybe<Array<Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Services_Order_By>>;
  where?: InputMaybe<Services_Bool_Exp>;
};

export type Query_RootServices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Services_Order_By>>;
  where?: InputMaybe<Services_Bool_Exp>;
};

export type Query_RootServices_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootUser_ServicesArgs = {
  distinct_on?: InputMaybe<Array<User_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Services_Order_By>>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

export type Query_RootUser_Services_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Services_Order_By>>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

export type Query_RootUser_Services_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** columns and relationships of "reactions" */
export type Reactions = {
  __typename?: 'reactions';
  action_type: Scalars['String']['output'];
  /** An array relationship */
  areas: Array<Areas>;
  /** An aggregate relationship */
  areas_aggregate: Areas_Aggregate;
  config_schema?: Maybe<Scalars['jsonb']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_name: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  /** An object relationship */
  service: Services;
  service_id: Scalars['uuid']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** columns and relationships of "reactions" */
export type ReactionsAreasArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

/** columns and relationships of "reactions" */
export type ReactionsAreas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

/** columns and relationships of "reactions" */
export type ReactionsConfig_SchemaArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "reactions" */
export type Reactions_Aggregate = {
  __typename?: 'reactions_aggregate';
  aggregate?: Maybe<Reactions_Aggregate_Fields>;
  nodes: Array<Reactions>;
};

export type Reactions_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Reactions_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Reactions_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Reactions_Aggregate_Bool_Exp_Count>;
};

export type Reactions_Aggregate_Bool_Exp_Bool_And = {
  arguments: Reactions_Select_Column_Reactions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Reactions_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Reactions_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Reactions_Select_Column_Reactions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Reactions_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Reactions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Reactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Reactions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "reactions" */
export type Reactions_Aggregate_Fields = {
  __typename?: 'reactions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Reactions_Max_Fields>;
  min?: Maybe<Reactions_Min_Fields>;
};

/** aggregate fields of "reactions" */
export type Reactions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Reactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "reactions" */
export type Reactions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Reactions_Max_Order_By>;
  min?: InputMaybe<Reactions_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Reactions_Append_Input = {
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "reactions" */
export type Reactions_Arr_Rel_Insert_Input = {
  data: Array<Reactions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Reactions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "reactions". All fields are combined with a logical 'AND'. */
export type Reactions_Bool_Exp = {
  _and?: InputMaybe<Array<Reactions_Bool_Exp>>;
  _not?: InputMaybe<Reactions_Bool_Exp>;
  _or?: InputMaybe<Array<Reactions_Bool_Exp>>;
  action_type?: InputMaybe<String_Comparison_Exp>;
  areas?: InputMaybe<Areas_Bool_Exp>;
  areas_aggregate?: InputMaybe<Areas_Aggregate_Bool_Exp>;
  config_schema?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  service?: InputMaybe<Services_Bool_Exp>;
  service_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "reactions" */
export enum Reactions_Constraint {
  /** unique or primary key constraint on columns "id" */
  ReactionsPkey = 'reactions_pkey',
  /** unique or primary key constraint on columns "service_id", "name" */
  ReactionsServiceIdNameKey = 'reactions_service_id_name_key',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Reactions_Delete_At_Path_Input = {
  config_schema?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Reactions_Delete_Elem_Input = {
  config_schema?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Reactions_Delete_Key_Input = {
  config_schema?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "reactions" */
export type Reactions_Insert_Input = {
  action_type?: InputMaybe<Scalars['String']['input']>;
  areas?: InputMaybe<Areas_Arr_Rel_Insert_Input>;
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  service?: InputMaybe<Services_Obj_Rel_Insert_Input>;
  service_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Reactions_Max_Fields = {
  __typename?: 'reactions_max_fields';
  action_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  service_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "reactions" */
export type Reactions_Max_Order_By = {
  action_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  service_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Reactions_Min_Fields = {
  __typename?: 'reactions_min_fields';
  action_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  service_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "reactions" */
export type Reactions_Min_Order_By = {
  action_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  service_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "reactions" */
export type Reactions_Mutation_Response = {
  __typename?: 'reactions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Reactions>;
};

/** input type for inserting object relation for remote table "reactions" */
export type Reactions_Obj_Rel_Insert_Input = {
  data: Reactions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Reactions_On_Conflict>;
};

/** on_conflict condition type for table "reactions" */
export type Reactions_On_Conflict = {
  constraint: Reactions_Constraint;
  update_columns?: Array<Reactions_Update_Column>;
  where?: InputMaybe<Reactions_Bool_Exp>;
};

/** Ordering options when selecting data from "reactions". */
export type Reactions_Order_By = {
  action_type?: InputMaybe<Order_By>;
  areas_aggregate?: InputMaybe<Areas_Aggregate_Order_By>;
  config_schema?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  service?: InputMaybe<Services_Order_By>;
  service_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: reactions */
export type Reactions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Reactions_Prepend_Input = {
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "reactions" */
export enum Reactions_Select_Column {
  /** column name */
  ActionType = 'action_type',
  /** column name */
  ConfigSchema = 'config_schema',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Name = 'name',
  /** column name */
  ServiceId = 'service_id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** select "reactions_aggregate_bool_exp_bool_and_arguments_columns" columns of table "reactions" */
export enum Reactions_Select_Column_Reactions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsActive = 'is_active',
}

/** select "reactions_aggregate_bool_exp_bool_or_arguments_columns" columns of table "reactions" */
export enum Reactions_Select_Column_Reactions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsActive = 'is_active',
}

/** input type for updating data in table "reactions" */
export type Reactions_Set_Input = {
  action_type?: InputMaybe<Scalars['String']['input']>;
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  service_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "reactions" */
export type Reactions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Reactions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Reactions_Stream_Cursor_Value_Input = {
  action_type?: InputMaybe<Scalars['String']['input']>;
  config_schema?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  service_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "reactions" */
export enum Reactions_Update_Column {
  /** column name */
  ActionType = 'action_type',
  /** column name */
  ConfigSchema = 'config_schema',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Name = 'name',
  /** column name */
  ServiceId = 'service_id',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Reactions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Reactions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Reactions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Reactions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Reactions_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Reactions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Reactions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Reactions_Bool_Exp;
};

/** columns and relationships of "services" */
export type Services = {
  __typename?: 'services';
  /** An array relationship */
  actions: Array<Actions>;
  /** An aggregate relationship */
  actions_aggregate: Actions_Aggregate;
  auth_type: Scalars['String']['output'];
  base_url?: Maybe<Scalars['String']['output']>;
  config?: Maybe<Scalars['jsonb']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_name: Scalars['String']['output'];
  icon_url?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  oauth_url?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  reactions: Array<Reactions>;
  /** An aggregate relationship */
  reactions_aggregate: Reactions_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  user_services: Array<User_Services>;
  /** An aggregate relationship */
  user_services_aggregate: User_Services_Aggregate;
};

/** columns and relationships of "services" */
export type ServicesActionsArgs = {
  distinct_on?: InputMaybe<Array<Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actions_Order_By>>;
  where?: InputMaybe<Actions_Bool_Exp>;
};

/** columns and relationships of "services" */
export type ServicesActions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actions_Order_By>>;
  where?: InputMaybe<Actions_Bool_Exp>;
};

/** columns and relationships of "services" */
export type ServicesConfigArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "services" */
export type ServicesReactionsArgs = {
  distinct_on?: InputMaybe<Array<Reactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reactions_Order_By>>;
  where?: InputMaybe<Reactions_Bool_Exp>;
};

/** columns and relationships of "services" */
export type ServicesReactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reactions_Order_By>>;
  where?: InputMaybe<Reactions_Bool_Exp>;
};

/** columns and relationships of "services" */
export type ServicesUser_ServicesArgs = {
  distinct_on?: InputMaybe<Array<User_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Services_Order_By>>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

/** columns and relationships of "services" */
export type ServicesUser_Services_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Services_Order_By>>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

/** aggregated selection of "services" */
export type Services_Aggregate = {
  __typename?: 'services_aggregate';
  aggregate?: Maybe<Services_Aggregate_Fields>;
  nodes: Array<Services>;
};

/** aggregate fields of "services" */
export type Services_Aggregate_Fields = {
  __typename?: 'services_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Services_Max_Fields>;
  min?: Maybe<Services_Min_Fields>;
};

/** aggregate fields of "services" */
export type Services_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Services_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Services_Append_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to filter rows from the table "services". All fields are combined with a logical 'AND'. */
export type Services_Bool_Exp = {
  _and?: InputMaybe<Array<Services_Bool_Exp>>;
  _not?: InputMaybe<Services_Bool_Exp>;
  _or?: InputMaybe<Array<Services_Bool_Exp>>;
  actions?: InputMaybe<Actions_Bool_Exp>;
  actions_aggregate?: InputMaybe<Actions_Aggregate_Bool_Exp>;
  auth_type?: InputMaybe<String_Comparison_Exp>;
  base_url?: InputMaybe<String_Comparison_Exp>;
  config?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  icon_url?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  oauth_url?: InputMaybe<String_Comparison_Exp>;
  reactions?: InputMaybe<Reactions_Bool_Exp>;
  reactions_aggregate?: InputMaybe<Reactions_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_services?: InputMaybe<User_Services_Bool_Exp>;
  user_services_aggregate?: InputMaybe<User_Services_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "services" */
export enum Services_Constraint {
  /** unique or primary key constraint on columns "name" */
  ServicesNameKey = 'services_name_key',
  /** unique or primary key constraint on columns "id" */
  ServicesPkey = 'services_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Services_Delete_At_Path_Input = {
  config?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Services_Delete_Elem_Input = {
  config?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Services_Delete_Key_Input = {
  config?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "services" */
export type Services_Insert_Input = {
  actions?: InputMaybe<Actions_Arr_Rel_Insert_Input>;
  auth_type?: InputMaybe<Scalars['String']['input']>;
  base_url?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  icon_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  oauth_url?: InputMaybe<Scalars['String']['input']>;
  reactions?: InputMaybe<Reactions_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_services?: InputMaybe<User_Services_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Services_Max_Fields = {
  __typename?: 'services_max_fields';
  auth_type?: Maybe<Scalars['String']['output']>;
  base_url?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  icon_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  oauth_url?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Services_Min_Fields = {
  __typename?: 'services_min_fields';
  auth_type?: Maybe<Scalars['String']['output']>;
  base_url?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  icon_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  oauth_url?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "services" */
export type Services_Mutation_Response = {
  __typename?: 'services_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Services>;
};

/** input type for inserting object relation for remote table "services" */
export type Services_Obj_Rel_Insert_Input = {
  data: Services_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Services_On_Conflict>;
};

/** on_conflict condition type for table "services" */
export type Services_On_Conflict = {
  constraint: Services_Constraint;
  update_columns?: Array<Services_Update_Column>;
  where?: InputMaybe<Services_Bool_Exp>;
};

/** Ordering options when selecting data from "services". */
export type Services_Order_By = {
  actions_aggregate?: InputMaybe<Actions_Aggregate_Order_By>;
  auth_type?: InputMaybe<Order_By>;
  base_url?: InputMaybe<Order_By>;
  config?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  icon_url?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  oauth_url?: InputMaybe<Order_By>;
  reactions_aggregate?: InputMaybe<Reactions_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_services_aggregate?: InputMaybe<User_Services_Aggregate_Order_By>;
};

/** primary key columns input for table: services */
export type Services_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Services_Prepend_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "services" */
export enum Services_Select_Column {
  /** column name */
  AuthType = 'auth_type',
  /** column name */
  BaseUrl = 'base_url',
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  IconUrl = 'icon_url',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Name = 'name',
  /** column name */
  OauthUrl = 'oauth_url',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "services" */
export type Services_Set_Input = {
  auth_type?: InputMaybe<Scalars['String']['input']>;
  base_url?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  icon_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  oauth_url?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "services" */
export type Services_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Services_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Services_Stream_Cursor_Value_Input = {
  auth_type?: InputMaybe<Scalars['String']['input']>;
  base_url?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  icon_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  oauth_url?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "services" */
export enum Services_Update_Column {
  /** column name */
  AuthType = 'auth_type',
  /** column name */
  BaseUrl = 'base_url',
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  IconUrl = 'icon_url',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Name = 'name',
  /** column name */
  OauthUrl = 'oauth_url',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Services_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Services_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Services_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Services_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Services_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Services_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Services_Set_Input>;
  /** filter the rows which have to be updated */
  where: Services_Bool_Exp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  actions: Array<Actions>;
  /** An aggregate relationship */
  actions_aggregate: Actions_Aggregate;
  /** fetch data from the table: "actions" using primary key columns */
  actions_by_pk?: Maybe<Actions>;
  /** fetch data from the table in a streaming manner: "actions" */
  actions_stream: Array<Actions>;
  /** An array relationship */
  areas: Array<Areas>;
  /** An aggregate relationship */
  areas_aggregate: Areas_Aggregate;
  /** fetch data from the table: "areas" using primary key columns */
  areas_by_pk?: Maybe<Areas>;
  /** fetch data from the table in a streaming manner: "areas" */
  areas_stream: Array<Areas>;
  /** An array relationship */
  hook_logs: Array<Hook_Logs>;
  /** An aggregate relationship */
  hook_logs_aggregate: Hook_Logs_Aggregate;
  /** fetch data from the table: "hook_logs" using primary key columns */
  hook_logs_by_pk?: Maybe<Hook_Logs>;
  /** fetch data from the table in a streaming manner: "hook_logs" */
  hook_logs_stream: Array<Hook_Logs>;
  /** An array relationship */
  reactions: Array<Reactions>;
  /** An aggregate relationship */
  reactions_aggregate: Reactions_Aggregate;
  /** fetch data from the table: "reactions" using primary key columns */
  reactions_by_pk?: Maybe<Reactions>;
  /** fetch data from the table in a streaming manner: "reactions" */
  reactions_stream: Array<Reactions>;
  /** fetch data from the table: "services" */
  services: Array<Services>;
  /** fetch aggregated fields from the table: "services" */
  services_aggregate: Services_Aggregate;
  /** fetch data from the table: "services" using primary key columns */
  services_by_pk?: Maybe<Services>;
  /** fetch data from the table in a streaming manner: "services" */
  services_stream: Array<Services>;
  /** An array relationship */
  user_services: Array<User_Services>;
  /** An aggregate relationship */
  user_services_aggregate: User_Services_Aggregate;
  /** fetch data from the table: "user_services" using primary key columns */
  user_services_by_pk?: Maybe<User_Services>;
  /** fetch data from the table in a streaming manner: "user_services" */
  user_services_stream: Array<User_Services>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};

export type Subscription_RootActionsArgs = {
  distinct_on?: InputMaybe<Array<Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actions_Order_By>>;
  where?: InputMaybe<Actions_Bool_Exp>;
};

export type Subscription_RootActions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actions_Order_By>>;
  where?: InputMaybe<Actions_Bool_Exp>;
};

export type Subscription_RootActions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootActions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Actions_Stream_Cursor_Input>>;
  where?: InputMaybe<Actions_Bool_Exp>;
};

export type Subscription_RootAreasArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

export type Subscription_RootAreas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

export type Subscription_RootAreas_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootAreas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Areas_Stream_Cursor_Input>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

export type Subscription_RootHook_LogsArgs = {
  distinct_on?: InputMaybe<Array<Hook_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hook_Logs_Order_By>>;
  where?: InputMaybe<Hook_Logs_Bool_Exp>;
};

export type Subscription_RootHook_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hook_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hook_Logs_Order_By>>;
  where?: InputMaybe<Hook_Logs_Bool_Exp>;
};

export type Subscription_RootHook_Logs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootHook_Logs_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Hook_Logs_Stream_Cursor_Input>>;
  where?: InputMaybe<Hook_Logs_Bool_Exp>;
};

export type Subscription_RootReactionsArgs = {
  distinct_on?: InputMaybe<Array<Reactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reactions_Order_By>>;
  where?: InputMaybe<Reactions_Bool_Exp>;
};

export type Subscription_RootReactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reactions_Order_By>>;
  where?: InputMaybe<Reactions_Bool_Exp>;
};

export type Subscription_RootReactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootReactions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Reactions_Stream_Cursor_Input>>;
  where?: InputMaybe<Reactions_Bool_Exp>;
};

export type Subscription_RootServicesArgs = {
  distinct_on?: InputMaybe<Array<Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Services_Order_By>>;
  where?: InputMaybe<Services_Bool_Exp>;
};

export type Subscription_RootServices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Services_Order_By>>;
  where?: InputMaybe<Services_Bool_Exp>;
};

export type Subscription_RootServices_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootServices_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Services_Stream_Cursor_Input>>;
  where?: InputMaybe<Services_Bool_Exp>;
};

export type Subscription_RootUser_ServicesArgs = {
  distinct_on?: InputMaybe<Array<User_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Services_Order_By>>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

export type Subscription_RootUser_Services_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Services_Order_By>>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

export type Subscription_RootUser_Services_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootUser_Services_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Services_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user_services" */
export type User_Services = {
  __typename?: 'user_services';
  access_token?: Maybe<Scalars['String']['output']>;
  api_key?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  credentials?: Maybe<Scalars['jsonb']['output']>;
  id: Scalars['uuid']['output'];
  is_connected?: Maybe<Scalars['Boolean']['output']>;
  last_sync?: Maybe<Scalars['timestamptz']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  service: Services;
  service_id: Scalars['uuid']['output'];
  token_expiry?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** columns and relationships of "user_services" */
export type User_ServicesCredentialsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "user_services" */
export type User_Services_Aggregate = {
  __typename?: 'user_services_aggregate';
  aggregate?: Maybe<User_Services_Aggregate_Fields>;
  nodes: Array<User_Services>;
};

export type User_Services_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<User_Services_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<User_Services_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<User_Services_Aggregate_Bool_Exp_Count>;
};

export type User_Services_Aggregate_Bool_Exp_Bool_And = {
  arguments: User_Services_Select_Column_User_Services_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Services_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type User_Services_Aggregate_Bool_Exp_Bool_Or = {
  arguments: User_Services_Select_Column_User_Services_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Services_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type User_Services_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Services_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Services_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_services" */
export type User_Services_Aggregate_Fields = {
  __typename?: 'user_services_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Services_Max_Fields>;
  min?: Maybe<User_Services_Min_Fields>;
};

/** aggregate fields of "user_services" */
export type User_Services_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Services_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_services" */
export type User_Services_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Services_Max_Order_By>;
  min?: InputMaybe<User_Services_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type User_Services_Append_Input = {
  credentials?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "user_services" */
export type User_Services_Arr_Rel_Insert_Input = {
  data: Array<User_Services_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Services_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_services". All fields are combined with a logical 'AND'. */
export type User_Services_Bool_Exp = {
  _and?: InputMaybe<Array<User_Services_Bool_Exp>>;
  _not?: InputMaybe<User_Services_Bool_Exp>;
  _or?: InputMaybe<Array<User_Services_Bool_Exp>>;
  access_token?: InputMaybe<String_Comparison_Exp>;
  api_key?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  credentials?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_connected?: InputMaybe<Boolean_Comparison_Exp>;
  last_sync?: InputMaybe<Timestamptz_Comparison_Exp>;
  refresh_token?: InputMaybe<String_Comparison_Exp>;
  service?: InputMaybe<Services_Bool_Exp>;
  service_id?: InputMaybe<Uuid_Comparison_Exp>;
  token_expiry?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_services" */
export enum User_Services_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserServicesPkey = 'user_services_pkey',
  /** unique or primary key constraint on columns "user_id", "service_id" */
  UserServicesUserIdServiceIdKey = 'user_services_user_id_service_id_key',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type User_Services_Delete_At_Path_Input = {
  credentials?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type User_Services_Delete_Elem_Input = {
  credentials?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type User_Services_Delete_Key_Input = {
  credentials?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "user_services" */
export type User_Services_Insert_Input = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  api_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  credentials?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_connected?: InputMaybe<Scalars['Boolean']['input']>;
  last_sync?: InputMaybe<Scalars['timestamptz']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  service?: InputMaybe<Services_Obj_Rel_Insert_Input>;
  service_id?: InputMaybe<Scalars['uuid']['input']>;
  token_expiry?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Services_Max_Fields = {
  __typename?: 'user_services_max_fields';
  access_token?: Maybe<Scalars['String']['output']>;
  api_key?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_sync?: Maybe<Scalars['timestamptz']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  service_id?: Maybe<Scalars['uuid']['output']>;
  token_expiry?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_services" */
export type User_Services_Max_Order_By = {
  access_token?: InputMaybe<Order_By>;
  api_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_sync?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  service_id?: InputMaybe<Order_By>;
  token_expiry?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Services_Min_Fields = {
  __typename?: 'user_services_min_fields';
  access_token?: Maybe<Scalars['String']['output']>;
  api_key?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_sync?: Maybe<Scalars['timestamptz']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  service_id?: Maybe<Scalars['uuid']['output']>;
  token_expiry?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_services" */
export type User_Services_Min_Order_By = {
  access_token?: InputMaybe<Order_By>;
  api_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_sync?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  service_id?: InputMaybe<Order_By>;
  token_expiry?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_services" */
export type User_Services_Mutation_Response = {
  __typename?: 'user_services_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Services>;
};

/** on_conflict condition type for table "user_services" */
export type User_Services_On_Conflict = {
  constraint: User_Services_Constraint;
  update_columns?: Array<User_Services_Update_Column>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

/** Ordering options when selecting data from "user_services". */
export type User_Services_Order_By = {
  access_token?: InputMaybe<Order_By>;
  api_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  credentials?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_connected?: InputMaybe<Order_By>;
  last_sync?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  service?: InputMaybe<Services_Order_By>;
  service_id?: InputMaybe<Order_By>;
  token_expiry?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_services */
export type User_Services_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type User_Services_Prepend_Input = {
  credentials?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "user_services" */
export enum User_Services_Select_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  ApiKey = 'api_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Credentials = 'credentials',
  /** column name */
  Id = 'id',
  /** column name */
  IsConnected = 'is_connected',
  /** column name */
  LastSync = 'last_sync',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  ServiceId = 'service_id',
  /** column name */
  TokenExpiry = 'token_expiry',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** select "user_services_aggregate_bool_exp_bool_and_arguments_columns" columns of table "user_services" */
export enum User_Services_Select_Column_User_Services_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsConnected = 'is_connected',
}

/** select "user_services_aggregate_bool_exp_bool_or_arguments_columns" columns of table "user_services" */
export enum User_Services_Select_Column_User_Services_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsConnected = 'is_connected',
}

/** input type for updating data in table "user_services" */
export type User_Services_Set_Input = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  api_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  credentials?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_connected?: InputMaybe<Scalars['Boolean']['input']>;
  last_sync?: InputMaybe<Scalars['timestamptz']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  service_id?: InputMaybe<Scalars['uuid']['input']>;
  token_expiry?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "user_services" */
export type User_Services_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Services_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Services_Stream_Cursor_Value_Input = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  api_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  credentials?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_connected?: InputMaybe<Scalars['Boolean']['input']>;
  last_sync?: InputMaybe<Scalars['timestamptz']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  service_id?: InputMaybe<Scalars['uuid']['input']>;
  token_expiry?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_services" */
export enum User_Services_Update_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  ApiKey = 'api_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Credentials = 'credentials',
  /** column name */
  Id = 'id',
  /** column name */
  IsConnected = 'is_connected',
  /** column name */
  LastSync = 'last_sync',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  ServiceId = 'service_id',
  /** column name */
  TokenExpiry = 'token_expiry',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

export type User_Services_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<User_Services_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<User_Services_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<User_Services_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<User_Services_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<User_Services_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Services_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Services_Bool_Exp;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  areas: Array<Areas>;
  /** An aggregate relationship */
  areas_aggregate: Areas_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  user_services: Array<User_Services>;
  /** An aggregate relationship */
  user_services_aggregate: User_Services_Aggregate;
};

/** columns and relationships of "users" */
export type UsersAreasArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersAreas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Areas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Areas_Order_By>>;
  where?: InputMaybe<Areas_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersUser_ServicesArgs = {
  distinct_on?: InputMaybe<Array<User_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Services_Order_By>>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersUser_Services_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Services_Order_By>>;
  where?: InputMaybe<User_Services_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  areas?: InputMaybe<Areas_Bool_Exp>;
  areas_aggregate?: InputMaybe<Areas_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  user_services?: InputMaybe<User_Services_Bool_Exp>;
  user_services_aggregate?: InputMaybe<User_Services_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey',
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  areas?: InputMaybe<Areas_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  user_services?: InputMaybe<User_Services_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  areas_aggregate?: InputMaybe<Areas_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  user_services_aggregate?: InputMaybe<User_Services_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Password = 'password',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Password = 'password',
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type GetAllActiveAreasQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllActiveAreasQuery = {
  __typename?: 'query_root';
  areas: Array<{
    __typename?: 'areas';
    id: string;
    user_id: string;
    name: string;
    last_triggered?: string | null;
    action_id: string;
    action_config?: any | null;
    reaction_id: string;
    reaction_config?: any | null;
    description?: string | null;
    action: {
      __typename?: 'actions';
      id: string;
      name: string;
      event_type: string;
      service: { __typename?: 'services'; name: string };
    };
    reaction: {
      __typename?: 'reactions';
      id: string;
      name: string;
      action_type: string;
      service: { __typename?: 'services'; name: string };
    };
    user: {
      __typename?: 'users';
      user_services: Array<{
        __typename?: 'user_services';
        id: string;
        access_token?: string | null;
        refresh_token?: string | null;
        token_expiry?: string | null;
        credentials?: any | null;
        service: { __typename?: 'services'; name: string };
      }>;
    };
  }>;
};

export type UpdateAreaLastTriggeredMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  last_triggered: Scalars['timestamptz']['input'];
}>;

export type UpdateAreaLastTriggeredMutation = {
  __typename?: 'mutation_root';
  update_areas_by_pk?: {
    __typename?: 'areas';
    id: string;
    last_triggered?: string | null;
  } | null;
};

export type GetActionByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type GetActionByNameQuery = {
  __typename?: 'query_root';
  actions: Array<{
    __typename?: 'actions';
    id: string;
    name: string;
    display_name: string;
    event_type: string;
    description?: string | null;
    config_schema?: any | null;
    service: {
      __typename?: 'services';
      id: string;
      name: string;
      display_name: string;
    };
  }>;
};

export type GetActionsByServiceQueryVariables = Exact<{
  service_name: Scalars['String']['input'];
}>;

export type GetActionsByServiceQuery = {
  __typename?: 'query_root';
  actions: Array<{
    __typename?: 'actions';
    id: string;
    name: string;
    display_name: string;
    event_type: string;
    description?: string | null;
    config_schema?: any | null;
    service: {
      __typename?: 'services';
      id: string;
      name: string;
      display_name: string;
    };
  }>;
};

export type GetReactionsByServiceQueryVariables = Exact<{
  service_name: Scalars['String']['input'];
}>;

export type GetReactionsByServiceQuery = {
  __typename?: 'query_root';
  reactions: Array<{
    __typename?: 'reactions';
    id: string;
    name: string;
    display_name: string;
    action_type: string;
    description?: string | null;
    config_schema?: any | null;
    service: {
      __typename?: 'services';
      id: string;
      name: string;
      display_name: string;
    };
  }>;
};

export type GetReactionByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type GetReactionByNameQuery = {
  __typename?: 'query_root';
  reactions: Array<{
    __typename?: 'reactions';
    id: string;
    name: string;
    display_name: string;
    action_type: string;
    description?: string | null;
    config_schema?: any | null;
    service: {
      __typename?: 'services';
      id: string;
      name: string;
      display_name: string;
    };
  }>;
};

export type CreateAreaMutationVariables = Exact<{
  user_id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  action_id: Scalars['uuid']['input'];
  action_config?: InputMaybe<Scalars['jsonb']['input']>;
  reaction_id: Scalars['uuid']['input'];
  reaction_config?: InputMaybe<Scalars['jsonb']['input']>;
}>;

export type CreateAreaMutation = {
  __typename?: 'mutation_root';
  insert_areas_one?: {
    __typename?: 'areas';
    id: string;
    name: string;
    is_active?: boolean | null;
    created_at?: string | null;
  } | null;
};

export type GetServiceByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type GetServiceByNameQuery = {
  __typename?: 'query_root';
  services: Array<{
    __typename?: 'services';
    id: string;
    name: string;
    display_name: string;
    auth_type: string;
    oauth_url?: string | null;
  }>;
};

export type GetAllServicesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllServicesQuery = {
  __typename?: 'query_root';
  services: Array<{
    __typename?: 'services';
    id: string;
    name: string;
    display_name: string;
    auth_type: string;
    icon_url?: string | null;
    oauth_url?: string | null;
  }>;
};

export type GetUserServiceQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  serviceId: Scalars['uuid']['input'];
}>;

export type GetUserServiceQuery = {
  __typename?: 'query_root';
  user_services: Array<{
    __typename?: 'user_services';
    id: string;
    user_id: string;
    service_id: string;
    access_token?: string | null;
    refresh_token?: string | null;
    token_expiry?: string | null;
    is_connected?: boolean | null;
    credentials?: any | null;
    created_at?: string | null;
    updated_at?: string | null;
  }>;
};

export type GetUserServicesByUserQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
}>;

export type GetUserServicesByUserQuery = {
  __typename?: 'query_root';
  user_services: Array<{
    __typename?: 'user_services';
    id: string;
    user_id: string;
    service_id: string;
    is_connected?: boolean | null;
    last_sync?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    service: {
      __typename?: 'services';
      id: string;
      name: string;
      display_name: string;
      icon_url?: string | null;
    };
  }>;
};

export type CreateUserServiceMutationVariables = Exact<{
  userId: Scalars['uuid']['input'];
  serviceId: Scalars['uuid']['input'];
  accessToken?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  tokenExpiry?: InputMaybe<Scalars['timestamptz']['input']>;
  credentials?: InputMaybe<Scalars['jsonb']['input']>;
}>;

export type CreateUserServiceMutation = {
  __typename?: 'mutation_root';
  insert_user_services_one?: {
    __typename?: 'user_services';
    id: string;
    user_id: string;
    service_id: string;
    is_connected?: boolean | null;
  } | null;
};

export type UpdateUserServiceTokensMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  accessToken?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  tokenExpiry?: InputMaybe<Scalars['timestamptz']['input']>;
}>;

export type UpdateUserServiceTokensMutation = {
  __typename?: 'mutation_root';
  update_user_services_by_pk?: {
    __typename?: 'user_services';
    id: string;
    user_id: string;
    service_id: string;
    is_connected?: boolean | null;
  } | null;
};

export type DisconnectUserServiceMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;

export type DisconnectUserServiceMutation = {
  __typename?: 'mutation_root';
  update_user_services_by_pk?: {
    __typename?: 'user_services';
    id: string;
    is_connected?: boolean | null;
  } | null;
};

export type DeleteUserServiceMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;

export type DeleteUserServiceMutation = {
  __typename?: 'mutation_root';
  delete_user_services_by_pk?: {
    __typename?: 'user_services';
    id: string;
  } | null;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: 'query_root';
  users: Array<{
    __typename?: 'users';
    id: string;
    email: string;
    name?: string | null;
    created_at: string;
  }>;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;

export type GetUserQuery = {
  __typename?: 'query_root';
  users_by_pk?: {
    __typename?: 'users';
    id: string;
    email: string;
    name?: string | null;
    created_at: string;
  } | null;
};

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type GetUserByEmailQuery = {
  __typename?: 'query_root';
  users: Array<{
    __typename?: 'users';
    id: string;
    email: string;
    name?: string | null;
    password?: string | null;
    created_at: string;
  }>;
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateUserMutation = {
  __typename?: 'mutation_root';
  insert_users_one?: {
    __typename?: 'users';
    id: string;
    name?: string | null;
    email: string;
    created_at: string;
  } | null;
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
}>;

export type UpdateUserMutation = {
  __typename?: 'mutation_root';
  update_users_by_pk?: {
    __typename?: 'users';
    id: string;
    name?: string | null;
    email: string;
  } | null;
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;

export type DeleteUserMutation = {
  __typename?: 'mutation_root';
  delete_users_by_pk?: { __typename?: 'users'; id: string } | null;
};

export const GetAllActiveAreasDocument = gql`
  query GetAllActiveAreas {
    areas(where: { is_active: { _eq: true } }) {
      id
      user_id
      name
      last_triggered
      action_id
      action_config
      reaction_id
      reaction_config
      description
      action {
        id
        name
        event_type
        service {
          name
        }
      }
      reaction {
        id
        name
        action_type
        service {
          name
        }
      }
      user {
        user_services {
          id
          access_token
          refresh_token
          token_expiry
          credentials
          service {
            name
          }
        }
      }
    }
  }
`;
export const UpdateAreaLastTriggeredDocument = gql`
  mutation UpdateAreaLastTriggered($id: uuid!, $last_triggered: timestamptz!) {
    update_areas_by_pk(
      pk_columns: { id: $id }
      _set: { last_triggered: $last_triggered }
    ) {
      id
      last_triggered
    }
  }
`;
export const GetActionByNameDocument = gql`
  query GetActionByName($name: String!) {
    actions(
      where: { name: { _eq: $name }, is_active: { _eq: true } }
      limit: 1
    ) {
      id
      name
      display_name
      event_type
      description
      config_schema
      service {
        id
        name
        display_name
      }
    }
  }
`;
export const GetActionsByServiceDocument = gql`
  query GetActionsByService($service_name: String!) {
    actions(where: { service: { name: { _eq: $service_name } } }) {
      id
      name
      display_name
      event_type
      description
      config_schema
      service {
        id
        name
        display_name
      }
    }
  }
`;
export const GetReactionsByServiceDocument = gql`
  query GetReactionsByService($service_name: String!) {
    reactions(where: { service: { name: { _eq: $service_name } } }) {
      id
      name
      display_name
      action_type
      description
      config_schema
      service {
        id
        name
        display_name
      }
    }
  }
`;
export const GetReactionByNameDocument = gql`
  query GetReactionByName($name: String!) {
    reactions(
      where: { name: { _eq: $name }, is_active: { _eq: true } }
      limit: 1
    ) {
      id
      name
      display_name
      action_type
      description
      config_schema
      service {
        id
        name
        display_name
      }
    }
  }
`;
export const CreateAreaDocument = gql`
  mutation CreateArea(
    $user_id: uuid!
    $name: String!
    $description: String
    $is_active: Boolean
    $action_id: uuid!
    $action_config: jsonb
    $reaction_id: uuid!
    $reaction_config: jsonb
  ) {
    insert_areas_one(
      object: {
        user_id: $user_id
        name: $name
        description: $description
        is_active: $is_active
        action_id: $action_id
        action_config: $action_config
        reaction_id: $reaction_id
        reaction_config: $reaction_config
      }
    ) {
      id
      name
      is_active
      created_at
    }
  }
`;
export const GetServiceByNameDocument = gql`
  query GetServiceByName($name: String!) {
    services(where: { name: { _eq: $name } }, limit: 1) {
      id
      name
      display_name
      auth_type
      oauth_url
    }
  }
`;
export const GetAllServicesDocument = gql`
  query GetAllServices {
    services {
      id
      name
      display_name
      auth_type
      icon_url
      oauth_url
    }
  }
`;
export const GetUserServiceDocument = gql`
  query GetUserService($userId: uuid!, $serviceId: uuid!) {
    user_services(
      where: { user_id: { _eq: $userId }, service_id: { _eq: $serviceId } }
      limit: 1
    ) {
      id
      user_id
      service_id
      access_token
      refresh_token
      token_expiry
      is_connected
      credentials
      created_at
      updated_at
    }
  }
`;
export const GetUserServicesByUserDocument = gql`
  query GetUserServicesByUser($userId: uuid!) {
    user_services(where: { user_id: { _eq: $userId } }) {
      id
      user_id
      service_id
      is_connected
      last_sync
      created_at
      updated_at
      service {
        id
        name
        display_name
        icon_url
      }
    }
  }
`;
export const CreateUserServiceDocument = gql`
  mutation CreateUserService(
    $userId: uuid!
    $serviceId: uuid!
    $accessToken: String
    $refreshToken: String
    $tokenExpiry: timestamptz
    $credentials: jsonb
  ) {
    insert_user_services_one(
      object: {
        user_id: $userId
        service_id: $serviceId
        access_token: $accessToken
        refresh_token: $refreshToken
        token_expiry: $tokenExpiry
        credentials: $credentials
        is_connected: true
      }
      on_conflict: {
        constraint: user_services_user_id_service_id_key
        update_columns: [
          access_token
          refresh_token
          token_expiry
          credentials
          is_connected
          updated_at
        ]
      }
    ) {
      id
      user_id
      service_id
      is_connected
    }
  }
`;
export const UpdateUserServiceTokensDocument = gql`
  mutation UpdateUserServiceTokens(
    $id: uuid!
    $accessToken: String
    $refreshToken: String
    $tokenExpiry: timestamptz
  ) {
    update_user_services_by_pk(
      pk_columns: { id: $id }
      _set: {
        access_token: $accessToken
        refresh_token: $refreshToken
        token_expiry: $tokenExpiry
        updated_at: "now()"
      }
    ) {
      id
      user_id
      service_id
      is_connected
    }
  }
`;
export const DisconnectUserServiceDocument = gql`
  mutation DisconnectUserService($id: uuid!) {
    update_user_services_by_pk(
      pk_columns: { id: $id }
      _set: {
        is_connected: false
        access_token: null
        refresh_token: null
        token_expiry: null
      }
    ) {
      id
      is_connected
    }
  }
`;
export const DeleteUserServiceDocument = gql`
  mutation DeleteUserService($id: uuid!) {
    delete_user_services_by_pk(id: $id) {
      id
    }
  }
`;
export const GetUsersDocument = gql`
  query GetUsers {
    users {
      id
      email
      name
      created_at
    }
  }
`;
export const GetUserDocument = gql`
  query GetUser($id: uuid!) {
    users_by_pk(id: $id) {
      id
      email
      name
      created_at
    }
  }
`;
export const GetUserByEmailDocument = gql`
  query GetUserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }, limit: 1) {
      id
      email
      name
      password
      created_at
    }
  }
`;
export const CreateUserDocument = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String) {
    insert_users_one(
      object: { email: $email, name: $name, password: $password }
    ) {
      id
      name
      email
      created_at
    }
  }
`;
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: uuid!, $name: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
      email
    }
  }
`;
export const DeleteUserDocument = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetAllActiveAreas(
      variables?: GetAllActiveAreasQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetAllActiveAreasQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllActiveAreasQuery>({
            document: GetAllActiveAreasDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetAllActiveAreas',
        'query',
        variables,
      );
    },
    UpdateAreaLastTriggered(
      variables: UpdateAreaLastTriggeredMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<UpdateAreaLastTriggeredMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateAreaLastTriggeredMutation>({
            document: UpdateAreaLastTriggeredDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'UpdateAreaLastTriggered',
        'mutation',
        variables,
      );
    },
    GetActionByName(
      variables: GetActionByNameQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetActionByNameQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetActionByNameQuery>({
            document: GetActionByNameDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetActionByName',
        'query',
        variables,
      );
    },
    GetActionsByService(
      variables: GetActionsByServiceQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetActionsByServiceQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetActionsByServiceQuery>({
            document: GetActionsByServiceDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetActionsByService',
        'query',
        variables,
      );
    },
    GetReactionsByService(
      variables: GetReactionsByServiceQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetReactionsByServiceQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetReactionsByServiceQuery>({
            document: GetReactionsByServiceDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetReactionsByService',
        'query',
        variables,
      );
    },
    GetReactionByName(
      variables: GetReactionByNameQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetReactionByNameQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetReactionByNameQuery>({
            document: GetReactionByNameDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetReactionByName',
        'query',
        variables,
      );
    },
    CreateArea(
      variables: CreateAreaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<CreateAreaMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateAreaMutation>({
            document: CreateAreaDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'CreateArea',
        'mutation',
        variables,
      );
    },
    GetServiceByName(
      variables: GetServiceByNameQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetServiceByNameQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetServiceByNameQuery>({
            document: GetServiceByNameDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetServiceByName',
        'query',
        variables,
      );
    },
    GetAllServices(
      variables?: GetAllServicesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetAllServicesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllServicesQuery>({
            document: GetAllServicesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetAllServices',
        'query',
        variables,
      );
    },
    GetUserService(
      variables: GetUserServiceQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUserServiceQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserServiceQuery>({
            document: GetUserServiceDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUserService',
        'query',
        variables,
      );
    },
    GetUserServicesByUser(
      variables: GetUserServicesByUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUserServicesByUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserServicesByUserQuery>({
            document: GetUserServicesByUserDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUserServicesByUser',
        'query',
        variables,
      );
    },
    CreateUserService(
      variables: CreateUserServiceMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<CreateUserServiceMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUserServiceMutation>({
            document: CreateUserServiceDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'CreateUserService',
        'mutation',
        variables,
      );
    },
    UpdateUserServiceTokens(
      variables: UpdateUserServiceTokensMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<UpdateUserServiceTokensMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateUserServiceTokensMutation>({
            document: UpdateUserServiceTokensDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'UpdateUserServiceTokens',
        'mutation',
        variables,
      );
    },
    DisconnectUserService(
      variables: DisconnectUserServiceMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DisconnectUserServiceMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DisconnectUserServiceMutation>({
            document: DisconnectUserServiceDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'DisconnectUserService',
        'mutation',
        variables,
      );
    },
    DeleteUserService(
      variables: DeleteUserServiceMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DeleteUserServiceMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteUserServiceMutation>({
            document: DeleteUserServiceDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'DeleteUserService',
        'mutation',
        variables,
      );
    },
    GetUsers(
      variables?: GetUsersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUsersQuery>({
            document: GetUsersDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUsers',
        'query',
        variables,
      );
    },
    GetUser(
      variables: GetUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserQuery>({
            document: GetUserDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUser',
        'query',
        variables,
      );
    },
    GetUserByEmail(
      variables: GetUserByEmailQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GetUserByEmailQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserByEmailQuery>({
            document: GetUserByEmailDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'GetUserByEmail',
        'query',
        variables,
      );
    },
    CreateUser(
      variables: CreateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<CreateUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUserMutation>({
            document: CreateUserDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'CreateUser',
        'mutation',
        variables,
      );
    },
    UpdateUser(
      variables: UpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<UpdateUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateUserMutation>({
            document: UpdateUserDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'UpdateUser',
        'mutation',
        variables,
      );
    },
    DeleteUser(
      variables: DeleteUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DeleteUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteUserMutation>({
            document: DeleteUserDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'DeleteUser',
        'mutation',
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
