import { gql } from '@apollo/client/core';

export const GET_LAST_QUEUE_POINT_QUERY = gql`
  query GetLastQueuePoint {
    getLastQueuePoint {
      row
    }
  }
`;
