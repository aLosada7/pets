import { petTransform, userTransform, favoriteTransform } from '../transforms';
import { AnimalsResolverContext } from '../resolvers';
import { MutationResolvers } from '../resolvers-types.generated';

const mutationAnimalsResolver: MutationResolvers<AnimalsResolverContext> = {
  async createPet(_parent, args, { dbPetCache, db }) {
    const { name, userId } = args;
    const dbPet = await db.createPet({
      name,
      userId,
    });
    const dbPetMap = (dbPetCache ||= {});
    dbPetMap[dbPet.id] = dbPet;

    const dbUser = db.getUserById(userId);
    if (!dbUser) {
      throw new Error(`User ${userId} not found`);
    }

    return Object.assign(petTransform(dbPet), {
      birth: '2021-10-05T14:48:00.000Z',
      user: userTransform(dbUser),
    });
  },
  async createFavorite(_parent, args, { db }) {
    const { favorite } = args;
    const fav = await db.createFavorite(favorite);

    return {
      ...favoriteTransform(fav),
      user: db.getUserById(fav.userId),
      pet: petTransform(db.getPetById(fav.petId)),
    };
  },
  async deleteFavorite(_parent, args, { db }) {
    const { favorite } = args;
    const fav = await db.deleteFavorite(favorite);
    
    return {
      ...favoriteTransform(fav),
      user: db.getUserById(fav.userId),
      pet: petTransform(db.getPetById(fav.petId)),
    };
  },
};
export default mutationAnimalsResolver;
