import { gql } from '@apollo/client/core';

export default gql`
  query GetLastQueuePoint {
    getLastQueuePoint {
      row
      date
    }
  }
`;
