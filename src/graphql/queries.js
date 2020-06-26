/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHighScore = /* GraphQL */ `
  query GetHighScore($id: ID!) {
    getHighScore(id: $id) {
      id
      name
      score
      createdAt
      updatedAt
    }
  }
`;
export const listHighScores = /* GraphQL */ `
  query ListHighScores(
    $filter: ModelHighScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHighScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        score
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      startDate
      name
      score
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startDate
        name
        score
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
