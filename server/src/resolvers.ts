import Query from './resolvers/Query';
import { Resolvers } from './resolvers-types.generated';
import Db, { DbUser, DbPet } from './db';
import User from './resolvers/User';
import Pet from './resolvers/Pet';
import mutationAnimalsResolver from './resolvers/Mutation';

export interface AnimalsResolverContext {
  db: Db;
  dbPetCache: Record<string, DbPet>;
  dbPetToFavoriteCountMap: Record<string, number>;
  dbUserCache: Record<string, DbUser>;
}

const resolvers: Resolvers<AnimalsResolverContext> = {
  Query,
  Mutation: mutationAnimalsResolver,
  User,
  Pet,
};

export default resolvers;
