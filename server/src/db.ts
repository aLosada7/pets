import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { v4 as uuid } from 'uuid';

export interface DbEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DbImage {
  src: string;
  alt: string;
}

export interface DbPet extends DbEntity {
  name: string;
  avatarUrl: string;
  birth: string;
  images: DbImage[];
  userId: string;
}

export interface DbUser extends DbEntity {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface DbFavorite extends DbEntity {
  petId: string;
  userId: string;
}

export interface DbHashtagTrend {
  id: string;
  kind: 'hashtag';
  hashtag: string;
  tweetCount: number;
}
export interface DbTopicTrendQuote {
  id: string;
  topicTrendId: string;
  title: string;
  description: string;
  imageUrl: string;
}
export interface DbTopicTrend {
  id: string;
  kind: 'topic';
  topic: string;
  tweetCount: number;
  quote?: DbTopicTrendQuote;
}
export type DbTrend = DbTopicTrend | DbHashtagTrend;
export interface DBImage {
  src: string;
  alt: string;
}

export interface DbBooking {
  id: string;
  pet: string;
  date: string;
}

export interface DbSchema {
  pets: DbPet[];
  users: DbUser[];
  favorites: DbFavorite[];
  hashtagTrends: DbHashtagTrend[];
  bookings: DbBooking[];
  topicTrends: DbTopicTrend[];
  topicTrendQuotes: DbTopicTrendQuote[];
}

class Db {
  private adapter;
  private db;

  constructor(filePath: string) {
    this.adapter = new FileSync<DbSchema>(filePath);
    this.db = low(this.adapter);
    this.db.read();
  }
  async initDefaults() {
    return await this.db
      .defaults<DbSchema>({
        pets: [],
        users: [],
        favorites: [],
        bookings: [],
        hashtagTrends: [],
        topicTrends: [],
        topicTrendQuotes: [],
      })
      .write();
  }

  getFirstUser(): DbUser {
    const firstUser = this.db.get('users').first().value();
    if (!firstUser) throw new Error('No users in database');
    return firstUser;
  }

  getUserById(id: string) {
    return this.db
      .get('users')
      .find((u) => u.id === id)
      .value();
  }

  getPetById(id: string) {
    return this.db
      .get('pets')
      .find((t) => t.id === id)
      .value();
  }

  getUserPets(userId: string) {
    return this.db
      .get('pets')
      .filter((t) => t.userId === userId)
      .value();
  }

  getUserFavorites(userId: string) {
    return this.db
      .get('favorites')
      .filter((f) => f.userId === userId)
      .value();
  }

  getAllPets(): DbPet[] {
    return this.db
      .get('pets')
      .sortBy((t) => new Date(t.createdAt).valueOf())
      .reverse()
      .value();
  }

  getAllFavorites(): DbFavorite[] {
    return this.db.get('favorites').value();
  }

  getAllTrends(): DbTrend[] {
    const hashTrends = this.db.get('hashtagTrends').reverse().value();
    const topicTrends = this.db.get('topicTrends').reverse().value();
    const topicTrendQuotes = this.db
      .get('topicTrendQuotes')
      .reverse()
      .value()
      .reduce((acc, item) => {
        acc[item.topicTrendId] = item;
        return acc;
      }, {} as Record<string, DbTopicTrendQuote>);

    const list = [
      ...hashTrends,
      ...topicTrends.map((tt) => {
        const quote = topicTrendQuotes[tt.id];
        return { ...tt, quote };
      }),
    ].sort((a, b) => b.tweetCount - a.tweetCount);
    return list;
  }

  getAllBookings() {
    return this.db.get('bookings').value();
  }

  getFavoritesForPet(petId: string): DbFavorite[] {
    return this.db
      .get('favorites')
      .filter((t) => t.petId === petId)
      .value();
  }
  getFavoriteCountForPet(petId: string): number {
    return this.getFavoritesForPet(petId).length;
  }
  async createSuggestion(
    trendProps: Exclude<DbBooking, 'id'>
  ): Promise<DbBooking> {
    const bookings = this.db.get('bookings');
    const newBooking: DbBooking = {
      ...trendProps,
      id: `suggestion-${uuid()}`,
    };
    await bookings.push(newBooking).write();
    return newBooking;
  }
  async createHashtagTrend(
    trendProps: Pick<DbHashtagTrend, 'tweetCount' | 'hashtag'>
  ): Promise<DbHashtagTrend> {
    const hashtagTrends = this.db.get('hashtagTrends');
    const newTrend: DbHashtagTrend = {
      ...trendProps,
      kind: 'hashtag',
      id: `hashtrend-${uuid()}`,
    };
    await hashtagTrends.push(newTrend).write();
    return newTrend;
  }
  async createTopicTrend(
    trendProps: Pick<DbTopicTrend, 'topic' | 'tweetCount'>,
    quoteProps?: Pick<DbTopicTrendQuote, 'title' | 'imageUrl' | 'description'>
  ): Promise<DbTopicTrend> {
    const topicTrends = this.db.get('topicTrends');
    const newTrend: DbTopicTrend = {
      ...trendProps,
      kind: 'topic',
      id: `topictrend-${uuid()}`,
    };
    await topicTrends.push(newTrend).write();
    if (quoteProps) {
      const { title, description, imageUrl } = quoteProps;
      const topicTrendQuotes = this.db.get('topicTrendQuotes');
      const newQuote: DbTopicTrendQuote = {
        ...trendProps,
        title,
        description,
        imageUrl,
        topicTrendId: newTrend.id,
        id: `topictrendquote-${uuid()}`,
      };
      await topicTrendQuotes.push(newQuote).write();
    }
    return newTrend;
  }

  async createPet(petProps: Pick<DbPet, 'name' | 'userId'>): Promise<DbPet> {
    const pets = this.db.get('pets');
    const pet: DbPet = {
      ...petProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `pet-${uuid()}`,
    };
    await pets.push(pet).write();
    return pet;
  }

  async createUser(
    userProps: Pick<DbUser, 'name' | 'email' | 'avatarUrl'>
  ): Promise<DbUser> {
    const users = this.db.get('users');
    const user: DbUser = {
      ...userProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `user-${uuid()}`,
    };
    await users.push(user).write();
    return user;
  }

  async createFavorite(
    favoriteProps: Pick<DbFavorite, 'petId' | 'userId'>
  ): Promise<DbFavorite> {
    const user = this.getUserById(favoriteProps.userId);
    const pet = this.getPetById(favoriteProps.petId);
    if (!user) throw new Error('User does not exist');
    if (!pet) throw new Error('Pet does not exist');
    const favorites = this.db.get('favorites');
    const favorite: DbFavorite = {
      ...favoriteProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `favorite-${uuid()}`,
    };
    await favorites.push(favorite).write();
    return favorite;
  }
  async deleteFavorite(
    favoriteProps: Pick<DbFavorite, 'petId' | 'userId'>
  ): Promise<DbFavorite> {
    const user = this.getUserById(favoriteProps.userId);
    const tweet = this.getPetById(favoriteProps.petId);
    if (!user) throw new Error('User does not exist');
    if (!tweet) throw new Error('Pet does not exist');
    const favorites = this.db.get('favorites');

    const deleted = favorites.remove(
      (f) => f.petId === tweet.id && f.userId === user.id
    );

    await this.db.write();
    return deleted.first().value();
  }

  hasUser(predicate: (user: DbUser) => boolean): boolean {
    return !!this.db.get('users').find(predicate);
  }

  getAllUsers(): DbUser[] {
    return this.db.get('users').value();
  }

  async write(): Promise<void> {
    await this.db.write();
  }
}

export default Db;
