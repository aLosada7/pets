import { AnimalsResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';
import { petTransform } from '../transforms';

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
  bookings: (_, __, { db }) => {
    return [];
  },
  pets: (_, __, { db, dbPetCache, dbPetToFavoriteCountMap, dbUserCache }) => {
    db.getAllUsers().forEach((user) => {
      dbUserCache[user.id] = user;
    });
    db.getAllFavorites().forEach((favorite) => {
      const count = dbPetToFavoriteCountMap[favorite.petId] || 0;
      dbPetToFavoriteCountMap[favorite.petId] = count + 1;
    });
    return db.getAllPets().map((t) => {
      dbPetCache[t.id] = t;
      return petTransform(t);
    });
  },
};

export default queryResolver;
