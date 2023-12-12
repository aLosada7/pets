import { AnimalsResolverContext } from '../resolvers';
import { PetResolvers } from '../resolvers-types.generated';

const petResolver: PetResolvers<AnimalsResolverContext> = {
  user(pet, _, { dbUserCache, dbPetCache }) {
    const dbPet = dbPetCache[pet.id];
    if (!dbPet) {
      throw new Error(`Attempted to find pet but couldn't`);
    }
    const dbUser = dbUserCache[dbPet.userId];
    console.log(dbUser);
    if (!dbUser) {
      throw new Error(`Attempted to find user but couldn't`);
    }

    return dbUser;
  },
  stats(pet, __, { dbPetToFavoriteCountMap }) {
    return {
      favoriteCount: dbPetToFavoriteCountMap[pet.id] || 0,
    };
  },
};

export default petResolver;
