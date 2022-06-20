import {
  Badge,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue, useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from 'react-query';

import {
  useChangeGroupMutation,
  useFindGroupsQuery,
} from '../generated/graphql';
import { useConfig } from '../hooks/Config';
import useGraphQLClient from '../hooks/GraphQLClient';
import { useUser } from '../hooks/User';

type FormProps = {
  groupId: number;
  setLoading: (loading: boolean) => void;
  close: () => void;
};

const ChangeGroupForm = ({ groupId, setLoading, close }: FormProps) => {
  const [user] = useUser();
  const graphQLClient = useGraphQLClient();
  const { data: findGroupsQuery } = useFindGroupsQuery(graphQLClient, {
    userId: user.id,
  });

  const group = findGroupsQuery?.membersCollection?.edges.find(
    (me) => me.node?.groups?.id === groupId
  )?.node?.groups;

  const form = useForm({
    initialValues: {
      name: group?.name,
      owner: group?.profiles?.id,
    },
  });

  const owner = (
    <Badge
      py="md"
      size="lg"
      radius="sm"
      style={{ textTransform: 'none' }}
      color="gray"
    >
      {
        group?.membersCollection?.edges.find((memberEdge) => {
          const profile = memberEdge.node?.profiles;
          return profile?.id === form.values.owner;
        })?.node?.profiles?.nickname
      }
    </Badge>
  );

  const members = group?.membersCollection?.edges.map((memberEdge) => {
    const profile = memberEdge.node?.profiles;
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

  const searchForm = useForm({
    initialValues: { userName: '' },
  });

  const [debouncedUserName] = useDebouncedValue(
    searchForm.values.userName,
    500
  );

  const searchResult =
    group?.membersCollection?.edges.map((memberEdge) => {
      const profile = memberEdge.node?.profiles;
      return { label: profile?.nickname ?? '', value: profile?.id ?? '' };
    }) ?? [];

  const queryClient = useQueryClient();
  const changeGroupMutation = useChangeGroupMutation(graphQLClient);

  const submit = async (values: typeof form.values) => {
    try {
      setLoading(true);

      let input = {};
      if (values.name && values.name !== group?.name) {
        input = { ...input, name: values.name };
      }
      if (values.owner && values.owner !== group?.profiles?.id) {
        input = { ...input, owner: values.owner };
      }

      const onSuccess = async () => {
        showNotification({ message: 'Edit a group.' });
        await queryClient.invalidateQueries([
          'findGroups',
          { userId: user.id },
        ]);
      };

      await changeGroupMutation.mutateAsync({ groupId, input }, { onSuccess });
      close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Text color="dimmed" mt="md" size="sm">
        Group
      </Text>
      <TextInput
        required
        type="text"
        label="Name"
        placeholder={group?.name}
        {...form.getInputProps('name')}
      />
      <Text color="dimmed" mt="md" size="sm">
        Owner
      </Text>
      <Text>{owner}</Text>
      <Select
        label="Pick the user you wish to assign as the owner."
        placeholder="Search by user name"
        data={searchResult.filter((m) => m.label.startsWith(debouncedUserName))}
        searchable
        nothingFound="No users"
        onSearchChange={(value) => {
          searchForm.setFieldValue('userName', value);
        }}
        onChange={(value) => {
          const member = searchResult.find((m) => m.value === value);

          if (member === undefined) return;

          const isAlreadyOwner = form.values.owner === member.value;
          if (isAlreadyOwner) return;

          form.setFieldValue('owner', member.value);
        }}
      />
      <Group mt="xs">{owner}</Group>
      <Text color="dimmed" mt="md" size="sm">
        Members
      </Text>
      <Group>{members}</Group>{' '}
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

const ChangeGroupModal = ({ opened, close, groupId }: ModalProps) => {
  const config = useConfig();

  const [state, setState] = useSetState({
    loading: false,
  });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Edit a group"
      centered={config.modalCentered}
    >
      <LoadingOverlay visible={state.loading} />
      <ChangeGroupForm
        groupId={groupId}
        setLoading={(loading) => setState({ loading })}
        close={close}
      />
    </Modal>
  );
};

export default ChangeGroupModal;
