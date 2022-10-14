import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return (key: unknown[]) => queryClient.invalidateQueries(key, { refetchType: 'all' });
};
