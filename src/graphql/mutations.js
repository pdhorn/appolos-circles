/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHighScore = /* GraphQL */ `
  mutation CreateHighScore(
    $input: CreateHighScoreInput!
    $condition: ModelHighScoreConditionInput
  ) {
    createHighScore(input: $input, condition: $condition) {
      id
      name
      score
      createdAt
      updatedAt
    }
  }
`;
export const updateHighScore = /* GraphQL */ `
  mutation UpdateHighScore(
    $input: UpdateHighScoreInput!
    $condition: ModelHighScoreConditionInput
  ) {
    updateHighScore(input: $input, condition: $condition) {
      id
      name
      score
      createdAt
      updatedAt
    }
  }
`;
export const deleteHighScore = /* GraphQL */ `
  mutation DeleteHighScore(
    $input: DeleteHighScoreInput!
    $condition: ModelHighScoreConditionInput
  ) {
    deleteHighScore(input: $input, condition: $condition) {
      id
      name
      score
      createdAt
      updatedAt
    }
  }
`;
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
      id
      startDate
      name
      score
      createdAt
      updatedAt
    }
  }
`;
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
      id
      startDate
      name
      score
      createdAt
      updatedAt
    }
  }
`;
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
      id
      startDate
      name
      score
      createdAt
      updatedAt
    }
  }
`;
