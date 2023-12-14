import { Pet, User, Favorite } from './resolvers-types.generated';
import { DbPet, DbUser, DbFavorite } from './db';

export const petTransform = (t: DbPet): Omit<Pet, 'user'> => {
  return {
    id: t.id,
    name: t.name,
    avatarUrl: t.avatarUrl,
    birth: t.birth,
    images: t.images,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
};

export const userTransform = (t: DbUser): User => {
  return {
    id: t.id,
    name: t.name,
    avatarUrl: t.avatarUrl,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    email: t.email,
    pets: [],
  };
};

export const favoriteTransform = (
  t: DbFavorite
): Omit<Favorite, "user" | "pet"> => {
  return {
    id: t.id,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  }
}
