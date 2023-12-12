import { Pet, User } from './resolvers-types.generated';
import { DbPet, DbUser } from './db';

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
