import {
  Badge,
  Button,
  Group,
  Menu,
  MenuItem,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { Suspense } from 'react';

import { useFindGroupsQuery } from '../generated/graphql';
import useGraphQLClient from '../hooks/GraphQLClient';
import useIsMobile from '../hooks/Mobile';
import { useUser } from '../hooks/User';
import AddGroupModal from './AddGroupModal';
import ChangeGroupModal from './ChangeGroupModal';
import ChangeMembersModal from './ChangeMembersModal';
import Loading from './Loading';
import RemoveGroupModal from './RemoveGroupModal';

type GroupsProps = {
  openChangeMembers: (groupId: number) => void;
  openEdit: (groupId: number) => void;
  openRemove: (groupId: number) => void;
};

const Groups = ({ openChangeMembers, openEdit, openRemove }: GroupsProps) => {
  const [user] = useUser();
  const graphQLClient = useGraphQLClient();
  const { data: findGroupsQuery } = useFindGroupsQuery(graphQLClient, {
    userId: user.id,
  });

  const isMobile = useIsMobile();
  const rows = findGroupsQuery?.membersCollection?.edges.map((memberEdge) => {
    const group = memberEdge.node?.groups;

    const groupName = <Text>{group?.name}</Text>;

    const isOwner = user.id === group?.profiles?.id;

    const menu = (
      <Menu>
        <MenuItem
          onClick={() => {
            if (group) {
              openChangeMembers(group.id);
            }
          }}
          disabled={!isOwner}
        >
          Change members
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (group) {
              openEdit(group.id);
            }
          }}
          disabled={!isOwner}
        >
          Edit group
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (group) {
              openRemove(group.id);
            }
          }}
          disabled={!isOwner}
        >
          Remove group
        </MenuItem>
      </Menu>
    );

    const owner = (
      <Badge
        py="md"
        size="lg"
        radius="sm"
        style={{ textTransform: 'none' }}
        color="gray"
      >
        {group?.profiles?.nickname}
      </Badge>
    );

    const members = group?.membersCollection?.edges.map((groupMemberEdge) => {
      const profile = groupMemberEdge.node?.profiles;
      return (
        <Badge
          key={profile?.id}
          py="md"
          size="lg"
          radius="sm"
          style={{ textTransform: 'none' }}
          color="gray"
        >
          {profile?.nickname}
        </Badge>
      );
    });

    return (
      <tr key={group?.id}>
        {isMobile ? (
          <td>
            <Group position="apart">
              {groupName}
              {menu}
            </Group>
            <Text mt="md" size="xs" color="dimmed">
              Members
            </Text>
            <Group spacing="sm">{members}</Group>
            <Text mt="md" size="xs" color="dimmed">
              Owner
            </Text>
            <Group>{owner}</Group>
          </td>
        ) : (
          <>
            <td>{groupName}</td>
            <td>
              <Group>{members}</Group>
            </td>
            <td>{owner}</td>
            <td>{menu}</td>
          </>
        )}
      </tr>
    );
  });

  return (
    <Table verticalSpacing="md">
      {isMobile ? (
        <tbody>{rows}</tbody>
      ) : (
        <>
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </>
      )}
    </Table>
  );
};

type GroupsState = {
  addGroupOpened: boolean;
  changeMembersOpened: boolean;
  editGroupOpened: boolean;
  removeGroupOpened: boolean;
  groupId: number;
};

const GroupsPage = () => {
  const [state, setState] = useSetState<GroupsState>({
    addGroupOpened: false,
    changeMembersOpened: false,
    editGroupOpened: false,
    removeGroupOpened: false,
    groupId: -1,
  });

  const clearState = () => {
    setState({
      addGroupOpened: false,
      changeMembersOpened: false,
      editGroupOpened: false,
      removeGroupOpened: false,
      groupId: -1,
    });
  };

  return (
    <>
      <Group position="apart">
        <Title order={3}>Gropus</Title>
        <Button
          variant="light"
          onClick={() => setState({ addGroupOpened: true })}
        >
          New Group
        </Button>
      </Group>
      <Suspense fallback={<Loading />}>
        <Group mt="md">
          <Groups
            openChangeMembers={(groupId) =>
              setState({ changeMembersOpened: true, groupId })
            }
            openEdit={(groupId) =>
              setState({ editGroupOpened: true, groupId })
            }
            openRemove={(groupId) =>
              setState({ removeGroupOpened: true, groupId })
            }
          />
        </Group>
      </Suspense>
      <AddGroupModal opened={state.addGroupOpened} onClose={clearState} />
      <ChangeMembersModal
        opened={state.changeMembersOpened}
        close={clearState}
        groupId={state.groupId}
      />
      <ChangeGroupModal
        opened={state.editGroupOpened}
        close={clearState}
        groupId={state.groupId}
      />
      <RemoveGroupModal
        opened={state.removeGroupOpened}
        close={clearState}
        groupId={state.groupId}
      />
    </>
  );
};

export default GroupsPage;
