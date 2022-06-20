import {
  ActionIcon,
  Badge,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Text,
} from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { useDebouncedValue, useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { X } from 'tabler-icons-react';

import {
  useChangeMembersMutation,
  useChangeMembersToOwnerOnlyMutation,
  useFindGroupsQuery,
  useFindProfilesQuery,
} from '../generated/graphql';
import { useConfig } from '../hooks/Config';
import useGraphQLClient from '../hooks/GraphQLClient';
import { useUser } from '../hooks/User';

type FromProps = {
  groupId: number;
  setLoading: (loading: boolean) => void;
  close: () => void;
};

const ChangeMembersForm = ({ groupId, setLoading, close }: FromProps) => {
  const config = useConfig();
  const [user] = useUser();
  const graphQLClient = useGraphQLClient();
  const { data: findGroupsQuery } = useFindGroupsQuery(graphQLClient, {
    userId: user.id,
  });

  const group = findGroupsQuery?.membersCollection?.edges.find(
    (me) => me.node?.groups?.id === groupId
  )?.node?.groups;

  const initialMembers =
    group?.membersCollection?.edges.map((memberEdge) => {
      const member = memberEdge.node?.profiles;
      return { id: member?.id ?? '', nickname: member?.nickname ?? '' };
    }) ?? [];

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

  const [state] = useSetState({ message: '' });

  const form = useForm({
    initialValues: { members: formList(initialMembers) },
  });

  const members = form.values.members.map((member, index) => (
    <Badge
      key={member.id}
      py="md"
      size="lg"
      radius="sm"
      style={{ textTransform: 'none' }}
      color="gray"
    >
      <Group spacing="xs">
        {member.nickname}
        <ActionIcon
          color="blue"
          size="sm"
          radius="lg"
          variant="filled"
          onClick={() => form.removeListItem('members', index)}
          disabled={user.id === member.id}
        >
          <X />
        </ActionIcon>
      </Group>
    </Badge>
  ));

  const searchForm = useForm({
    initialValues: { userName: '' },
  });

  const [debouncedUserName] = useDebouncedValue(
    searchForm.values.userName,
    500
  );

  const { data: findProfilesQuery } = useFindProfilesQuery(
    graphQLClient,
    {
      first: config.autocomplete,
      likeName: `${debouncedUserName}%`,
    },
    {
      enabled: debouncedUserName.trim().length > 0,
    }
  );

  const searchResult =
    findProfilesQuery?.profilesCollection?.edges.map((profileEdge) => {
      const profile = profileEdge.node;
      return { label: profile?.nickname ?? '', value: profile?.id ?? '' };
    }) ?? [];

  const queryClient = useQueryClient();
  const changeMembersMutation = useChangeMembersMutation(graphQLClient);
  const changeMembersToOwnerOnlyMutation =
    useChangeMembersToOwnerOnlyMutation(graphQLClient);

  const submit = async (values: typeof form.values) => {
    try {
      setLoading(true);

      const selectedMembers = values.members
        .filter((member) => member.id !== user.id)
        .map((member) => ({
          group_id: groupId,
          user_id: member.id,
        }));

      const onSuccess = async () => {
        showNotification({ message: 'Changed members.' });
        await queryClient.invalidateQueries([
          'findGroups',
          { userId: user.id },
        ]);
      };

      if (selectedMembers.length > 0) {
        await changeMembersMutation.mutateAsync(
          {
            groupId,
            owner: user.id,
            members: selectedMembers,
            atMost: config.atMost,
          },
          { onSuccess }
        );
      } else {
        await changeMembersToOwnerOnlyMutation.mutateAsync(
          {
            groupId,
            owner: user.id,
            atMost: config.atMost,
          },
          { onSuccess }
        );
      }

      close();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.reset();
    searchForm.reset();
    // モーダルをオープンするたびにformを初期化したいため、
    // モーダルが処理対象とするグループのIDを条件としています。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Text color="red" size="sm">
        {state.message}
      </Text>
      <Text color="dimmed" mt="md" size="sm">
        Group
      </Text>
      <Text>{group?.name}</Text>
      <Text color="dimmed" mt="md" size="sm">
        Owner
      </Text>
      <Text>{owner}</Text>
      <Text color="dimmed" mt="md" size="sm">
        Members
      </Text>
      <Group>
        <Select
          label="Pick the user you want to add."
          placeholder="Search by user name"
          data={searchResult}
          searchable
          nothingFound="No users"
          onSearchChange={(value) => {
            searchForm.setFieldValue('userName', value);
          }}
          onChange={(value) => {
            const member = searchResult.find((m) => m.value === value);

            if (member === undefined) return;

            const isAlreadyMember =
              form.values.members.find((m) => m.id === member.value) !==
              undefined;
            if (isAlreadyMember) return;

            form.addListItem('members', {
              id: member.value,
              nickname: member.label,
            });
          }}
        />
      </Group>
      <Group mt="md" spacing="sm">
        {members}
      </Group>
      <Group position="right" mt="md">
        <Button type="submit" size="sm">
          Save
        </Button>
      </Group>
    </form>
  );
};

type ModalProps = {
  opened: boolean;
  close: () => void;
  groupId: number;
};

const ChangeMembersModal = ({ opened, close, groupId }: ModalProps) => {
  const config = useConfig();

  const [state, setState] = useSetState({
    loading: false,
  });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Change members"
      centered={config.modalCentered}
    >
      <LoadingOverlay visible={state.loading} />
      <ChangeMembersForm
        groupId={groupId}
        setLoading={(loading) => setState({ loading })}
        close={close}
      />
    </Modal>
  );
};

export default ChangeMembersModal;
