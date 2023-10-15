import queryResolver from './resolvers/Query';
import { Resolvers } from './resolvers-types.generated';
import Db from './db';

export interface AnimalsResolverContext {
  db: Db;
}

const resolvers: Resolvers<AnimalsResolverContext> = {
  Query: queryResolver,
};

export default resolvers;
