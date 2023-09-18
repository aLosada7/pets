const queryResolver = {
  currentUser: () => {
    return {
      id: '123',
      name: 'John Doe',
      email: 'johndoe',
      coverUrl: 'johndoe@gmail.com',
      avatarUrl: '',
      createdAt: '',
      updatedAt: '',
    };
  },
  pets: () => {
    return [];
  },
};

export default queryResolver;
