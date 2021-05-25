import { gql } from 'graphql-request';

export const checkBurntBunks = gql`
  query getBurntPunksForHolder($address: String!) {
    binanceBunks(where: { bunkHolder: $address, isBurned: true }) {
      bunkIndex
      bunkHolder
    }
  }
`;

export const getBunkData = gql`
  query getBunkData($address: String!) {
    binanceBunks(
      where: { bunkHolder: $address, isBeebitClaimed: false }
      first: 1
    ) {
      bunkIndex
      bunkHolder
    }
  }
`;

export const checkBeebitData = gql`
  query checkBeebitData($bunkIndex: String!) {
    beebits(where: { bunkIndex: $bunkIndex }, first: 1) {
      tokenId
      holder
      mintedAt
    }
  }
`;
