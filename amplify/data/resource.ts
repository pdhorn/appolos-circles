import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  HighScore: a
    .model({
      name: a.string().required(),
      score: a.integer().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Game: a
    .model({
      startDate: a.string().required(),
      name: a.string(),
      score: a.integer(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});
