import { AnimalsResolverContext } from '../resolvers';
import { UserResolvers } from '../resolvers-types.generated';

const userResolver: UserResolvers<AnimalsResolverContext> = {
  pets(user, __, { db }) {
    console.log(db.getUserPets(user.id));
    return db.getUserPets(user.id);
  },
  stats(user, __, { db }) {
    return {
      petCount: db.getUserPets(user.id).length,
    };
  },
};

export default userResolver;
