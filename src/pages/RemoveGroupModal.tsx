import {
  Button,
  Group,
  Highlight,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

import {
  useFindGroupsQuery,
  useRemoveGroupMutation,
} from '../generated/graphql';
import { useConfig } from '../hooks/Config';
import useGraphQLClient from '../hooks/GraphQLClient';
import { useUser } from '../hooks/User';

type FromProps = {
  groupId: number;
  setLoading: (loading: boolean) => void;
  close: () => void;
};

const RemoveGroupForm = ({ groupId, setLoading, close }: FromProps) => {
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
      name: '',
    },
  });

  const [state] = useSetState({ message: '' });

  const removeGroupMutation = useRemoveGroupMutation(graphQLClient);
  const queryClient = useQueryClient();

  const submit = async () => {
    try {
      setLoading(true);

      await removeGroupMutation.mutateAsync(
        {
          groupId,
          owner: user.id,
          atMost: 0,
        },
        {
          onSuccess: async () => {
            showNotification({ message: 'Removed a group.' });
            await queryClient.invalidateQueries([
              'findGroups',
              { userId: user.id },
            ]);
          },
        }
      );

      close();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.reset();
    // モーダルをオープンするたびにformを初期化したいため、
    // モーダルが処理対象とするグループのIDを条件としています。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Text color="red" size="sm">
        {state.message}
      </Text>
      <Text>Are you absolutely sure?</Text>
      <Text mt="md" color="red">
        This action cannot be undone.
      </Text>
      <Text>This action removes the group and all associated events.</Text>
      <Highlight mt="md" highlight={[group?.name ?? '']}>
        {`Type "${group?.name ?? ''}" for confirmation.`}
      </Highlight>
      <TextInput
        mt="xs"
        type="text"
        placeholder="Group name"
        {...form.getInputProps('name')}
      />
      <Group position="right" mt="md">
        <Button
          type="submit"
          size="sm"
          disabled={group?.name !== form.values.name}
        >
          Remove
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

const RemoveGroupModal = ({ opened, close, groupId }: ModalProps) => {
  const config = useConfig();

  const [state, setState] = useSetState({ loading: false });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Remove a group"
      centered={config.modalCentered}
    >
      <LoadingOverlay visible={state.loading} />
      <RemoveGroupForm
        groupId={groupId}
        setLoading={(loading) => setState({ loading })}
        close={close}
      />
    </Modal>
  );
};

export default RemoveGroupModal;
