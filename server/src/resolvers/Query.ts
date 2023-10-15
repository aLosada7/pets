import { AnimalsResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';

const queryResolver: QueryResolvers<AnimalsResolverContext> = {
  currentUser: (_, __, { db }) => {
    const [firstUser] = db.getAllUsers();
    if (!firstUser) {
      throw new Error(
        'currentUser was requested, but there are no users in the database'
      );
    }
    return firstUser;
  },
  pets: (_, __, { db }) => {
    return db.getAllPets();
  },
};

export default queryResolver;
