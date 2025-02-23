import { gql } from '@apollo/client/core';
import { useMutation, 
  // type UseMutationOptions 
} from '@vue/apollo-composable';

export const CREATE_QUEUE_POINT = gql`
  mutation CreateQueuePoint($row: Int!) {
    createQueuePoint(row: $row) {
      row
      date
    }
  }
`;

// type TOptions = UseMutationOptions<UpsertDataPointMutation, UpsertDataPointMutationVariables>

export const useCreateQueuePointMutation = (options?: TOptions) => useMutation
// <
  // UpsertDataPointMutation,
  // UpsertDataPointMutationVariables
// >
(CREATE_QUEUE_POINT, 
  // options
);
