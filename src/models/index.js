// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { HighScore, Game } = initSchema(schema);

export {
  HighScore,
  Game
};