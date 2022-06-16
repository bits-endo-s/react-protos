drop policy if exists event_schedules_all_same_group_members on event_schedules;
drop policy if exists events_all_same_group_members on events;
drop table if exists event_schedules;
drop table if exists events;

drop trigger if exists on_group_created on groups;
drop function if exists handle_new_group;
drop policy if exists members_delete_group_owner on members;
drop policy if exists members_insert_group_owner on members;
drop policy if exists members_select_same_group_members on members;
drop function if exists is_same_group_members;
drop policy if exists groups_delete_group_owner on groups;
drop policy if exists groups_update_group_owner on groups;
drop policy if exists groups_insert_authenticated on groups;
drop policy if exists groups_select_authenticated on groups;
drop table if exists members;
drop table if exists groups;

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists handle_new_user;
drop policy if exists profiles_delete_myself on profiles;
drop policy if exists profiles_update_myself on profiles;
drop policy if exists profiles_select_authenticated on profiles;
drop table if exists profiles;

/*
プロファイル
SELECT：ログインユーザーのみ
INSERT：許可なし（トリガーのみ）
UPDATE：自分のみ
DELETE：自分のみ
*/

create table profiles (
  id uuid references auth.users primary key,
  nickname text unique not null,
  avatar_url text
);

alter table profiles enable row level security;

create policy profiles_select_authenticated
  on profiles
  for select
  to authenticated
  using (true);

create policy profiles_update_myself
  on profiles
  for update
  using (auth.uid() = id);

create policy profiles_delete_myself
  on profiles
  for delete
  using (auth.uid() = id);

create function handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, nickname)
  values (new.id, new.raw_user_meta_data->>'nickname');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert
  on auth.users
  for each row execute procedure handle_new_user();

/*
グループ
SELECT：ログインユーザーのみ
INSERT：ログインユーザーのみ
UPDATE：グループのオーナーのみ
DELETE：グループのオーナーのみ

メンバー
SELECT：同じグループのメンバーのみ
INSERT：グループのオーナーのみ
UPDATE：許可なし
DELETE：グループのオーナーのみ
*/

create table groups (
  id serial primary key,
  name text unique not null,
  owner uuid references profiles not null
);

create table members (
  group_id integer references groups,
  user_id uuid references profiles,
  primary key (group_id, user_id)
);

alter table groups enable row level security;

create policy groups_select_authenticated
  on groups
  for select
  to authenticated
  using (true);

create policy groups_insert_authenticated
  on groups
  for insert
  to authenticated
  with check (true);

create policy groups_update_group_owner
  on groups
  for update
  using (auth.uid() = owner)
  with check(true);

create policy groups_delete_group_owner
  on groups
  for delete
  using (auth.uid() = owner);

alter table members enable row level security;

create function is_same_group_members (_user_id uuid, _group_id integer)
returns bool
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from members m
    where m.user_id = _user_id
    and m.group_id = _group_id
  );
$$;

create policy members_select_same_group_members
  on members
  for select
  using (
    is_same_group_members(auth.uid(), group_id)
  );

create policy members_insert_group_owner
  on members
  for insert
  with check (
    group_id in (select g.id from groups g where g.owner = auth.uid())
  );

create policy members_delete_group_owner
  on members
  for delete
  using (
    group_id in (select g.id from groups g where g.owner = auth.uid())
  );

create function handle_new_group ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into members (group_id, user_id)
  values (new.id, auth.uid());
  return new;
end;
$$;

create trigger on_group_created
  after insert
  on groups
  for each row execute procedure handle_new_group();

/*
イベント
SELECT：同じグループのメンバーのみ
INSERT：同じグループのメンバーのみ
UPDATE：同じグループのメンバーのみ
DELETE：同じグループのメンバーのみ

イベント予定
SELECT：同じグループのメンバーのみ
INSERT：同じグループのメンバーのみ
UPDATE：同じグループのメンバーのみ
DELETE：同じグループのメンバーのみ
*/

create table events (
  id serial primary key,
  name text unique not null,
  group_id integer references groups
);

create table event_schedules (
  id serial primary key,
  event_id integer references events,
  start_date timestamptz not null,
  end_date timestamptz not null
);

alter table events enable row level security;

create policy events_all_same_group_members
  on events
  for all
  using (
    group_id in (
      select m.group_id from members m where m.user_id = auth.uid()
    )
  )
  with check (
    group_id in (
      select m.group_id from members m where m.user_id = auth.uid()
    )
  );

alter table event_schedules enable row level security;

create policy event_schedules_all_same_group_members
  on event_schedules
  for all
  using (
    (select e.group_id from events e where e.id = event_id)
    in
    (select m.group_id from members m where m.user_id = auth.uid())
  )
  with check (
    (select e.group_id from events e where e.id = event_id)
    in
    (select m.group_id from members m where m.user_id = auth.uid())
  );

/*
DBスキーマを変更した後にGraphQLのスキーマ変更の手動実行が必要
*/
select graphql.rebuild_schema();

/*
like_operation.sqlを実行している場合は上記SQLに続けて下記のINSERTも必要
*/
insert into graphql._field(parent_type_id, type_id, constant_name, is_not_null, is_array, description)
    select
        gt.id as parent_type_id,
        gt.graphql_type_id type_id,
        ops.constant_name as constant_name,
        false as is_not_null,
        false as is_array,
        null::text as description
    from
        graphql.type gt
        join (
            values
                ('like')
        ) ops(constant_name)
            on true
    where
        gt.meta_kind = 'FilterType'
        and gt.graphql_type_id = graphql.type_id('String');
