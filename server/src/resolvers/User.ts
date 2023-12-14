import { AnimalsResolverContext } from '../resolvers';
import { UserResolvers } from '../resolvers-types.generated';
import {
  favoriteTransform,
  petTransform,
} from "../transforms"

const userResolver: UserResolvers<AnimalsResolverContext> = {
  pets(user, __, { db }) {
    return db.getUserPets(user.id);
  },
  stats(user, __, { db }) {
    return {
      petCount: db.getUserPets(user.id).length,
    };
  },
  favorites(user, _, { db }) {
    const faves = db.getUserFavorites(user.id);
    
    return faves.map((f) => {
      return {
        ...favoriteTransform(f),
        user,
        pet: petTransform(db.getPetById(f.tweetId)),
      };
    });
  },
};

export default userResolver;
