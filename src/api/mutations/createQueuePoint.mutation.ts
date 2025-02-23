import { gql } from '@apollo/client/core';
import { } from 'graphql.schema.json'
export const CREATE_QUEUE_POINT_MUTATION = gql`
  mutation CreateQueuePoint($row: Int!) {
    createQueuePoint(row: $row) {
      row
      date
    }
  }
`;

